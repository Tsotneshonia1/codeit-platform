"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { approveAssignment } from "@/app/actions";

export default function ApproveButton({ assignmentId }: { assignmentId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [grade, setGrade] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ❗ ვამოწმებთ, რომ კომპონენტი ჩაიტვირთა კლიენტზე (Next.js-ის გამო)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // სქროლის გათიშვა მოდალის გახსნისას
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // კომპონენტის წაშლისას სქროლის აღდგენა
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleApprove = async () => {
    const gradeNumber = Number(grade);

    if (!grade || isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
      alert("გთხოვთ, მიუთითოთ ვალიდური ქულა (0-დან 100-მდე).");
      return;
    }

    setIsSubmitting(true);
    try {
      await approveAssignment(assignmentId, gradeNumber, comment);
      setIsOpen(false);
      setGrade("");
      setComment("");
    } catch (error) {
      console.error("შეცდომა შეფასებისას:", error);
      alert("მოხდა შეცდომა მონაცემების შენახვისას.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🌟 მოდალური ფანჯრის HTML სტრუქტურა
  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#040812]/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)} 
      />

      {/* მოდალის კონტეინერი */}
      <div className="relative z-10 bg-[#0a0f1c] border border-white/10 w-full max-w-md rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300 text-left">
        
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors text-xl"
        >
          ✕
        </button>

        <h3 className="text-2xl font-black text-white mb-8 tracking-tight">ნამუშევრის შეფასება</h3>
        
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">
              ქულა (0-100)
            </label>
            <input 
              type="number" 
              min="0" max="100"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-black text-2xl"
              placeholder="მაგ: 95"
              autoFocus
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">
              კომენტარი სტუდენტს
            </label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm resize-none font-medium"
              placeholder="დაწერეთ რჩევები ან შენიშვნები..."
            />
          </div>
        </div>

        <div className="flex gap-4 mt-10 pt-6 border-t border-white/5">
          <button 
            onClick={() => setIsOpen(false)}
            className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:text-white transition-all text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white/10"
          >
            გაუქმება
          </button>
          <button 
            onClick={handleApprove}
            disabled={isSubmitting}
            className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20 active:scale-95"
          >
            {isSubmitting ? "გზავნა..." : "გაგზავნა 🚀"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-6 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/20 rounded-xl font-bold text-xs transition-all tracking-wide active:scale-95"
      >
        შეფასება
      </button>

      {/* ❗ ვიყენებთ createPortal-ს, რომ მოდალი პირდაპირ <body>-ში ჩაისვას ❗ */}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}