import Link from "next/link";
import { Users, Coins, ArrowRight, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";
import { GroupStatusBadge, type GroupStatus } from "./GroupStatusBadge";

export interface Group {
  id: string;
  name: string;
  contribution: number;
  members: number;
  status: GroupStatus;
  totalPool?: number;
  yourContribution?: number;
}

interface GroupCardProps {
  group: Group;
}

const statusAccent: Record<GroupStatus, string> = {
  active: "border-l-emerald-400",
  pending_loans: "border-l-amber-400",
  inactive: "border-l-red-300",
};

function formatPeso(amount: number) {
  return `₱${amount.toLocaleString()}`;
}

export function GroupCard({ group }: GroupCardProps) {
  const { id, name, contribution, members, status, totalPool, yourContribution } = group;

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-4",
        "border-l-4",
        statusAccent[status],
        "hover:shadow-md transition-shadow duration-200"
      )}
    >
      {/* Top: Name + Badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-[#12303A] leading-snug line-clamp-2">
          {name}
        </h3>
        <GroupStatusBadge status={status} className="shrink-0 mt-0.5" />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-[#EAF5F8] flex items-center justify-center shrink-0">
            <Coins className="w-4 h-4 text-[#488D9F]" />
          </div>
          <span className="font-semibold text-[#12303A] text-sm">
            {formatPeso(contribution)}
          </span>
          <span className="text-xs text-gray-400">/ mo</span>
        </div>

        <div className="h-4 w-px bg-[#D6ECF0]" />

        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-[#EAF5F8] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-[#488D9F]" />
          </div>
          <span className="font-semibold text-[#12303A] text-sm">{members}</span>
          <span className="text-xs text-gray-400">members</span>
        </div>
      </div>

      {/* Preview stats */}
      {(totalPool !== undefined || yourContribution !== undefined) && (
        <div className="rounded-xl bg-[#EAF5F8]/50 border border-[#A8D9E4]/40 p-3 flex flex-col gap-2">
          {totalPool !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#488D9F]/70 flex items-center gap-1.5">
                <PiggyBank className="w-3.5 h-3.5" />
                Total pool
              </span>
              <span className="font-bold text-[#12303A]">{formatPeso(totalPool)}</span>
            </div>
          )}
          {yourContribution !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#488D9F]/70">Your contribution</span>
              <span className="font-semibold text-[#488D9F]">
                {formatPeso(yourContribution)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Footer action */}
      <Link
        href={`/groups/${id}`}
        className={cn(
          "mt-auto flex items-center justify-center gap-1.5",
          "h-10 rounded-xl text-sm font-semibold transition-all duration-150",
          "bg-[#EAF5F8] text-[#488D9F] hover:bg-[#488D9F] hover:text-white"
        )}
      >
        View Group
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export function GroupCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-4 border-l-4 border-l-gray-200 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-6 bg-gray-100 rounded-full w-20 shrink-0" />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-4 bg-gray-100 rounded w-24" />
        <div className="h-4 bg-gray-100 rounded w-20" />
      </div>
      <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 flex flex-col gap-2">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="h-9 rounded-xl bg-gray-100" />
    </div>
  );
}
