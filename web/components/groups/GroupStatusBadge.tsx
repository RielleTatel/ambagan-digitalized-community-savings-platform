import { cn } from "@/lib/utils";

export type GroupStatus = "active" | "pending_loans" | "inactive";

interface GroupStatusBadgeProps {
  status: GroupStatus;
  className?: string;
}

const statusConfig: Record<GroupStatus, { label: string; dot: string; badge: string }> = {
  active: {
    label: "Active",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
  pending_loans: {
    label: "Pending Loans",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700",
  },
  inactive: {
    label: "Inactive",
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-600",
  },
};

export function GroupStatusBadge({ status, className }: GroupStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full",
        config.badge,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
      {config.label}
    </span>
  );
}
