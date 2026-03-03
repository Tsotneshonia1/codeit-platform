import { prisma } from "../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ApproveButton from "@/components/ApproveButton";
import { gradeAssignment } from "../actions";
import React from "react";

export default async function AdminDashboard() {
  // 1. გავიგოთ ვინ არის დალოგინებული
  const user = await currentUser();

  // 2. მასწავლებლების "თეთრი სია"
  const adminEmails = [
    "cotneshonia.17@gmail.com",
    "shiodjamurashvili26@gmail.com",
    "maswavlebeli3@gmail.com"
  ];

  // 3. თუ საერთოდ არაა დალოგინებული ან მისი მეილი არ არის სიაში - გავაგდოთ მთავარზე
  const userEmail = user?.emailAddresses[0]?.emailAddress || "";
  
  if (!user || !adminEmails.includes(userEmail)) {
    redirect("/");
  }

  // ❗ ᲐᲮᲐᲚᲘ: ვიღებთ ადმინის სახელს და გვარს Clerk-იდან ❗
  const adminFullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "ლექტორი";

  // დავალებების წამოღება ბაზიდან
  const assignments = await prisma.assignment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      student: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#0b0f1a] p-8 text-slate-200">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Admin <span className="text-blue-500">Panel</span>
            </h1>
            <p className="text-slate-400 mt-2">სტუდენტების ნამუშევრების მართვა</p>
            <p className="text-xs text-emerald-500 mt-1 italic opacity-70">
              ავტორიზებული: {userEmail}
            </p>
          </div>
          <div className="bg-[#1e293b] px-6 py-3 rounded-2xl border border-slate-800 shadow-2xl text-center min-w-[140px]">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">სულ დავალება</p>
            <span className="text-2xl font-black text-blue-400">{assignments.length}</span>
          </div>
        </header>

        <div className="bg-[#1e293b] rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f172a] border-b border-slate-800">
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/4">სტუდენტი</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">დავალება</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/6">სტატუსი</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">მოქმედება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {assignments.map((task) => (
                <React.Fragment key={task.id}>
                  {/* მთავარი ინფორმაციის სტრიქონი */}
                  <tr className="hover:bg-[#1e293b]/50 transition-colors group">
                    <td className="p-5 align-top">
                      <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                        {task.student.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-1">{task.student.email}</div>
                    </td>
                    <td className="p-5 align-top">
                      <div className="font-medium text-slate-300">{task.title}</div>
                      <a 
                        href={task.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:text-blue-400 underline mt-2 block transition-colors font-mono"
                      >
                        GitHub Link ↗
                      </a>
                    </td>
                    <td className="p-5 align-top">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border inline-block mt-1 ${
                        task.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-5 text-center align-top">
                      {task.status === "PENDING" ? (
                        <div className="mt-1">
                          <ApproveButton assignmentId={task.id} />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1 opacity-60 mt-1">
                           <span className="text-emerald-500 text-lg font-bold">✓</span>
                           <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">დასრულებული</span>
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* შეფასების ჩამოსაშლელი (Accordion) სტრიქონი */}
                  <tr className="bg-[#0f172a]/30">
                    <td colSpan={4} className="p-0">
                      <details className="group marker:content-['']">
                        <summary className="cursor-pointer bg-[#0f172a]/50 p-3 px-5 text-xs font-bold text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 select-none w-full border-t border-slate-800/30">
                          <span className="bg-slate-800 w-5 h-5 rounded-full flex items-center justify-center group-open:bg-blue-500 group-open:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 group-open:rotate-180 transition-transform duration-300">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                          შეფასება და კომენტარი 📝
                        </summary>
                        
                        <div className="p-6 bg-[#0f172a] border-t border-slate-800/50">
                          
                          {/* ❗ ᲐᲮᲐᲚᲘ: ვინ და როდის შეასწორა ❗ */}
                          {task.gradedBy && task.gradedAt && (
                            <div className="mb-5 p-3 bg-[#1e293b]/50 border border-slate-700/50 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                              <span className="text-xs text-slate-400">
                                ბოლო შეფასება: <span className="font-bold text-blue-400 ml-1">{task.gradedBy}</span>
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono bg-[#0b0f1a] px-2 py-1 rounded">
                                {new Date(task.gradedAt).toLocaleString('ka-GE', { timeZone: 'Asia/Tbilisi' })}
                              </span>
                            </div>
                          )}

                          {/* სტუდენტის პასუხის ჩვენება */}
                          {task.studentComment && (
                            <div className="mb-5 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg border-l-4 border-l-blue-500">
                              <p className="text-[10px] text-blue-400 font-bold mb-1 uppercase tracking-wider">სტუდენტის პასუხი:</p>
                              <p className="text-sm text-slate-300 italic">"{task.studentComment}"</p>
                            </div>
                          )}

                          {/* შეფასების ფორმა */}
                          <form action={async (formData: FormData) => {
                            "use server";
                            const gradeStr = formData.get("grade") as string;
                            const grade = gradeStr ? parseInt(gradeStr, 10) : null;
                            const comment = formData.get("teacherComment") as string;
                            
                            // ❗ ᲐᲮᲐᲚᲘ: userEmail-ის ნაცვლად გავატანეთ adminFullName ❗
                            await gradeAssignment(task.id, grade, comment, adminFullName);
                          }} className="flex flex-col md:flex-row gap-4 items-end">
                            
                            <div className="w-full md:w-1/4">
                              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">ქულა (0-100)</label>
                              <input 
                                type="number" 
                                name="grade" 
                                defaultValue={task.grade ?? ""}
                                max="100" 
                                min="0"
                                className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                              />
                            </div>

                            <div className="w-full md:w-2/4">
                              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">ლექტორის კომენტარი</label>
                              <input 
                                type="text" 
                                name="teacherComment" 
                                defaultValue={task.teacherComment || ""}
                                placeholder="ჩაწერეთ უკუკავშირი..."
                                className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                              />
                            </div>

                            <div className="w-full md:w-1/4">
                              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg font-bold transition-all active:scale-95 flex justify-center items-center gap-2">
                                შენახვა 💾
                              </button>
                            </div>

                          </form>
                        </div>
                      </details>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {assignments.length === 0 && (
            <div className="p-20 text-center text-slate-500 italic font-medium">
              დავალებები ჯერ არ არის გამოგზავნილი...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}