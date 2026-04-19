import { cn } from "@/lib/utils";

export type ContributionStatus = "paid" | "missed" | "upcoming";

const statusConfig: Record<ContributionStatus, { label: string; dot: string; badge: string }> = {
  paid: {
    label: "Paid",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
  missed: {
    label: "Missed",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-600",
  },
  upcoming: {
    label: "Upcoming",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700",
  },
};

interface StatusBadgeProps {
  status: ContributionStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
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
