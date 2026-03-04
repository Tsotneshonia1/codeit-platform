"use server";

import { prisma } from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Status } from "@prisma/client";

export async function submitAssignment(formData: FormData) {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      return { success: false, error: "ავტორიზაცია აუცილებელია" };
    }

    const userEmail = clerkUser.emailAddresses[0]?.emailAddress;

    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        name:
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          "Anonymous",
        email: userEmail || "",
      },
      create: {
        clerkId: userId,
        name:
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          "Anonymous",
        email: userEmail || "",
        role: "STUDENT",
      },
    });

    const title = formData.get("title") as string;
    const githubUrl = formData.get("githubUrl") as string;

    if (!title || !githubUrl) {
      return { success: false, error: "გთხოვთ შეავსოთ ყველა ველი" };
    }

    await prisma.assignment.create({
      data: {
        title,
        githubUrl,
        studentId: dbUser.id,
        status: "PENDING",
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "სისტემური შეცდომა, სცადეთ მოგვიანებით" };
  }
}

export async function updateAssignmentStatus(id: string, status: Status) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    await prisma.assignment.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false };
  }
}

export async function approveAssignment(
  assignmentId: string,
  grade: number,
  comment: string,
) {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      throw new Error("ავტორიზაცია აუცილებელია");
    }

    const userEmail = clerkUser.emailAddresses[0]?.emailAddress;

    const dbAdmin = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        name:
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          "Admin",
        email: userEmail || "",
      },
      create: {
        clerkId: userId,
        name:
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          "Admin",
        email: userEmail || "",
        role: "LECTURER",
      },
    });

    await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        status: "APPROVED",
        grade: grade,
      },
    });

    if (comment && comment.trim() !== "") {
      await prisma.feedback.create({
        data: {
          text: comment,
          assignmentId: assignmentId,
          authorId: dbAdmin.id,
        },
      });
    }

    revalidatePath("/admin");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Approve error:", error);
    throw new Error("შეცდომა შეფასების შენახვისას");
  }
}

export async function addStudentComment(assignmentId: string, text: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("ავტორიზაცია აუცილებელია");

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) throw new Error("მომხმარებელი ვერ მოიძებნა");

    await prisma.feedback.create({
      data: {
        text: text,
        assignmentId: assignmentId,
        authorId: dbUser.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Comment error:", error);
    throw new Error("ვერ მოხერხდა კომენტარის დამატება");
  }
}

export async function deleteAssignment(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "ავტორიზაცია აუცილებელია" };

    await prisma.assignment.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "ვერ მოხერხდა დავალების წაშლა" };
  }
}