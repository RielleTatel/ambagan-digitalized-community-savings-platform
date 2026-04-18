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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-0 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5F8] flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-[#488D9F]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#12303A]">Create a Group</h2>
              <p className="text-xs text-gray-400 mt-0.5">Start a new savings community</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-4">
          {/* Group Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#12303A]">
              Group Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Gorilla Community Savings Fund"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={cn(
                "h-10 w-full rounded-xl border px-3 text-sm text-[#12303A] outline-none transition-all",
                "placeholder:text-gray-300",
                "focus:border-[#488D9F] focus:ring-2 focus:ring-[#488D9F]/20",
                errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Monthly Contribution */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#12303A]">
              Monthly Contribution (₱) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                ₱
              </span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="1,000"
                value={form.contribution}
                onChange={(e) => handleChange("contribution", e.target.value)}
                className={cn(
                  "h-10 w-full rounded-xl border pl-7 pr-3 text-sm text-[#12303A] outline-none transition-all",
                  "placeholder:text-gray-300",
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                  "focus:border-[#488D9F] focus:ring-2 focus:ring-[#488D9F]/20",
                  errors.contribution
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                )}
              />
            </div>
            {errors.contribution && (
              <p className="text-xs text-red-500">{errors.contribution}</p>
            )}
          </div>

          {/* Description (optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#12303A]">
              Description{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="Brief description of your group's purpose..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className={cn(
                "w-full rounded-xl border px-3 py-2.5 text-sm text-[#12303A] resize-none outline-none transition-all",
                "placeholder:text-gray-300",
                "focus:border-[#488D9F] focus:ring-2 focus:ring-[#488D9F]/20",
                "border-gray-200 bg-gray-50"
              )}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "mt-1 h-10 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150",
              "bg-[#488D9F] text-white hover:bg-[#3E7C8C] disabled:opacity-60 disabled:cursor-not-allowed"
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
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
