export function ContributionsHeader() {
  return (
    <div className="flex flex-col gap-3">
      {/* Section label badge */}
      <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#488D9F]/25 bg-[#488D9F]/8 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-[#12303A] to-[#488D9F]" />
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#488D9F]">
          Your Savings
        </span>
      </div>

      {/* Headline — Calistoga display font */}
      <h1 className="font-display text-2xl tracking-tight leading-tight text-[#12303A] lg:text-[2.25rem]">
        Your
        <br />
        <span className="relative inline-block">
          <span className="bg-linear-to-r from-[#12303A] to-[#488D9F] bg-clip-text text-transparent">
            Contributions
          </span>
          <span className="absolute -bottom-1 left-0 h-2 w-full rounded-sm bg-linear-to-r from-[#488D9F]/20 to-[#3E7C8C]/10" />
        </span>
      </h1>

      <p className="text-[0.9rem] leading-relaxed text-[#488D9F]/70 max-w-sm">
        Track your savings and stay on schedule.
      </p>
    </div>
  );
}
