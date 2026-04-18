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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-0 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5F8] flex items-center justify-center">
              <Users className="w-5 h-5 text-[#488D9F]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#12303A]">Join a Group</h2>
              <p className="text-xs text-gray-400 mt-0.5">Enter the 6-digit invite code</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
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
                  "w-11 h-12 rounded-xl border text-center text-lg font-bold text-[#12303A] outline-none transition-all",
                  "focus:border-[#488D9F] focus:ring-2 focus:ring-[#488D9F]/20",
                  error
                    ? "border-red-300 bg-red-50"
                    : code[i]
                    ? "border-[#488D9F] bg-[#EAF5F8]"
                    : "border-gray-200 bg-gray-50"
                )}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center -mt-1">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className={cn(
              "h-10 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150",
              isComplete && !isSubmitting
                ? "bg-[#488D9F] text-white hover:bg-[#3E7C8C]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Ask your group admin for the invite code.
          </p>
        </div>
      </div>
    </div>
  );
}
