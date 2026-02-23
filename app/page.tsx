"use client"; 

import { submitAssignment } from "./actions";
import { useState } from "react";

export default function SubmitAssignmentPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await submitAssignment(formData);
    setLoading(false);

    if (result.success) {
      alert("დავალება წარმატებით გაიგზავნა! 🎉");
      // აქ შეგვიძლია ფორმის გასუფთავება
    } else {
      alert("შეცდომა! სცადე ხელახლა.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900">Codeit Platform</h1>
          <p className="text-slate-500 mt-3 text-lg">სტუდენტის პორტალი</p>
        </header>

        <form action={handleSubmit} className="space-y-8">
          <div className="group">
            <label className="block text-sm font-bold text-slate-700 mb-2.5">დავალების დასახელება</label>
            <input 
              name="title" 
              required
              disabled={loading}
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all disabled:opacity-50"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-bold text-slate-700 mb-2.5">GitHub Link</label>
            <input 
              name="githubUrl" 
              required
              type="url"
              disabled={loading}
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all disabled:opacity-50 font-mono text-sm"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all active:scale-[0.97] disabled:bg-slate-400"
          >
            {loading ? "იგზავნება..." : "გაგზავნა 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}