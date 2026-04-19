import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  value?: string;
  subtitle?: string;
  badge?: string;
  accent?: boolean;
  large?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function InfoCard({
  title,
  value,
  subtitle,
  badge,
  accent = false,
  large = false,
  className,
  children,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border shadow-sm p-5 flex flex-col gap-3",
        accent
          ? "bg-gradient-to-br from-[#12303A] to-[#3E7C8C] text-white border-transparent"
          : "bg-white border-[#D6ECF0] text-[#12303A]",
        large && "p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-widest",
            accent ? "text-white/60" : "text-[#488D9F]/70"
          )}
        >
          {title}
        </p>
        {badge && (
          <span
            className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full",
              accent
                ? "bg-white/15 text-white/80"
                : "bg-[#EAF5F8] text-[#488D9F]"
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {value && (
        <p
          className={cn(
            "font-extrabold tracking-tight",
            large ? "text-3xl" : "text-2xl",
            accent ? "text-white" : "text-[#12303A]"
          )}
        >
          {value}
        </p>
      )}

      {subtitle && (
        <p
          className={cn(
            "text-sm",
            accent ? "text-white/55" : "text-[#488D9F]/60"
          )}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
