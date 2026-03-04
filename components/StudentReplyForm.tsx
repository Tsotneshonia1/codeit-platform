"use client";

import { useState } from "react";
import { addStudentComment } from "@/app/actions";

export default function StudentReplyForm({ assignmentId }: { assignmentId: string }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;
    setIsSubmitting(true);
    try {
      await addStudentComment(assignmentId, text);
      setText(""); 
    } catch (error) {
      console.error(error);
      alert("კომენტარი ვერ გაიგზავნა.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 flex gap-2 items-center">
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="მიწერე პასუხი ლექტორს..." 
        className="flex-1 bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button 
        onClick={handleSend} 
        disabled={isSubmitting || !text.trim()} 
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 active:scale-95 flex items-center gap-2"
      >
        {isSubmitting ? "..." : "გაგზავნა 🚀"}
      </button>
    </div>
  );
}