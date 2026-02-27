import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import AssignmentForm from "@/components/AssignmentForm";

export default async function HomePage() {
  const { userId } = await auth();

  // თუ მომხმარებელი შესულია, ვაჩვენებთ ფორმას
  if (userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <AssignmentForm />
      </div>
    );
  }

  // თუ არ არის შესული, ვაჩვენებთ "Welcome" გვერდს რეგისტრაციის ღილაკებით
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl font-black mb-6 text-white tracking-tight">
        მოგესალმებით <span className="text-blue-500">CODEIT</span>-ზე
      </h1>
      <p className="text-slate-400 text-xl mb-10 max-w-lg">
        პლატფორმა სტუდენტებისთვის. გაიარეთ ავტორიზაცია დავალებების ასატვირთად.
      </p>
      
      <div className="flex gap-4">
        <SignInButton mode="modal">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
            შესვლა
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition-all border border-slate-700">
            რეგისტრაცია
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}