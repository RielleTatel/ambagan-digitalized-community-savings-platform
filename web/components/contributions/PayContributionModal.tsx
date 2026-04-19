"use client";

import { useState } from "react";
import { X, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PayContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  dueDate: string;
}

const PAYMENT_METHODS = [
  { id: "gcash", label: "GCash" },
  { id: "maya", label: "Maya" },
  { id: "bank", label: "Bank Transfer" },
  { id: "cash", label: "Cash (via Admin)" },
];

function formatPeso(amount: number) {
  return `₱${amount.toLocaleString()}`;
}

export function PayContributionModal({
  isOpen,
  onClose,
  amount,
  dueDate,
}: PayContributionModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [isDone, setIsDone]                 = useState(false);

  if (!isOpen) return null;

  async function handleConfirm() {
    if (!selectedMethod) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSubmitting(false);
    setIsDone(true);
  }

  function handleClose() {
    setSelectedMethod("");
    setIsSubmitting(false);
    setIsDone(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="absolute inset-0 bg-[#12303A]/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white shadow-[0_20px_40px_rgba(72,141,159,0.15)] border border-[#D6ECF0] overflow-hidden">
        {/* Teal accent bar */}
        <div className="h-1 w-full bg-linear-to-r from-[#488D9F] to-[#3E7C8C]" />

        {isDone ? (
          /* Success state */
          <div className="p-8 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#12303A]">Payment Submitted!</h2>
              <p className="text-sm text-[#488D9F]/60 mt-1">
                Your contribution of {formatPeso(amount)} has been recorded.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="h-10 w-full rounded-xl text-sm font-semibold bg-linear-to-r from-[#488D9F] to-[#3E7C8C] text-white hover:brightness-105 transition-all mt-2 shadow-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 pb-0 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-sm">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#12303A]">Pay Contribution</h2>
                  <p className="text-xs text-[#488D9F]/60 mt-0.5">Due {dueDate}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#488D9F]/50 hover:bg-[#EAF5F8] hover:text-[#488D9F] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              {/* Amount */}
              <div className="rounded-xl bg-[#EAF5F8] border border-[#D6ECF0] px-4 py-3 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#488D9F]/70">
                  Amount Due
                </p>
                <p className="text-2xl font-bold text-[#12303A]">{formatPeso(amount)}</p>
              </div>

              {/* Payment method selection */}
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#488D9F]/70">
                  Payment Method
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "h-11 rounded-xl border text-sm font-semibold transition-all duration-150",
                        selectedMethod === method.id
                          ? "border-[#488D9F] bg-[#EAF5F8] text-[#488D9F]"
                          : "border-[#D6ECF0] bg-white text-[#488D9F]/70 hover:border-[#488D9F]/50 hover:bg-[#EAF5F8]/50"
                      )}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm */}
              <button
                onClick={handleConfirm}
                disabled={!selectedMethod || isSubmitting}
                className={cn(
                  "h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150",
                  selectedMethod && !isSubmitting
                    ? "bg-linear-to-r from-[#488D9F] to-[#3E7C8C] text-white hover:brightness-105 shadow-sm"
                    : "bg-[#EAF5F8] text-[#488D9F]/40 cursor-not-allowed border border-[#D6ECF0]"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Payment"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
