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
    <div className="min-h-screen bg-[#0b0f1a] p-8 text-slate-200">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* დავალების გაგზავნის სექცია */}
        <section className="flex flex-col items-center">
          <AssignmentForm />
        </section>

        <hr className="border-slate-800" />

        {/* ისტორიის სექცია */}
        <section>
          <header className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <span className="bg-blue-500 w-2 h-8 rounded-full"></span>
              ჩემი აქტივობა
            </h2>
            <div className="text-3xl font-black text-white tracking-tighter opacity-50">
              CODE<span className="text-blue-500">IT</span> <span className="text-xs text-slate-500">Dashboard</span>
            </div>
          </header>

          <div className="grid gap-4">
            {myAssignments.map((task) => (
              <div 
                key={task.id} 
                className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-blue-500/50 transition-all group"
              >
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    გაგზავნილია: {new Date(task.createdAt).toLocaleString('ka-GE')}
                  </p>
                  <a 
                    href={task.githubUrl} 
                    target="_blank" 
                    className="text-sm text-blue-500 hover:text-blue-400 underline mt-3 inline-block font-mono"
                  >
                    View Code on GitHub ↗
                  </a>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    task.status === "PENDING"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  }`}>
                    {task.status}
                  </span>
                  {task.status === "APPROVED" && (
                    <span className="text-[10px] text-emerald-500 font-bold italic">შემოწმებულია</span>
                  )}
                </div>
              </div>
            ))}

            {myAssignments.length === 0 && (
              <div className="bg-[#1e293b]/30 p-16 rounded-3xl border border-dashed border-slate-800 text-center text-slate-500 italic">
                თქვენი დავალებების ისტორია ცარიელია...
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}