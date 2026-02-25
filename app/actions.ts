"use server";

import { prisma } from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

// 1. დავალების გაგზავნის ფუნქცია (სტუდენტებისთვის)
export async function submitAssignment(formData: FormData) {
  try {
    // ავტორიზაციის შემოწმება Clerk-ით
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      return { success: false, error: "ავტორიზაცია აუცილებელია" };
    }

    // ვეძებთ ან ვქმნით მომხმარებელს ჩვენს ბაზაში (User მოდელი)
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Anonymous",
          email: clerkUser.emailAddresses[0].emailAddress,
          role: "STUDENT",
        },
      });
    }

    const title = formData.get("title") as string;
    const githubUrl = formData.get("githubUrl") as string;

    // დავალების შექმნა და მიბმა იუზერზე (სვეტი: studentId)
    await prisma.assignment.create({
      data: {
        title,
        githubUrl,
        studentId: dbUser.id,
        status: "PENDING",
      },
    });

    console.log("დავალება წარმატებით გაიგზავნა!");
    revalidatePath("/");
    revalidatePath("/admin"); 
    
    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false };
  }
}

// 2. დავალების დადასტურების ფუნქცია (ადმინებისთვის/მასწავლებლებისთვის)
export async function approveAssignment(id: string) {
  try {
    await prisma.assignment.update({
      where: { id },
      data: { status: "APPROVED" },
    });
    
    revalidatePath("/admin"); 
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false };
  }
}