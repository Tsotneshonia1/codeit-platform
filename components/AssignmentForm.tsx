"use client";

import { submitAssignment } from "@/app/actions";
import { useState } from "react";

export default function AssignmentForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");
    const result = await submitAssignment(formData);
    setLoading(false);

    if (result.success) {
      setMessage("✅ დავალება წარმატებით გაიგზავნა!");
    } else {
      setMessage("❌ შეცდომა: " + (result.error || "სცადეთ ხელახლა"));
    }
  }

  return (
    <div className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">დავალების ატვირთვა</h2>
      
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">დავალების დასახელება</label>
          <input
            name="title"
            required
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="მაგ: Next.js პროექტი"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">GitHub ლინკი</label>
          <input
            name="githubUrl"
            type="url"
            required
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95"
        >
          {loading ? "იგზავნება..." : "გაგზავნა 🚀"}
        </button>

        {message && (
          <p className={`text-center mt-4 font-medium ${message.includes("✅") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}