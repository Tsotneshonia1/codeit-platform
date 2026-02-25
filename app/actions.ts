"use server";

import { prisma } from "./lib/prisma";
import { revalidatePath } from "next/cache";

// დავალების გაგზავნის ფუნქცია (არსებული)
export async function submitAssignment(formData: FormData) {
  console.log("SERVER: ფუნქცია გამოიძახა!"); 

  const title = formData.get("title") as string;
  const githubUrl = formData.get("githubUrl") as string;

  try {
    const result = await prisma.assignment.create({
      data: {
        title,
        githubUrl,
        studentId: "cl-test-123", 
        status: "PENDING",
      },
    });

    console.log("ბაზაში წარმატებით ჩაიწერა:", result);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Submission error details:", error);
    return { success: false };
  }
}

// დავალების შემოწმების ფუნქცია 
export async function approveAssignment(id: string) {
  try {
    await prisma.assignment.update({
      where: { id },
      data: { status: "APPROVED" },
    });
    
    // ადმინის გვერდის განახლება, რომ სტატუსი ეგრევე შეიცვალოს
    revalidatePath("/admin"); 
    
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false };
  }
}