import Link from "next/link";
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

const statusContribution: Record<GroupStatus, string> = {
  active: "text-emerald-600",
  pending_loans: "text-amber-600",
  inactive: "text-gray-400",
};

interface GroupCardProps {
  group: Group;
}

function formatPeso(amount: number) {
  return `₱${amount.toLocaleString()}`;
}

export function GroupCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm animate-pulse">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
          <div className="h-5 w-16 bg-gray-100 rounded-full shrink-0" />
        </div>
        <div className="rounded-xl bg-gray-50 px-4 py-3 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-28" />
            <div className="h-7 bg-gray-100 rounded w-20" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-gray-50 px-3 py-2.5 space-y-1.5">
            <div className="h-3 bg-gray-100 rounded w-16" />
            <div className="h-5 bg-gray-100 rounded w-20" />
          </div>
          <div className="rounded-lg bg-gray-50 px-3 py-2.5 space-y-1.5">
            <div className="h-3 bg-gray-100 rounded w-12" />
            <div className="h-5 bg-gray-100 rounded w-8" />
          </div>
        </div>
        <div className="h-11 bg-gray-100 rounded-xl" />
      </div>
    </div>
  );
}

export function GroupCard({ group }: GroupCardProps) {
  const {
    id, name, established, contribution,
    members, status, totalPool, yourContribution,
  } = group;

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-gray-100 shadow-sm",
        "hover:shadow-md transition-shadow duration-200",
        status === "inactive" && "opacity-70"
      )}
    >
      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900 leading-snug">
              {name}
            </h3>
            {established && (
              <p className="text-xs text-gray-400 mt-0.5">Est. {established}</p>
            )}
          </div>
          <GroupStatusBadge status={status} className="shrink-0 mt-0.5" />
        </div>

        {/* Hero: contribution */}
        <div className="rounded-xl bg-gray-50 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
              Monthly contribution
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPeso(contribution)}
            </p>
          </div>
          <span className="text-2xl text-gray-200 font-bold select-none">₱</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2">
          {totalPool !== undefined && (
            <div className="rounded-lg bg-gray-50 px-3 py-2.5">
              <p className="text-[11px] text-gray-400 mb-1">Total pool</p>
              <p className="text-[17px] font-semibold text-gray-900">
                {formatPeso(totalPool)}
              </p>
            </div>
          )}
          <div className="rounded-lg bg-gray-50 px-3 py-2.5">
            <p className="text-[11px] text-gray-400 mb-1">Members</p>
            <p className="text-[17px] font-semibold text-gray-900">{members}</p>
          </div>
        </div>

        {/* Your contribution */}
        {yourContribution !== undefined && (
          <div className="flex items-center justify-between px-3 py-2 border border-gray-100 rounded-lg">
            <span className="text-sm text-gray-500">Your contribution</span>
            <span className={cn("text-sm font-semibold", statusContribution[status])}>
              {formatPeso(yourContribution)}
            </span>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/groups/${id}`}
          className="flex items-center justify-center gap-1.5 h-11 rounded-xl text-sm font-semibold bg-white border border-[#488D9F] text-[#488D9F] hover:bg-[#488D9F]/5 transition-colors duration-150"
        >
          View group →
        </Link>
      </div>
    </div>
  );
}