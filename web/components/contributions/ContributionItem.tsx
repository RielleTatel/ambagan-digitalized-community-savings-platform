import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge, type ContributionStatus } from "./StatusBadge";

export interface Contribution {
  id: string;
  date: string;
  amount: number;
  status: ContributionStatus;
  note?: string;
}

interface ContributionItemProps {
  contribution: Contribution;
  onViewBreakdown: (contribution: Contribution) => void;
  onPay?: (contribution: Contribution) => void;
}

function formatPeso(amount: number) {
  return `₱${amount.toLocaleString()}`;
}

export function ContributionItem({
  contribution,
  onViewBreakdown,
  onPay,
}: ContributionItemProps) {
  const { date, amount, status } = contribution;
  const isMissed = status === "missed";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl bg-white border shadow-sm px-5 py-4",
        "hover:shadow-[0_4px_12px_rgba(72,141,159,0.1)] transition-shadow duration-200",
        isMissed ? "border-red-200" : "border-[#D6ECF0]"
      )}
    >
      {/* Left: icon + date + amount */}
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            isMissed ? "bg-red-50" : "bg-[#EAF5F8]"
          )}
        >
          <span
            className={cn(
              "text-sm font-bold",
              isMissed ? "text-red-400" : "text-[#488D9F]"
            )}
          >
            ₱
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-[#488D9F]/60 truncate">{date}</p>
          <p className="text-base font-bold text-[#12303A]">{formatPeso(amount)}</p>
        </div>
      </div>

      {/* Right: badge + actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <StatusBadge status={status} />

        {isMissed && onPay && (
          <button
            onClick={() => onPay(contribution)}
            className={cn(
              "h-8 px-3.5 rounded-xl text-xs font-semibold",
              "bg-linear-to-r from-[#488D9F] to-[#3E7C8C] text-white",
              "shadow-sm hover:brightness-105 transition-all duration-200"
            )}
          >
            Pay Now
          </button>
        )}

        <button
          onClick={() => onViewBreakdown(contribution)}
          aria-label="View breakdown"
          className="w-8 h-8 rounded-xl border border-[#D6ECF0] flex items-center justify-center text-[#488D9F]/50 hover:bg-[#EAF5F8] hover:text-[#488D9F] transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
