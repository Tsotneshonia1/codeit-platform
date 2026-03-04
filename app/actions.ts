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

<<<<<<< HEAD
    // UPSERT: ვეძებთ მომხმარებელს, თუ არ არსებობს - ვქმნით.
    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Anonymous",
        email: userEmail,
=======
    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        name:
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          "Anonymous",
        email: userEmail || "",
>>>>>>> feature/ui-and-dashboard
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
<<<<<<< HEAD
      data: { 
        status: status 
      },
=======
      data: { status },
>>>>>>> feature/ui-and-dashboard
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false };
  }
}

<<<<<<< HEAD
// 3. დავალების შეფასების და კომენტარის ფუნქცია (ლექტორებისთვის/ადმინებისთვის)
// ❗ ᲐᲮᲐᲚᲘ: დავამატეთ მე-4 პარამეტრი (adminEmail) ❗
export async function gradeAssignment(
  assignmentId: string, 
  grade: number | null, 
  teacherComment: string,
  adminEmail: string // <--- ეს მიიღებს იმეილს admin/page.tsx-დან
) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "ავტორიზაცია აუცილებელია" };
=======
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
>>>>>>> feature/ui-and-dashboard

    await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
<<<<<<< HEAD
        grade: grade,
        teacherComment: teacherComment || null,
        gradedBy: adminEmail,    // <--- ❗ ვინ შეასწორა ❗
        gradedAt: new Date(),    // <--- ❗ ზუსტი დროის ჩაწერა ბაზაში ❗
      },
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("შეფასების შეცდომა:", error);
    return { success: false, error: "შეფასება ვერ მოხერხდა" };
  }
}

// 4. სტუდენტის პასუხის/კომენტარის დამატების ფუნქცია
export async function addStudentComment(assignmentId: string, studentComment: string) {
=======
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
>>>>>>> feature/ui-and-dashboard
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "ავტორიზაცია აუცილებელია" };

<<<<<<< HEAD
    // უსაფრთხოება: ვამოწმებთ, რომ სტუდენტი ნამდვილად თავის დავალებაზე წერს
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { student: true }
    });

    if (assignment?.student.clerkId !== userId) {
      return { success: false, error: "წვდომა შეზღუდულია: ეს არ არის თქვენი დავალება" };
    }

    await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        studentComment: studentComment || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("კომენტარის დამატების შეცდომა:", error);
    return { success: false, error: "კომენტარი ვერ დაემატა" };
  }
}
=======
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
>>>>>>> feature/ui-and-dashboard
