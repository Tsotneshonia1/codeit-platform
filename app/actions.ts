"use server";

import { prisma } from "./lib/prisma";
import { revalidatePath } from "next/cache";

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