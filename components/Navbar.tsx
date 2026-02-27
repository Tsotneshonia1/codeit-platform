import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#0f172a] text-white border-b border-slate-800 shadow-xl">
      {/* ლოგო */}
      <Link href="/" className="text-2xl font-black tracking-tighter text-blue-500 hover:text-blue-400 transition">
        CODE<span className="text-white">IT</span>
      </Link>

      {/* მენიუ */}
      <div className="flex gap-6 items-center">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95">
              შესვლა
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link href="/dashboard" className="text-slate-300 hover:text-white font-medium transition">
            ჩემი კაბინეტი
          </Link>
          {/* ადმინებისთვის გამოვაჩინოთ ადმინ პანელი */}
          <Link href="/admin" className="text-slate-300 hover:text-white font-medium transition">
            ადმინი
          </Link>
          <div className="pl-2 border-l border-slate-700">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}