interface ContributionSummaryProps {
  totalContributed: number;
  paidCount: number;
  missedCount: number;
}

function formatPeso(amount: number) {
  return `₱${amount.toLocaleString()}`;
}

export function ContributionSummary({
  totalContributed,
  paidCount,
  missedCount,
}: ContributionSummaryProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Total Contributed */}
      <div className="rounded-2xl bg-white border border-[#D6ECF0] shadow-sm px-5 py-4 flex items-center gap-3 min-w-[170px]">
        <div className="w-10 h-10 rounded-xl bg-[#EAF5F8] flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-[#488D9F]">₱</span>
        </div>
        <div>
          <p className="text-[11px] text-[#488D9F]/70 uppercase tracking-widest font-semibold leading-none mb-1">
            Total Contributed
          </p>
          <p className="text-xl font-extrabold text-[#12303A]">{formatPeso(totalContributed)}</p>
        </div>
      </div>

      {/* Paid Contributions */}
      <div className="rounded-2xl bg-white border border-[#D6ECF0] shadow-sm px-5 py-4 flex items-center gap-3 min-w-[170px]">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
        </div>
        <div>
          <p className="text-[11px] text-[#488D9F]/70 uppercase tracking-widest font-semibold leading-none mb-1">
            Paid
          </p>
          <p className="text-xl font-extrabold text-[#12303A]">{paidCount} Payments</p>
        </div>
      </div>

      {/* Missed Contributions */}
      <div className="rounded-2xl bg-white border border-[#D6ECF0] shadow-sm px-5 py-4 flex items-center gap-3 min-w-[170px]">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500 block" />
        </div>
        <div>
          <p className="text-[11px] text-[#488D9F]/70 uppercase tracking-widest font-semibold leading-none mb-1">
            Missed
          </p>
          <p className="text-xl font-extrabold text-[#12303A]">
            {missedCount} {missedCount === 1 ? "Payment" : "Payments"}
          </p>
        </div>
      </div>
    </div>
  );
}
