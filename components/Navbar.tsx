import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#040812]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:shadow-blue-500/50 transition-all">
            D
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">
            Dev<span className="text-blue-500">Grade</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <SignedOut>
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="hidden md:block text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-colors">
                  LOGIN
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-white hover:bg-slate-200 text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95">
                  REGISTRATION
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                href="/admin"
                className="hidden sm:block text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors"
              >
                ადმინი
              </Link>

              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] active:scale-95 flex items-center gap-2">
                  ჩემი დეშბორდი <span className="text-sm">→</span>
                </button>
              </Link>

              <div className="pl-4 border-l border-white/10">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-10 h-10 border border-white/10 rounded-xl shadow-inner",
                    },
                  }}
                />
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
