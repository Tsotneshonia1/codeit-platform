import { auth } from "@clerk/nextjs/server";
import { prisma } from "../lib/prisma";
import AssignmentForm from "@/components/AssignmentForm";
<<<<<<< HEAD
import { addStudentComment } from "../actions"; // შემოვიტანეთ პასუხის გაგზავნის ფუნქცია
=======
import StudentReplyForm from "@/components/StudentReplyForm";
>>>>>>> feature/ui-and-dashboard

export default async function DashboardPage() {
  const { userId } = await auth();

  // მოგვაქვს დავალებები თავისი ფიდბექებით და შემფასებლებით
  const myAssignments = await prisma.assignment.findMany({
    where: {
      student: { clerkId: userId! },
    },
    orderBy: { createdAt: "desc" },
    include: {
      feedbacks: {
        orderBy: { createdAt: "asc" }, // მიმოწერა ძველიდან ახლისკენ ჩატივით
        include: {
          author: true, // შემფასებლის ვინაობა
        }
      }
    }
  });

  return (
    <div className="min-h-screen bg-[#040812] p-4 md:p-8 text-slate-200 selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* ✨ ჰედერი */}
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
        </div>

        {/* 🚀 დავალების გაგზავნა */}
        <section className="flex flex-col items-center relative">
          <div className="absolute -top-20 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
          <AssignmentForm />
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* 📜 ისტორია და შეფასებები */}
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
<<<<<<< HEAD
                className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex flex-col hover:border-blue-500/50 transition-all group shadow-lg"
              >
                {/* ზედა ნაწილი: ძირითადი ინფორმაცია */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      გაგზავნილია: {new Date(task.createdAt).toLocaleString('ka-GE', { timeZone: 'Asia/Tbilisi' })}
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
                    {/* კომენტარების სექცია */}
<div className="flex-1 w-full space-y-4">
  
  {/* ❗ ვინ და როდის შეასწორა ❗ */}
  {task.gradedBy && task.gradedAt && (
     <div className="flex flex-wrap items-center gap-2 mb-2 bg-[#0f172a]/50 p-2 rounded-lg border border-slate-700/50 w-fit">
       <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">შემფასებელი:</span>
       <span className="text-xs font-mono text-blue-400 font-bold">{task.gradedBy}</span>
       <span className="text-slate-600">|</span>
       <span className="text-[10px] text-slate-500 flex items-center gap-1">
          🕒 {new Date(task.gradedAt).toLocaleString('ka-GE', { timeZone: 'Asia/Tbilisi' })}
       </span>
     </div>
  )}

  {task.teacherComment && (
    <div>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
        <span>💬</span> 
        ლექტორის კომენტარი:
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

=======
                className="group relative bg-[#1e293b]/40 p-6 md:p-8 rounded-[2rem] border border-slate-800 flex flex-col hover:bg-[#1e293b]/60 hover:border-blue-500/30 transition-all duration-300 shadow-xl"
              >
                {/* ზედა ნაწილი: ინფო და სტატუსი */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                  <div className="space-y-3">
                    <h3 className="font-black text-xl text-white group-hover:text-blue-400 transition-colors tracking-tight">
                      {task.title}
                    </h3>
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
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border-2 shadow-sm ${
                        task.status === "PENDING"
                          ? "bg-amber-500/5 text-amber-500 border-amber-500/10 shadow-amber-500/5"
                          : "bg-emerald-500/5 text-emerald-500 border-emerald-500/10 shadow-emerald-500/5"
                      }`}>
                        {task.status === "PENDING" ? "მოდერაციაშია" : "დადასტურებულია"}
                      </div>
                      
                      {/* 100 ქულიანი შეფასების გამოჩენა */}
                      {task.grade !== null && (
                        <div className="flex items-baseline gap-1 bg-blue-500/10 px-4 py-1.5 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                          <span className="text-2xl font-black text-blue-400">{task.grade}</span>
                          <span className="text-xs text-blue-500/70 font-bold">/100</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 💬 კომენტარების (ჩატის) სექცია */}
                {(task.feedbacks.length > 0 || task.status === "APPROVED") && (
                  <div className="mt-8 pt-6 border-t border-slate-800/80">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                      უკუკავშირი და მიმოწერა
                    </h4>
                    
                    <div className="space-y-4 mb-4">
                      {task.feedbacks.map((fb) => {
                        // ვამოწმებთ, ვინ არის ავტორი (ლექტორი თუ სტუდენტი)
                        const isLecturer = fb.author.role === "LECTURER" || fb.author.role === "ASSISTANT";
                        return (
                          <div key={fb.id} className={`flex flex-col ${isLecturer ? "items-start" : "items-end"}`}>
                            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm ${
                              isLecturer 
                                ? "bg-blue-500/10 text-blue-100 border border-blue-500/20 rounded-tl-sm" 
                                : "bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tr-sm"
                            }`}>
                              <span className="text-[10px] font-mono opacity-60 block mb-1.5 font-bold uppercase tracking-wider">
                                {isLecturer ? "👨‍🏫 ლექტორი" : "👤 შენ"} • {new Date(fb.createdAt).toLocaleString('ka-GE', { timeZone: 'Asia/Tbilisi' })}
                              </span>
                              <p className="leading-relaxed whitespace-pre-wrap">{fb.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* სტუდენტის პასუხის ფორმა */}
                    <StudentReplyForm assignmentId={task.id} />
>>>>>>> feature/ui-and-dashboard
                  </div>
                )}
              </div>
            ))}

            {myAssignments.length === 0 && (
              <div className="relative overflow-hidden bg-[#1e293b]/20 p-20 rounded-[3rem] border-2 border-dashed border-slate-800/50 text-center group">
                <div className="text-5xl mb-6 opacity-50">📂</div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">ისტორია ცარიელია</h3>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}