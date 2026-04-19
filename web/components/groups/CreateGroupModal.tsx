"use client";

import { useState } from "react";
import { X, PiggyBank, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  contribution: string;
  description: string;
}

interface FormErrors {
  name?: string;
  contribution?: string;
}

const inputBase = cn(
  "h-12 w-full rounded-xl border px-4 text-sm text-[#12303A] bg-white outline-none",
  "placeholder:text-[#488D9F]/40 transition-all duration-200",
  "border-[#D6ECF0] focus:border-[#488D9F] focus:ring-2 focus:ring-[#488D9F]/15"
);

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    contribution: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Group name is required.";
    if (!form.contribution.trim()) {
      newErrors.contribution = "Monthly contribution is required.";
    } else if (isNaN(Number(form.contribution)) || Number(form.contribution) <= 0) {
      newErrors.contribution = "Enter a valid amount greater than 0.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    handleClose();
  }

  function handleClose() {
    setForm({ name: "", contribution: "", description: "" });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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
          "relative z-10 w-full max-w-md rounded-2xl bg-white overflow-hidden",
          "border border-[#D6ECF0]",
          "shadow-[0_20px_40px_rgba(72,141,159,0.2),0_0_0_1px_rgba(72,141,159,0.05)]"
        )}
      >
        {/* Header accent bar — teal gradient */}
        <div className="h-1 w-full bg-gradient-to-r from-[#488D9F] to-[#3E7C8C]" />

        {/* Header */}
        <div className="p-6 pb-0 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-[0_4px_14px_rgba(72,141,159,0.3)]">
              <PiggyBank className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#12303A]">Create a Group</h2>
              <p className="text-xs text-[#488D9F]/70 mt-0.5">Start a new savings community</p>
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

        {/* Form */}
        <div className="p-6 flex flex-col gap-4">

          {/* Group Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-[0.12em] text-[#488D9F]/70">
              Group Name <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Gorilla Community Savings Fund"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={cn(
                inputBase,
                errors.name && "border-red-300 ring-2 ring-red-200 bg-red-50/30"
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Monthly Contribution */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-[0.12em] text-[#488D9F]/70">
              Monthly Contribution (₱) <span className="text-red-400 normal-case tracking-normal">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#488D9F]/60 pointer-events-none">
                ₱
              </span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="1,000"
                value={form.contribution}
                onChange={(e) => handleChange("contribution", e.target.value)}
                className={cn(
                  inputBase,
                  "pl-8",
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                  errors.contribution && "border-red-300 ring-2 ring-red-200 bg-red-50/30"
                )}
              />
            </div>
            {errors.contribution && (
              <p className="text-xs text-red-500">{errors.contribution}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-[0.12em] text-[#488D9F]/70">
              Description{" "}
              <span className="text-[#488D9F]/40 font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              placeholder="Brief description of your group's purpose..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className={cn(
                "w-full rounded-xl border border-[#D6ECF0] px-4 py-3 text-sm text-[#12303A]",
                "bg-white placeholder:text-[#488D9F]/40 resize-none outline-none",
                "focus:border-[#488D9F] focus:ring-2 focus:ring-[#488D9F]/15 transition-all duration-200"
              )}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "group mt-1 h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ease-out",
              !isSubmitting
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
                Creating...
              </>
            ) : (
              <>
                Create Group
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
