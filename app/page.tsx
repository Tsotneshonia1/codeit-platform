import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30 flex flex-col scroll-smooth overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-20">
        <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-b from-blue-500/20 to-transparent backdrop-blur-2xl">
          <div className="bg-[#0f172a]/80 rounded-[2.5rem] p-8 md:p-16 border border-white/5 flex flex-col items-center max-w-5xl transition-all duration-500 group-hover:bg-[#0f172a]/90 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Next-Gen Learning
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1] text-center">
              კოდის შეფასება <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500">
                ბევრად მარტივია
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed mb-12 font-medium opacity-80 text-center">
              დაზოგეთ დრო და მართეთ სტუდენტების პროგრესი ერთიან, დახვეწილ
              გარემოში. შექმნილია მენტორებისთვის.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              {!userId ? (
                <>
                  <SignUpButton mode="modal">
                    <button className="relative group px-10 py-4 bg-blue-600 rounded-2xl overflow-hidden transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative flex items-center justify-center gap-2 text-white font-black tracking-widest text-sm">
                        REGISTRATION{" "}
                        <span className="text-lg animate-bounce">🚀</span>
                      </span>
                    </button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <button className="px-10 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2">
                      <span className="text-white font-black tracking-widest text-sm">
                        LOGIN
                      </span>
                      <span className="text-lg opacity-70">🔑</span>
                    </button>
                  </SignInButton>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-12 py-4 bg-white text-slate-900 rounded-2xl font-black tracking-widest text-sm transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-3"
                >
                  MY DASHBOARD <span>→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <span className="text-xs font-black tracking-widest text-slate-500 uppercase">
              Powered By:
            </span>
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all font-bold text-sm">
              ▲ Next.js
            </div>
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all font-bold text-sm">
              ≈ Tailwind
            </div>
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all font-bold text-sm">
              ◬ Prisma
            </div>
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all font-bold text-sm">
              🔒 Clerk
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "სწრაფი შეფასება",
              icon: "⚡",
              desc: "შეამოწმეთ დავალებები წამებში.",
            },
            {
              title: "GitHub სინქრონიზაცია",
              icon: "🔗",
              desc: "მხოლოდ რეპოზიტორიის ლინკით.",
            },
            { title: "მართვა", icon: "📈", desc: "სტატისტიკა ერთ დეშბორდზე." },
          ].map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all cursor-default"
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 bg-[#01030a]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Tsotneshonia1"
              target="_blank"
              className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 fill-slate-400" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/tsotne-shonia-79a672273/"
              target="_blank"
              className="p-2 bg-white/5 rounded-lg hover:bg-[#0a66c2]/20 transition-colors"
            >
              <svg
                className="w-5 h-5 fill-slate-400 hover:fill-[#0a66c2]"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.763z" />
              </svg>
            </a>
          </div>
          <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} DevGrade &bull; Portfolio By
            Tsotne Shonia
          </p>
        </div>
      </footer>
    </div>
  );
}
