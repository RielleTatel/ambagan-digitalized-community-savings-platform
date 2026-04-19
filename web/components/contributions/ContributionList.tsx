import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import type { Contribution } from "./ContributionItem";

interface ContributionListProps {
  contributions: Contribution[];
  onViewBreakdown: (contribution: Contribution) => void;
  onPay: (contribution: Contribution) => void;
}

function formatPeso(amount: number) {
  return `₱${amount.toLocaleString()}`;
}

export function ContributionList({
  contributions,
  onViewBreakdown,
  onPay,
}: ContributionListProps) {
  const history = contributions.filter((c) => c.status !== "upcoming");

  if (history.length === 0) {
    return (
      <div className="py-16 text-center text-[#488D9F]/50 text-sm">
        No contribution history yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-[#D6ECF0] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-[#EAF5F8] bg-[#EAF5F8]/60">
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-[#488D9F]/70 uppercase tracking-widest w-10">
                #
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-[#488D9F]/70 uppercase tracking-widest">
                Date
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-[#488D9F]/70 uppercase tracking-widest">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-[#488D9F]/70 uppercase tracking-widest">
                Status
              </th>
              <th className="px-5 py-3 text-right text-[10px] font-semibold text-[#488D9F]/70 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAF5F8]">
            {history.map((contribution, index) => {
              const isMissed = contribution.status === "missed";
              return (
                <tr
                  key={contribution.id}
                  className={cn(
                    "transition-colors duration-150",
                    isMissed
                      ? "bg-red-50/30 hover:bg-red-50/50"
                      : "hover:bg-[#EAF5F8]/40"
                  )}
                >
                  {/* Row number */}
                  <td className="px-5 py-3.5 text-[#488D9F]/40 font-mono text-xs">
                    {index + 1}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5 text-[#488D9F]/70 font-medium">
                    {contribution.date}
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-[#12303A]">
                      {formatPeso(contribution.amount)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <StatusBadge status={contribution.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      {isMissed && (
                        <button
                          onClick={() => onPay(contribution)}
                          className={cn(
                            "h-7 px-3 rounded-lg text-xs font-semibold",
                            "bg-linear-to-r from-[#488D9F] to-[#3E7C8C] text-white",
                            "hover:brightness-105 transition-all duration-150 shadow-sm"
                          )}
                        >
                          Pay Now
                        </button>
                      )}
                      <button
                        onClick={() => onViewBreakdown(contribution)}
                        aria-label="View breakdown"
                        className="h-7 w-7 rounded-lg border border-[#D6ECF0] flex items-center justify-center text-[#488D9F]/50 hover:bg-[#EAF5F8] hover:text-[#488D9F] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer row count */}
      <div className="px-5 py-3 border-t border-[#EAF5F8] flex items-center justify-between">
        <p className="text-xs text-[#488D9F]/50">
          {history.length} {history.length === 1 ? "record" : "records"} total
        </p>
        <p className="text-xs text-[#488D9F]/50 font-mono">
          {history.filter((c) => c.status === "paid").length} paid ·{" "}
          {history.filter((c) => c.status === "missed").length} missed
        </p>
      </div>
    </div>
  );
}
