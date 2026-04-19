"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { X, Users, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CODE_LENGTH = 6;

export function JoinGroupModal({ isOpen, onClose }: JoinGroupModalProps) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!isOpen) return null;

  const fullCode = code.join("");
  const isComplete = fullCode.length === CODE_LENGTH && code.every((c) => c !== "");

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const trimmed = value.slice(-1);
    const updated = [...code];
    updated[index] = trimmed;
    setCode(updated);
    setError("");

    if (trimmed && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    const updated = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      updated[i] = char;
    });
    setCode(updated);
    const nextFocus = Math.min(pasted.length, CODE_LENGTH - 1);
    inputRefs.current[nextFocus]?.focus();
  }

  async function handleSubmit() {
    if (!isComplete) return;
    setIsSubmitting(true);
    setError("");

    await new Promise((r) => setTimeout(r, 1200));

    if (fullCode === "000000") {
      setError("Invalid group code. Please check and try again.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    handleClose();
  }

  function handleClose() {
    setCode(Array(CODE_LENGTH).fill(""));
    setError("");
    setIsSubmitting(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#12303A]/40 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className={cn(
          "relative z-10 w-full max-w-sm rounded-2xl bg-white overflow-hidden",
          "border border-[#D6ECF0]",
          "shadow-[0_20px_40px_rgba(72,141,159,0.2),0_0_0_1px_rgba(72,141,159,0.05)]"
        )}
      >
        {/* Header accent bar — teal gradient */}
        <div className="h-1 w-full bg-gradient-to-r from-[#488D9F] to-[#3E7C8C]" />

        {/* Header */}
        <div className="p-6 pb-0 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Teal gradient icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-[0_4px_14px_rgba(72,141,159,0.3)]">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#12303A]">Join a Group</h2>
              <p className="text-xs text-[#488D9F]/70 mt-0.5">Enter the 6-digit invite code</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-[#488D9F]/60",
              "hover:bg-[#EAF5F8] hover:text-[#12303A] transition-colors duration-200"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* OTP inputs */}
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: CODE_LENGTH }).map((_, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className={cn(
                  "w-11 h-12 rounded-xl border text-center text-lg font-bold outline-none",
                  "bg-white text-[#12303A] transition-all duration-200",
                  error
                    ? "border-red-300 text-red-500 bg-red-50"
                    : code[i]
                    ? "border-[#488D9F] bg-[#EAF5F8] text-[#488D9F]"
                    : "border-[#D6ECF0] bg-[#F5FBFC] text-[#12303A]",
                  "focus:border-[#488D9F] focus:ring-2 focus:ring-[#488D9F]/20 focus:bg-white"
                )}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center -mt-1">{error}</p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className={cn(
              "group h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ease-out",
              isComplete && !isSubmitting
                ? cn(
                    "bg-gradient-to-r from-[#488D9F] to-[#3E7C8C] text-white",
                    "shadow-[0_4px_14px_rgba(72,141,159,0.3)]",
                    "hover:shadow-[0_8px_24px_rgba(72,141,159,0.4)] hover:brightness-105 hover:-translate-y-0.5",
                    "active:scale-[0.98]"
                  )
                : "bg-[#EAF5F8] text-[#488D9F]/50 cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                Join Group
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#488D9F]/60">
            Ask your group admin for the invite code.
          </p>
        </div>
      </div>
    </div>
  );
}
