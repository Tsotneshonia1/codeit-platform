"use client";

import { useState } from "react";
import { updateAssignmentStatus } from "@/app/actions";
import { Status } from "@prisma/client";

interface ApproveButtonProps {
  assignmentId: string;
}

export default function ApproveButton({ assignmentId }: ApproveButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    // ვადასტურებთ მომხმარებელთან (სურვილისამებრ)
    const confirmed = confirm("ნამდვილად გსურთ ამ დავალების დადასტურება?");
    if (!confirmed) return;

    setLoading(true);
    try {
      // ვიყენებთ actions.ts-ში შექმნილ ფუნქციას
      const result = await updateAssignmentStatus(assignmentId, Status.APPROVED);
      
      if (!result.success) {
        alert("შეცდომა: დავალება ვერ დადასტურდა");
      }
    } catch (error) {
      console.error("Approve error:", error);
      alert("სისტემური შეცდომა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className={`
        px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95
        flex items-center gap-2 mx-auto
        ${loading 
          ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
          : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"}
      `}
    >
      {loading ? (
        <>
          <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          მუშავდება...
        </>
      ) : (
        <>
          <span>Approve</span>
          <span className="text-sm">✓</span>
        </>
      )}
    </button>
  );
}