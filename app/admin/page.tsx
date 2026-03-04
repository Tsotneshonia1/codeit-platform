import { prisma } from "../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ApproveButton from "@/components/ApproveButton";
import { deleteAssignment } from "@/app/actions";

export default async function AdminDashboard() {
  const user = await currentUser();

  const adminEmails = [
    "cotneshonia.17@gmail.com",
    "tsotneshonia17@gmail.com",
    "maswavlebeli3@gmail.com",
  ];

  const userEmail = user?.emailAddresses[0]?.emailAddress || "";

  if (!user || !adminEmails.includes(userEmail)) {
    redirect("/");
  }

  // მონაცემების წამოღება
  const assignments = await prisma.assignment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      student: true,
      feedbacks: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          author: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#040812] p-4 md:p-8 text-slate-200 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-[#0a0f1c]/80 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20">
                D
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Admin{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  Panel
                </span>
              </h1>
            </div>
            <p className="text-slate-400 mt-2 font-medium">
              სტუდენტების ნამუშევრების ცენტრალიზებული მართვა
            </p>
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-xs text-emerald-400 font-bold tracking-wider">
                ავტორიზებული: {userEmail}
              </p>
            </div>
          </div>

          <div className="bg-white/5 px-8 py-4 rounded-2xl border border-white/10 shadow-inner text-center min-w-[160px]">
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
              სულ დავალება
            </p>
            <span className="text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              {assignments.length}
            </span>
          </div>
        </header>
        <div className="bg-[#0a0f1c]/80 rounded-[2rem] shadow-2xl overflow-hidden border border-white/5 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    სტუდენტი
                  </th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    დავალება
                  </th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    სტატუსი & შეფასება
                  </th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                    მოქმედება
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {assignments.map((task) => {
                  const latestFeedback = task.feedbacks?.[0];

                  return (
                    <tr
                      key={task.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-6 align-top">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-700 uppercase">
                            {task.student.name?.[0] ||
                              task.student.email?.[0] ||
                              "?"}
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-blue-400 transition-colors text-sm">
                              {task.student.name || "სახელი არ არის"}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                              {task.student.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-6 align-top">
                        <div className="font-bold text-slate-200 text-sm">
                          {task.title}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 mb-2 font-medium">
                          📅 {new Date(task.createdAt).toLocaleString("ka-GE")}
                        </div>
                        <a
                          href={task.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-[10px] font-black uppercase tracking-wider transition-all"
                        >
                          GitHub ↗
                        </a>
                      </td>

                      <td className="p-6 align-top max-w-[300px]">
                        <div className="mb-3 flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                              task.status === "PENDING"
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            }`}
                          >
                            {task.status}
                          </span>

                          {task.grade !== null && (
                            <div className="flex items-baseline gap-1 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                              <span className="text-base font-black text-blue-400">
                                {task.grade}
                              </span>
                              <span className="text-[9px] text-blue-500/70 font-bold">
                                /100
                              </span>
                            </div>
                          )}
                        </div>

                        {task.status === "APPROVED" && latestFeedback && (
                          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 mt-3">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[11px] text-blue-400 font-bold">
                                🕵️{" "}
                                {latestFeedback.author.name ||
                                  latestFeedback.author.email}
                              </span>
                            </div>
                            <p className="text-[12px] text-slate-300 italic">
                              "{latestFeedback.text}"
                            </p>
                          </div>
                        )}
                      </td>

                      <td className="p-6 align-middle">
                        <div className="flex items-center justify-center gap-4">
                          {task.status === "PENDING" ? (
                            <ApproveButton assignmentId={task.id} />
                          ) : (
                            <div className="flex flex-col items-center opacity-40">
                              <span className="text-emerald-500 text-xl">
                                ✓
                              </span>
                            </div>
                          )}

                          <form
                            action={async () => {
                              "use server";
                              await deleteAssignment(task.id);
                            }}
                          >
                            <button
                              className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all active:scale-95 group/del"
                              title="წაშლა"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {assignments.length === 0 && (
              <div className="p-32 text-center">
                <h3 className="text-xl font-bold text-slate-500">
                  დავალებები არ არის
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
