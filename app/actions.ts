"use server";

import { prisma } from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Status } from "@prisma/client";

// 1. დავალების გაგზავნის ფუნქცია (სტუდენტებისთვის)
export async function submitAssignment(formData: FormData) {
  try {
    // ავტორიზაციის შემოწმება Clerk-ით
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      return { success: false, error: "ავტორიზაცია აუცილებელია" };
    }

    // ვიღებთ მეილს უსაფრთხოდ
    const userEmail = clerkUser.emailAddresses[0]?.emailAddress;

    // UPSERT: ვეძებთ მომხმარებელს, თუ არ არსებობს - ვქმნით.
    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Anonymous",
        email: userEmail,
      },
      create: {
        clerkId: userId,
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Anonymous",
        email: userEmail,
        role: "STUDENT",
      },
    });

    const title = formData.get("title") as string;
    const githubUrl = formData.get("githubUrl") as string;

    // მონაცემების ვალიდაცია
    if (!title || !githubUrl) {
      return { success: false, error: "გთხოვთ შეავსოთ ყველა ველი" };
    }

    // დავალების შექმნა და მიბმა იუზერზე
    await prisma.assignment.create({
      data: {
        title,
        githubUrl,
        studentId: dbUser.id,
        status: "PENDING",
      },
    });

    console.log("დავალება წარმატებით გაიგზავნა!");
    
    // ქეშის გასუფთავება გვერდების დასააფდეითებლად
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/admin"); 
    
    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "სისტემური შეცდომა, სცადეთ მოგვიანებით" };
  }
}

// 2. დავალების სტატუსის შეცვლის ფუნქცია (ადმინებისთვის)
export async function updateAssignmentStatus(id: string, status: Status) { 
  try {
    const { userId } = await auth();
    // აქ შეგიძლია დაამატო შემოწმება, არის თუ არა მომხმარებელი ადმინი

    await prisma.assignment.update({
      where: { id },
      data: { 
        status: status 
      },
    });
    
    revalidatePath("/admin");
    revalidatePath("/dashboard"); 
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false };
  }
}
// 3. დავალების შეფასების და კომენტარის ფუნქცია (ლექტორებისთვის/ადმინებისთვის)
export async function gradeAssignment(assignmentId: string, grade: number | null, teacherComment: string) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "ავტორიზაცია აუცილებელია" };

    await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        grade: grade,
        teacherComment: teacherComment || null, // თუ ცარიელია, null შეინახოს
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
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "ავტორიზაცია აუცილებელია" };

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