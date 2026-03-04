import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-[#040812] text-slate-300 font-sans selection:bg-blue-500/30 flex flex-col scroll-smooth">
      
      {/* 🌟 ნავიგაცია */}
      <nav className="max-w-7xl mx-auto w-full px-6 h-24 flex items-center justify-between sticky top-0 bg-[#040812]/80 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="flex items-center gap-3 cursor-default group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-300">
            D
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Dev<span className="text-blue-500">Grade</span>
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {userId ? (
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] active:scale-95">
              ჩემი დეშბორდი &rarr;
            </Link>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="hidden md:block text-slate-400 hover:text-white font-black tracking-wider text-sm transition-colors">
                  LOGIN
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-white hover:bg-slate-200 text-slate-900 px-6 py-2.5 rounded-xl font-black tracking-wider text-sm transition-all active:scale-95 shadow-lg">
                  REGISTRATION
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </nav>

      {/* 🚀 Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 text-center relative overflow-hidden pt-32 pb-20">
        {/* ფონის ნათება */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-[120px] -z-10"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Next-Gen Educational Tool
        </div>

        {/* ❗ შეცვლილი ტექსტი: "რევიუ" ამოღებულია ❗ */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1] max-w-5xl">
          კოდის შეფასება ახლა <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            ბევრად მარტივია.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12 font-medium">
          დაზოგეთ დრო, გაამარტივეთ უკუკავშირი და მართეთ სტუდენტების პროგრესი ერთ თანამედროვე სივრცეში. შექმნილია მენტორებისა და დეველოპერებისთვის.
        </p>

        {/* ❗ ღილაკების ბლოკი ❗ */}
        {!userId && (
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6 justify-center">
            <SignUpButton mode="modal">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black tracking-widest text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95">
                REGISTRATION <span className="text-xl">🚀</span>
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-2xl font-black tracking-widest text-lg transition-all active:scale-95 backdrop-blur-sm">
                LOGIN <span className="text-xl">🔑</span>
              </button>
            </SignInButton>
          </div>
        )}
      </main>

      {/* 💻 გამოყენებული ტექნოლოგიები (Tech Stack) */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#0a0f1c] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">
            პლატფორმა აგებულია თანამედროვე ტექნოლოგიებით
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 transition-colors">
              <span className="text-white font-bold">▲</span> Next.js 14
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 transition-colors">
              <span className="text-cyan-400 font-bold">≈</span> Tailwind CSS
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 transition-colors">
              <span className="text-indigo-400 font-bold">◬</span> Prisma ORM
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 transition-colors">
              <span className="text-blue-400 font-bold">🐘</span> PostgreSQL
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 transition-colors">
              <span className="text-purple-400 font-bold">🔒</span> Clerk Auth
            </div>
          </div>
        </div>
      </section>

      {/* 📊 პლატფორმის შესაძლებლობები */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-blue-500/30 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="font-bold text-white text-xl mb-3">სწრაფი შეფასება</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              დაივიწყეთ ფაილების გადმოწერა. შეამოწმეთ დავალებები პირდაპირ პლატფორმიდან და გაგზავნეთ ფიდბექი წამებში.
            </p>
          </div>
          <div className="p-8 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-purple-500/30 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🔗</div>
            <h3 className="font-bold text-white text-xl mb-3">GitHub სინქრონიზაცია</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              სტუდენტები აგზავნიან მხოლოდ რეპოზიტორიის ლინკს, რაც გამორიცხავს კოდის დაკარგვის ან არევის რისკს.
            </p>
          </div>
          <div className="p-8 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-emerald-500/30 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">📈</div>
            <h3 className="font-bold text-white text-xl mb-3">ცენტრალიზებული მართვა</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              თითოეული სტუდენტის პროგრესი, სტატუსები და ისტორია ინახება და მარტივად კონტროლდება დეშბორდიდან.
            </p>
          </div>
        </div>
      </section>
      
      {/* 🔗 Footer & Social Links */}
      <footer className="py-16 mt-auto text-center px-6 border-t border-white/5 bg-[#020408]">
        <h3 className="text-2xl font-bold text-white mb-8">შემქმნელი</h3>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a href="https://www.linkedin.com/in/tsotne-shonia-79a672273/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-3 bg-[#0a66c2]/10 text-[#0a66c2] border border-[#0a66c2]/20 rounded-xl font-bold hover:bg-[#0a66c2] hover:text-white transition-all hover:-translate-y-1">
            LinkedIn
          </a>
          <a href="https://github.com/Tsotneshonia1" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all hover:-translate-y-1">
            GitHub
          </a>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} DevGrade. შექმნილია პორტფოლიოსთვის.
        </p>
      </footer>

    </div>
  );
}