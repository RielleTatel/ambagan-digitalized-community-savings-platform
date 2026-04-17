"use client";

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

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Members" },
  { icon: Wallet, label: "Savings" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col items-center justify-between w-20 min-h-screen py-6 bg-[#FFFFFF] rounded-2xl shadow-lg shrink-0",
        className
      )}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-md">
          <Coins className="w-5 h-5 text-white" />
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col items-center gap-7 w-full px-2 mt-4">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              title={label}
              className={cn(
                "w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 group",
                active
                  ? "bg-[#488D9F] text-white shadow-sm"
                  : "text-black/70 hover:bg-white/10 hover:text-[#488D9F]/80"
              )}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        title="Logout"
        className="w-12 flex items-center justify-center p-3 rounded-xl text-white/30 hover:bg-white/10 hover:text-white/70 transition-all"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </aside>
  );
}
