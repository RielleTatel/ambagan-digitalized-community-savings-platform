import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GroupStatusBadge, type GroupStatus } from "./GroupStatusBadge";

export interface Group {
  id: string;
  name: string;
  established?: string;
  contribution: number;
  members: number;
  status: GroupStatus;
  totalPool?: number;
  yourContribution?: number;
}

const yourContributionColor: Record<GroupStatus, string> = {
  active: "text-emerald-600",
  pending_loans: "text-amber-600",
  inactive: "text-[#488D9F]/50",
};

interface GroupCardProps {
  group: Group;
}

function formatPeso(amount: number) {
  return `₱${amount.toLocaleString()}`;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function GroupCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#D6ECF0] shadow-sm animate-pulse p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#EAF5F8] rounded-full w-3/4" />
          <div className="h-3 bg-[#EAF5F8] rounded-full w-1/3" />
        </div>
        <div className="h-5 w-20 bg-[#EAF5F8] rounded-full" />
      </div>
      <div className="h-20 bg-[#EAF5F8] rounded-xl" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-16 bg-[#EAF5F8] rounded-xl" />
        <div className="h-16 bg-[#EAF5F8] rounded-xl" />
      </div>
      <div className="h-11 bg-[#EAF5F8] rounded-xl" />
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function GroupCard({ group }: GroupCardProps) {
  const { id, name, established, contribution, members, status, totalPool, yourContribution } =
    group;

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-white border border-[#D6ECF0]",
        "shadow-[0_2px_8px_rgba(72,141,159,0.08)]",
        "hover:shadow-[0_12px_24px_rgba(72,141,159,0.15)]",
        "hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden",
        status === "inactive" && "opacity-70"
      )}
    >
      {/* Teal gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#488D9F]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative p-5 flex flex-col gap-4">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[0.95rem] font-semibold text-[#12303A] leading-snug">
              {name}
            </h3>
            {established && (
              <p className="text-xs text-[#488D9F]/70 mt-0.5">Est. {established}</p>
            )}
          </div>
          <GroupStatusBadge status={status} className="shrink-0 mt-0.5" />
        </div>

        {/* ── Contribution hero — teal-tinted well ── */}
        <div className="rounded-xl bg-gradient-to-br from-[#EAF5F8] to-[#EAF5F8]/60 border border-[#D6ECF0] px-4 py-3.5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#488D9F]/70 mb-1">
              Monthly contribution
            </p>
            <p className="text-2xl font-bold text-[#12303A]">
              {formatPeso(contribution)}
            </p>
          </div>
          {/* Teal gradient icon accent */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-[0_4px_14px_rgba(72,141,159,0.3)]">
            <span className="text-white text-sm font-bold">₱</span>
          </div>
        </div>

        {/* ── Stats grid — teal-tinted cells ── */}
        <div className="grid grid-cols-2 gap-2.5">
          {totalPool !== undefined && (
            <div className="rounded-xl border border-[#D6ECF0] bg-[#EAF5F8]/60 px-3 py-2.5">
              <p className="text-[10px] text-[#488D9F]/70 uppercase tracking-widest mb-1">Total pool</p>
              <p className="text-[15px] font-semibold text-[#12303A]">
                {formatPeso(totalPool)}
              </p>
            </div>
          )}
          <div className="rounded-xl border border-[#D6ECF0] bg-[#EAF5F8]/60 px-3 py-2.5">
            <p className="text-[10px] text-[#488D9F]/70 uppercase tracking-widest mb-1">Members</p>
            <p className="text-[15px] font-semibold text-[#12303A]">{members}</p>
          </div>
        </div>

        {/* ── Your contribution ── */}
        {yourContribution !== undefined && (
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-[#D6ECF0]">
            <span className="text-sm text-[#488D9F]/80">Your contribution</span>
            <span className={cn("text-sm font-semibold", yourContributionColor[status])}>
              {formatPeso(yourContribution)}
            </span>
          </div>
        )}

        {/* ── CTA — teal gradient button ── */}
        <Link
          href={`/groups/${id}`}
          className={cn(
            "group/btn flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold",
            "bg-gradient-to-r from-[#488D9F] to-[#3E7C8C] text-white",
            "shadow-[0_4px_14px_rgba(72,141,159,0.3)]",
            "hover:shadow-[0_8px_24px_rgba(72,141,159,0.4)] hover:brightness-105 hover:-translate-y-0.5",
            "active:scale-[0.98] transition-all duration-200 ease-out"
          )}
        >
          View Group
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </Link>

      </div>
    </div>
  );
}
