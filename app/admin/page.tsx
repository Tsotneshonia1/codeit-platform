import { prisma } from "../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ApproveButton from "@/components/ApproveButton";

export default async function AdminDashboard() {
  // 1. გავიგოთ ვინ არის დალოგინებული
  const user = await currentUser();

  // 2. მასწავლებლების "თეთრი სია"
  const adminEmails = [
    "cotneshonia.17@gmail.com",
    "tsotneshonia17@gmail.com",
    "maswavlebeli3@gmail.com"
  ];

  // 3. თუ საერთოდ არაა დალოგინებული ან მისი მეილი არ არის სიაში - გავაგდოთ მთავარზე
  const userEmail = user?.emailAddresses[0]?.emailAddress || "";
  
  if (!user || !adminEmails.includes(userEmail)) {
    redirect("/");
  }

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
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Admin <span className="text-blue-500">Panel</span>
            </h1>
            <p className="text-slate-400 mt-2">სტუდენტების ნამუშევრების მართვა</p>
            <p className="text-xs text-emerald-500 mt-1 italic opacity-70">
              ავტორიზებული: {userEmail}
            </p>
          </div>
          <div className="bg-[#1e293b] px-6 py-3 rounded-2xl border border-slate-800 shadow-2xl text-center">
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">სულ დავალება</p>
            <span className="text-2xl font-black text-blue-400">{assignments.length}</span>
          </div>
        </header>

        <div className="bg-[#1e293b] rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f172a] border-b border-slate-800">
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest">სტუდენტი</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest">დავალება</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest">სტატუსი</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">მოქმედება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {assignments.map((task) => (
                <tr key={task.id} className="hover:bg-[#1e293b]/50 transition-colors group">
                  <td className="p-5">
                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {task.student.name}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{task.student.email}</div>
                  </td>
                  <td className="p-5">
                    <div className="font-medium text-slate-300">{task.title}</div>
                    <a 
                      href={task.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-400 underline mt-1 block transition-colors"
                    >
                      GitHub Link ↗
                    </a>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      task.status === "PENDING"
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    {task.status === "PENDING" ? (
                      /* აქ ვიყენებთ ახალ Client კომპონენტს */
                      <ApproveButton assignmentId={task.id} />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 opacity-60">
                         <span className="text-emerald-500 text-lg font-bold">✓</span>
                         <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">დასრულებული</span>
                      </div>
                    )}
                  </td>
                </tr>
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