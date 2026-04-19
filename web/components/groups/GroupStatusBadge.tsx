import { cn } from "@/lib/utils";

export type GroupStatus = "active" | "pending_loans" | "inactive";

interface GroupStatusBadgeProps {
  status: GroupStatus;
  className?: string;
}

const statusConfig: Record<GroupStatus, { label: string; dot: string; text: string; border: string; bg: string }> = {
  active: {
    label: "Active",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
  },
  pending_loans: {
    label: "Pending Loans",
    dot: "bg-amber-400",
    text: "text-amber-700",
    border: "border-amber-200",
    bg: "bg-amber-50",
  },
  inactive: {
    label: "Inactive",
    dot: "bg-slate-400",
    text: "text-slate-500",
    border: "border-slate-200",
    bg: "bg-slate-50",
  },
};

export function GroupStatusBadge({ status, className }: GroupStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border",
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
      {config.label}
    </span>
  );
}
