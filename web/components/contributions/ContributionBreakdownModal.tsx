"use client";

import { X, Receipt } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { Contribution } from "./ContributionItem";

interface ContributionBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  contribution: Contribution | null;
}

function formatPeso(amount: number) {
  return `₱${amount.toLocaleString()}`;
}

export function ContributionBreakdownModal({
  isOpen,
  onClose,
  contribution,
}: ContributionBreakdownModalProps) {
  if (!isOpen || !contribution) return null;

  const base       = contribution.amount;
  const penaltyRate = 0.02;
  const penalty    = contribution.status === "missed" ? Math.round(base * penaltyRate) : 0;
  const total      = base + penalty;
  const isPaid     = contribution.status === "paid";
  const isUpcoming = contribution.status === "upcoming";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-[#12303A]/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white shadow-[0_20px_40px_rgba(72,141,159,0.15)] border border-[#D6ECF0] overflow-hidden">
        {/* Teal accent bar */}
        <div className="h-1 w-full bg-linear-to-r from-[#488D9F] to-[#3E7C8C]" />

        {/* Header */}
        <div className="p-6 pb-0 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-sm">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#12303A]">Contribution Breakdown</h2>
              <p className="text-xs text-[#488D9F]/60 mt-0.5">{contribution.date}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#488D9F]/50 hover:bg-[#EAF5F8] hover:text-[#488D9F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Status badge */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#488D9F]/70">
              Status
            </span>
            <StatusBadge status={contribution.status} />
          </div>

          {/* Breakdown table */}
          <div className="rounded-xl border border-[#D6ECF0] overflow-hidden divide-y divide-[#EAF5F8]">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-[#488D9F]/70">Base Contribution</span>
              <span className="text-sm font-semibold text-[#12303A]">{formatPeso(base)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-[#488D9F]/70 flex items-center gap-1.5">
                Penalty Interest
                {penalty > 0 && (
                  <span className="text-[11px] font-semibold text-red-400 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
                    2%
                  </span>
                )}
              </span>
              <span
                className={`text-sm font-semibold ${
                  penalty > 0 ? "text-red-500" : "text-[#488D9F]/30"
                }`}
              >
                {penalty > 0 ? formatPeso(penalty) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-[#EAF5F8]">
              <span className="text-sm font-bold text-[#12303A]">Total</span>
              <span className="text-base font-extrabold text-[#12303A]">{formatPeso(total)}</span>
            </div>
          </div>

          {/* Contextual note */}
          <div
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              isPaid
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : isUpcoming
                ? "bg-amber-50 text-amber-700 border border-amber-100"
                : "bg-red-50 text-red-600 border border-red-100"
            }`}
          >
            {isPaid
              ? "This contribution has been fully paid and confirmed."
              : isUpcoming
              ? "This payment is not yet due. Pay early to avoid penalties."
              : "This payment is overdue. Penalties may continue to accrue."}
          </div>

          <button
            onClick={onClose}
            className="h-10 rounded-xl text-sm font-semibold bg-[#EAF5F8] text-[#488D9F] border border-[#D6ECF0] hover:bg-[#D6ECF0] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
