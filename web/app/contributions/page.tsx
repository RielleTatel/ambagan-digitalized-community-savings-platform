"use client";

import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { ContributionsHeader } from "@/components/contributions/ContributionsHeader";
import { ContributionSummary } from "@/components/contributions/ContributionSummary";
import { ContributionList } from "@/components/contributions/ContributionList";
import { PayContributionModal } from "@/components/contributions/PayContributionModal";
import { ContributionBreakdownModal } from "@/components/contributions/ContributionBreakdownModal";
import type { Contribution } from "@/components/contributions/ContributionItem";

// --- Mock data — swap for TanStack Query + API call ---
const mockContributions: Contribution[] = [
  { id: "1",  date: "March 30, 2026",    amount: 1000, status: "upcoming" },
  { id: "2",  date: "March 1, 2026",     amount: 1000, status: "paid"     },
  { id: "3",  date: "February 1, 2026",  amount: 1000, status: "missed"   },
  { id: "4",  date: "January 1, 2026",   amount: 1000, status: "paid"     },
  { id: "5",  date: "December 1, 2025",  amount: 1000, status: "paid"     },
  { id: "6",  date: "November 1, 2025",  amount: 1000, status: "paid"     },
  { id: "7",  date: "October 1, 2025",   amount: 1000, status: "paid"     },
  { id: "8",  date: "September 1, 2025", amount: 1000, status: "missed"   },
  { id: "9",  date: "August 1, 2025",    amount: 1000, status: "paid"     },
  { id: "10", date: "July 1, 2025",      amount: 1000, status: "paid"     },
];

export default function ContributionsPage() {
  const [payModalOpen, setPayModalOpen]             = useState(false);
  const [breakdownModalOpen, setBreakdownModalOpen] = useState(false);
  const [payTarget, setPayTarget]                   = useState<Contribution | null>(null);
  const [breakdownTarget, setBreakdownTarget]       = useState<Contribution | null>(null);

  const upcoming         = mockContributions.find((c) => c.status === "upcoming");
  const paidCount        = mockContributions.filter((c) => c.status === "paid").length;
  const missedCount      = mockContributions.filter((c) => c.status === "missed").length;
  const totalContributed = mockContributions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.amount, 0);

  function openPay(contribution: Contribution) {
    setPayTarget(contribution);
    setPayModalOpen(true);
  }

  function openBreakdown(contribution: Contribution) {
    setBreakdownTarget(contribution);
    setBreakdownModalOpen(true);
  }

  function closePay() {
    setPayModalOpen(false);
    setPayTarget(null);
  }

  function closeBreakdown() {
    setBreakdownModalOpen(false);
    setBreakdownTarget(null);
  }

  return (
    <>
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex flex-col gap-6 pb-12">

          {/* ── Header ── */}
          <ContributionsHeader />

          {/* ── Summary cards ── */}
          <ContributionSummary
            totalContributed={totalContributed}
            paidCount={paidCount}
            missedCount={missedCount}
          />

          {/* ── Upcoming payment highlight ── */}
          {upcoming && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-amber-600/80">
                    Next Payment
                  </p>
                  <p className="text-base font-bold text-[#12303A]">
                    ₱{upcoming.amount.toLocaleString()} due on {upcoming.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => openPay(upcoming)}
                className="h-10 px-6 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#488D9F] to-[#3E7C8C] text-white shadow-sm hover:brightness-105 transition-all shrink-0"
              >
                Pay Now
              </button>
            </div>
          )}

          {/* ── Payment history ── */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-[#488D9F]/70">
              Payment History
            </h2>
            <ContributionList
              contributions={mockContributions}
              onViewBreakdown={openBreakdown}
              onPay={openPay}
            />
          </div>

        </div>
      </div>

      {/* ── Modals ── */}
      <PayContributionModal
        isOpen={payModalOpen}
        onClose={closePay}
        amount={payTarget?.amount ?? 0}
        dueDate={payTarget?.date ?? ""}
      />

      <ContributionBreakdownModal
        isOpen={breakdownModalOpen}
        onClose={closeBreakdown}
        contribution={breakdownTarget}
      />
    </>
  );
}
