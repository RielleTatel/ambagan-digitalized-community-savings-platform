import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BulletItem {
  label: string;
  value: string;
}

interface SectionCardProps {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  bullets?: BulletItem[];
  badge?: string;
  badgeColor?: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionCard({
  title,
  icon: Icon,
  iconColor = "bg-[#EAF5F8] text-[#488D9F]",
  bullets,
  badge,
  badgeColor = "bg-[#EAF5F8] text-[#488D9F]",
  placeholder,
  className,
  children,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-3",
        className
      )}
    >
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                iconColor
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h3 className="text-sm font-bold text-[#12303A]">{title}</h3>
        </div>
        {badge && (
          <span
            className={cn(
              "text-[10px] font-bold px-2.5 py-1 rounded-full",
              badgeColor
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Bullet list */}
      {bullets && bullets.length > 0 && (
        <ul className="flex flex-col gap-2 mt-1">
          {bullets.map((item, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#488D9F] inline-block" />
                {item.label}
              </span>
              <span className="font-semibold text-[#12303A]">{item.value}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Placeholder */}
      {placeholder && !children && (
        <div className="mt-1 rounded-xl bg-gray-50 border border-dashed border-gray-200 py-6 flex items-center justify-center">
          <p className="text-xs text-gray-400">{placeholder}</p>
        </div>
      )}

      {children}
    </div>
  );
}
