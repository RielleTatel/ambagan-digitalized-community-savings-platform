"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";

// `matchPath` is the path that makes an item "active".
// Items without their own page get `matchPath: null` — they navigate
// somewhere useful but never light up as the current section.
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", matchPath: "/dashboard" },
  { icon: Users,           label: "My Groups",  href: "/groups",   matchPath: "/groups"    },
  { icon: Wallet,          label: "Savings",    href: "/dashboard", matchPath: null         },
  { icon: BarChart3,       label: "Reports",    href: "/dashboard", matchPath: null         },
  { icon: Settings,        label: "Settings",   href: "/dashboard", matchPath: null         },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col items-center justify-between w-20 min-h-screen py-6 bg-white rounded-2xl shadow-sm border border-[#D6ECF0] shrink-0",
        className
      )}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-6 w-full">
        <Link
          href="/dashboard"
          className="w-10 h-10 rounded-xl bg-linear-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
        >
          <Coins className="w-5 h-5 text-white" />
        </Link>

        {/* Nav Items */}
        <nav className="flex flex-col items-center gap-2 w-full px-2 mt-2">
          {navItems.map(({ icon: Icon, label, href, matchPath }) => {
            const isActive =
              matchPath !== null &&
              (pathname === matchPath || pathname.startsWith(matchPath + "/"));
            return (
              <Link
                key={label}
                href={href}
                title={label}
                className={cn(
                  "w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-[#488D9F] text-[#488D9F] shadow-sm"
                    : "text-[#488D9F]/60 hover:bg-[#EAF5F8] hover:text-[#488D9F]"
                )}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        title="Logout"
        className="w-12 flex items-center justify-center p-3 rounded-xl text-gray-300 hover:bg-[#EAF5F8] hover:text-[#488D9F] transition-all"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </aside>
  );
}
