import { prisma } from "../lib/prisma";
import { approveAssignment } from "../actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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

  // თუ კოდი აქამდე მოვიდა, ე.ი. ერთ-ერთი მასწავლებელი ხარ
  const assignments = await prisma.assignment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      student: true,
    },
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Admin Panel</h1>
            <p className="text-slate-500">გამოგზავნილი დავალებების მართვა</p>
            <p className="text-xs text-green-600 mt-1 italic underline">ავტორიზებული: {userEmail}</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
            სულ: <strong>{assignments.length}</strong>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-5 text-sm font-bold text-slate-600 uppercase">სტუდენტი</th>
                <th className="p-5 text-sm font-bold text-slate-600 uppercase">დავალება</th>
                <th className="p-5 text-sm font-bold text-slate-600 uppercase">GitHub</th>
                <th className="p-5 text-sm font-bold text-slate-600 uppercase">სტატუსი</th>
                <th className="p-5 text-sm font-bold text-slate-600 uppercase text-center">მოქმედება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assignments.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-slate-900">{task.student.name}</div>
                    <div className="text-xs text-slate-400">{task.student.email}</div>
                  </td>
                  <td className="p-5 font-medium text-slate-700">{task.title}</td>
                  <td className="p-5">
                    <a
                      href={task.githubUrl}
                      target="_blank"
                      className="text-blue-600 hover:underline font-mono text-sm"
                    >
                      ნახვა ↗
                    </a>
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        task.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    {task.status === "PENDING" && (
                      <form
                        action={async () => {
                          "use server";
                          await approveAssignment(task.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg hover:bg-green-600 transition-all font-bold active:scale-95"
                        >
                          Approve ✓
                        </button>
                      </form>
                    )}
                    {task.status === "APPROVED" && (
                      <span className="text-slate-400 text-xs italic">დასრულებული</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {assignments.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              დავალებები ჯერ არ არის გამოგზავნილი.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}