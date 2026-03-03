import { auth } from "@clerk/nextjs/server";
import { prisma } from "../lib/prisma";
import AssignmentForm from "@/components/AssignmentForm";
import { addStudentComment } from "../actions"; // შემოვიტანეთ პასუხის გაგზავნის ფუნქცია

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
                className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex flex-col hover:border-blue-500/50 transition-all group shadow-lg"
              >
                {/* ზედა ნაწილი: ძირითადი ინფორმაცია */}
                <div className="flex justify-between items-start">
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

                {/* ქვედა ნაწილი: შეფასება და ფიდბექი */}
                {(task.grade !== null || task.teacherComment || task.gradedBy) && (
                  <div className="mt-5 pt-5 border-t border-slate-700/50 flex flex-col md:flex-row gap-6 justify-between items-start">
                    
                    {/* კომენტარების სექცია */}
                    <div className="flex-1 w-full space-y-4">
                      
                      {/* ❗ ᲐᲮᲐᲚᲘ: ვინ და როდის შეასწორა ❗ */}
                      {task.gradedBy && task.gradedAt && (
                         <div className="flex flex-wrap items-center gap-2 mb-2 bg-[#0f172a]/50 p-2 rounded-lg border border-slate-700/50 w-fit">
                           <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">შემფასებელი:</span>
                           <span className="text-xs font-mono text-blue-400 font-bold">{task.gradedBy}</span>
                           <span className="text-slate-600">|</span>
                           <span className="text-[10px] text-slate-500 flex items-center gap-1">
                              🕒 {new Date(task.gradedAt).toLocaleString('ka-GE')}
                           </span>
                         </div>
                      )}

                      {task.teacherComment && (
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                            <span>💬</span> 
                            {/* ❗ ᲐᲮᲐᲚᲘ: აქ გამოჩნდება სახელობითი კომენტარი ❗ */}
                            {task.gradedBy ? `${task.gradedBy}-ს კომენტარი:` : "ლექტორის კომენტარი:"}
                          </p>
                          <p className="text-sm text-slate-300 italic">"{task.teacherComment}"</p>
                        </div>
                      )}

                      {/* სტუდენტის პასუხის ფორმა ან უკვე გაგზავნილი პასუხი */}
                      {task.studentComment ? (
                        <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl border-l-4 border-l-blue-500">
                          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">ჩემი პასუხი:</p>
                          <p className="text-sm text-blue-100">"{task.studentComment}"</p>
                        </div>
                      ) : (
                        <form action={async (formData: FormData) => {
                          "use server";
                          const comment = formData.get("studentComment") as string;
                          if (comment) await addStudentComment(task.id, comment);
                        }} className="flex gap-2 w-full mt-2">
                          <input 
                            name="studentComment" 
                            type="text" 
                            required
                            placeholder="უპასუხეთ ლექტორს..." 
                            className="flex-1 bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                          />
                          <button type="submit" className="bg-slate-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                            გაგზავნა
                          </button>
                        </form>
                      )}
                    </div>

                    {/* ქულის სექცია */}
                    {task.grade !== null && (
                      <div className="bg-[#0f172a] px-6 py-3 rounded-2xl border border-slate-700 text-center min-w-[100px] shadow-inner shrink-0">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">ქულა</p>
                        <p className="text-3xl font-black text-emerald-400">{task.grade}<span className="text-sm text-slate-500">/100</span></p>
                      </div>
                    )}

                  </div>
                )}
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