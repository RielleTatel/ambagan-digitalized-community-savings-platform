import { cn } from "@/lib/utils";

interface StatBox {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

interface OverviewStatsProps {
  stats?: StatBox[];
  className?: string;
}

const defaultStats: StatBox[] = [
  {
    label: "Total Collected",
    value: "₱72,000",
    change: "+₱6,000 this cycle",
    positive: true,
  },
  {
    label: "Members Paid",
    value: "10 / 12",
    change: "2 members pending",
    positive: false,
  },
  {
    label: "Next Payout",
    value: "Dec 2026",
    change: "8 months away",
    positive: true,
  },
];

export function OverviewStats({
  stats = defaultStats,
  className,
}: OverviewStatsProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-4",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#12303A]">Overview</h3>
        <button className="text-xs font-semibold bg-[#12303A] text-white px-4 py-1.5 rounded-full hover:bg-[#1E4D5C] transition-colors">
          Activity Ledger
        </button>
      </div>

      {/* Stat boxes */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex flex-col gap-1.5"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-2xl font-extrabold text-[#12303A] tracking-tight">
              {stat.value}
            </p>
            {stat.change && (
              <p
                className={cn(
                  "text-xs font-medium",
                  stat.positive ? "text-emerald-500" : "text-amber-500"
                )}
              >
                {stat.change}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
