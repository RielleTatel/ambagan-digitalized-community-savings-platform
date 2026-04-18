import { Header } from "@/components/dashboard/Header";
import { InfoCard } from "@/components/dashboard/InfoCard";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { MembersTable } from "@/components/dashboard/MembersTable";
import { OverviewStats } from "@/components/dashboard/OverviewStats";
import {
  PiggyBank,
  Info,
  UserCheck,
  CreditCard,
  TrendingUp,
} from "lucide-react";

// --- Dummy data ---
const fundInfo = [
  { label: "Fund Created", value: "Jan 2026" },
  { label: "Total Members", value: "12" },
  { label: "Cash Take-out", value: "Dec 2026" },
];

export default function Dashboard() {
  return (
    <>
      {/* ── Left Panel ── */}
      <aside className="flex flex-col gap-5 w-90 shrink-0">
        {/* Individual Savings */} 
        <div className="mt-10">
          <div className="mb-3">
            <p className="text-sm uppercase tracking-[0.2em] text-[#488D9F] font-inter font-semibold">
              Dashboard
            </p>
            <h2 className="mt-1.5 font-bold text-2xl font-inter tracking-tight leading-tight text-[#12303A] lg:text-[2.25rem]">
              Gorilla Community Savings Fund!
            </h2>
            <p className="mt-2 max-w-xs text-[0.9rem] leading-relaxed text-gray-500">
              Here is your savings activity snapshot for today.
            </p>
          </div>

          <SectionCard
            title="Individual Savings"
            icon={PiggyBank}
            iconColor="bg-[#EAF5F8] text-[#488D9F]"
            badge="Active"
            badgeColor="bg-emerald-50 text-emerald-600"
          >
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center justify-between text-[0.9rem]">
                <span className="text-gray-500">Your balance</span>
                <span className="font-extrabold text-[#12303A]">₱8,000</span>
              </div>
              <div className="flex items-center justify-between text-[0.9rem]">
                <span className="text-gray-500">Monthly share</span>
                <span className="font-semibold text-[#488D9F]">₱1,000</span>
              </div>
              {/* Mini progress bar */}
              <div className="mt-1">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress to goal</span>
                  <span>80%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-[#488D9F] to-[#A8D9E4] rounded-full"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>


        {/* Savings Fund Info */}
        <SectionCard
          title="Savings Fund Information"
          icon={Info}
          iconColor="bg-blue-50 text-blue-500"
          bullets={fundInfo}
        />

        {/* Active Members */}
        <SectionCard
          title="Active Members"
          icon={UserCheck}
          iconColor="bg-violet-50 text-violet-500"
          badge="12"
          badgeColor="bg-violet-50 text-violet-500"
          placeholder="Member roster coming soon"
        >
          <div className="flex flex-wrap gap-1.5 mt-1">
            {["GT", "JC", "MS", "CR", "AB", "RL", "PM", "SO"].map(
              (init, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-linear-to-br from-[#5FA3B3] to-[#3E7C8C] flex items-center justify-center text-white text-[9px] font-bold border-2 border-white shadow-sm"
                >
                  {init}
                </div>
              )
            )}
            <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-[9px] font-bold">
              +4
            </div>
          </div>
        </SectionCard>

        {/* Borrowed Account */}
        <SectionCard
          title="Borrowed Account"
          icon={CreditCard}
          iconColor="bg-rose-50 text-rose-500"
          badge="1 Active"
          badgeColor="bg-rose-50 text-rose-500"
        >
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center justify-between text-[0.9rem]">
              <span className="text-gray-500">Amount borrowed</span>
              <span className="font-extrabold text-[#12303A]">₱5,000</span>
            </div>
            <div className="flex items-center justify-between text-[0.9rem]">
              <span className="text-gray-500">Due date</span>
              <span className="font-semibold text-rose-500">May 30, 2026</span>
            </div>
            <div className="mt-1">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Repaid</span>
                <span>40%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-rose-400 to-rose-300 rounded-full"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
          </div>
        </SectionCard>
      </aside>

      {/* ── Main Panel ── */}
      <main className="flex flex-col space-y-4 flex-1 min-w-0">
        {/* Header (desktop) */}
        <div className="hidden lg:flex lg:justify-end">
          <Header />
        </div>

        {/* Top Summary Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Pool Balance */}
          <InfoCard
            title="Total Pool Balance"
            value="₱120,000"
            subtitle="Updated today · Apr 17, 2026"
            badge="Live"
            accent
          />

          {/* Pool Chart placeholder */}
          <div className="sm:col-span-2 rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Pool Chart
                </p>
                <p className="text-base font-bold text-[#12303A] mt-0.5">
                  Monthly Contribution Growth
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#488D9F] font-semibold">
                <TrendingUp className="w-4 h-4" />
                +12% this month
              </div>
            </div>

            {/* Chart placeholder */}
            <div className="flex-1 min-h-[96px] rounded-xl bg-linear-to-br from-[#EAF5F8] to-blue-50 border border-dashed border-[#A8D9E4] flex flex-col items-center justify-center gap-2">
              <TrendingUp className="w-8 h-8 text-[#488D9F]/40" />
              <p className="text-xs text-gray-400">
                Chart will render here · TanStack Query ready
              </p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="pt-1">
          <OverviewStats />
        </div>

        {/* Group Members Table */}
        <div className="pt-1">
          <MembersTable /> 
        </div> 

      </main>
    </>
  );
}
