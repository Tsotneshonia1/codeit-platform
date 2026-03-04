import { auth } from "@clerk/nextjs/server";
import { prisma } from "../lib/prisma";
import AssignmentForm from "@/components/AssignmentForm";

export default async function DashboardPage() {
  const { userId } = await auth();

  // მხოლოდ ამ სტუდენტის დავალებების წამოღება
  const myAssignments = await prisma.assignment.findMany({
    where: {
      student: {
        clerkId: userId!,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#0b0f1a] p-4 md:p-8 text-slate-200 selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* ✨ ზედა ჰედერი / Navbar-ის მსგავსი სექცია */}
        <div className="flex justify-between items-center bg-[#1e293b]/20 p-6 rounded-[2rem] border border-slate-800/50 backdrop-blur-xl">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20">
                D
              </div>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight leading-none">DevGrade</h1>
                <span className="text-[10px] text-blue-500 uppercase font-bold tracking-[0.2em]">Student Panel</span>
              </div>
           </div>
           <div className="hidden md:block text-[10px] text-slate-500 font-medium uppercase tracking-widest">
              პლატფორმა კოდის შეფასებისთვის
           </div>
        </div>

        {/* 🚀 დავალების გაგზავნის სექცია */}
        <section className="flex flex-col items-center relative">
          {/* ფონის ნათება ფორმის უკან */}
          <div className="absolute -top-20 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
          <AssignmentForm />
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* 📜 ისტორიის სექცია */}
        <section>
          <header className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-white flex items-center gap-4">
              <span className="bg-blue-600 w-1.5 h-8 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></span>
              ჩემი აქტივობა
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-xl border border-slate-800">
               <span className="text-xs text-slate-400 font-bold">ჯამში:</span>
               <span className="text-blue-500 font-black">{myAssignments.length}</span>
            </div>
          </header>

          <div className="grid gap-6">
            {myAssignments.map((task) => (
              <div 
                key={task.id} 
                className="group relative bg-[#1e293b]/40 p-6 md:p-8 rounded-[2rem] border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#1e293b]/60 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-black text-xl text-white group-hover:text-blue-400 transition-colors tracking-tight">
                      {task.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-[11px] text-slate-500 font-bold flex items-center gap-1.5 bg-slate-900/50 px-3 py-1 rounded-lg">
                      <span className="opacity-50 text-base">🕒</span> 
                      {new Date(task.createdAt).toLocaleString('ka-GE', { timeZone: 'Asia/Tbilisi' })}
                    </p>
                    <a 
                      href={task.githubUrl} 
                      target="_blank" 
                      className="text-xs text-blue-500 hover:text-blue-300 flex items-center gap-1.5 font-bold transition-colors"
                    >
                      <span className="text-lg">🔗</span> GitHub Repo ↗
                    </a>
                  </div>

                  {/* თუ ლექტორმა დატოვა კომენტარი */}
                  {task.teacherComment && (
                    <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                       <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1">ლექტორის ფიდბექი:</p>
                       <p className="text-sm text-slate-300 italic italic">"{task.teacherComment}"</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-3 mt-6 md:mt-0 w-full md:w-auto">
                  <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border-2 shadow-sm ${
                    task.status === "PENDING"
                      ? "bg-amber-500/5 text-amber-500 border-amber-500/10 shadow-amber-500/5"
                      : "bg-emerald-500/5 text-emerald-500 border-emerald-500/10 shadow-emerald-500/5"
                  }`}>
                    {task.status === "PENDING" ? "მოდერაციაშია" : "დადასტურებულია"}
                  </div>
                  
                  {task.status === "APPROVED" && (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-700">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-[10px] text-emerald-500/80 font-black uppercase tracking-widest">Verified by Admin</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {myAssignments.length === 0 && (
              <div className="relative overflow-hidden bg-[#1e293b]/20 p-20 rounded-[3rem] border-2 border-dashed border-slate-800/50 text-center group">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-5xl mb-6">📂</div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">ისტორია ცარიელია</h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">გამოაგზავნეთ თქვენი პირველი დავალება და დაიწყეთ სწავლა DevGrade-თან ერთად.</p>
              </div>
            )}
          </div>
        </section>

        {/* 🌟 Footer */}
        <footer className="text-center pt-10 opacity-30">
           <p className="text-[10px] font-bold tracking-[0.3em] uppercase">Built with Next.js & Prisma</p>
        </footer>
      </div>
    </div>
  );
}