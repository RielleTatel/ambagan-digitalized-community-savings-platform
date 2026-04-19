"use client";

import { useState } from "react";
import { Plus, UserPlus, Users, TrendingUp, Wallet } from "lucide-react";
import { GroupsHeader } from "@/components/groups/GroupsHeader";
import { GroupCard, GroupCardSkeleton, type Group } from "@/components/groups/GroupCard";
import { JoinGroupModal } from "@/components/groups/JoinGroupModal";
import { CreateGroupModal } from "@/components/groups/CreateGroupModal";
import { cn } from "@/lib/utils";

// --- Mock data — swap for TanStack Query + API call ---
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Gorilla Community Savings Fund",
    contribution: 1000,
    members: 12,
    status: "active",
    totalPool: 120000,
    yourContribution: 8000,
  },
  {
    id: "2",
    name: "Bayanihan Circle",
    contribution: 500,
    members: 8,
    status: "pending_loans",
    totalPool: 40000,
    yourContribution: 4000,
  },
  {
    id: "3",
    name: "Kapit-Bahay Mutual Aid Fund",
    contribution: 2000,
    members: 15,
    status: "active",
    totalPool: 240000,
    yourContribution: 16000,
  },
  {
    id: "4",
    name: "Paluwagan Express",
    contribution: 750,
    members: 6,
    status: "inactive",
    totalPool: 18000,
    yourContribution: 6000,
  },
  {
    id: "5",
    name: "OFW Savings Alliance",
    contribution: 3000,
    members: 20,
    status: "active",
    totalPool: 480000,
    yourContribution: 24000,
  },
];

// Set to true to preview the loading skeleton state
const IS_LOADING = false;

export default function GroupsPage() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const groups = mockGroups;
  const isEmpty = !IS_LOADING && groups.length === 0;

  return (
    <>
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex flex-col gap-6 pb-12">

          {/* ── Header + Actions ── */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <GroupsHeader />

            <div className="flex items-center gap-3 shrink-0">
              {/* Secondary — white + teal border */}
              <button
                onClick={() => setJoinOpen(true)}
                className={cn(
                  "flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold",
                  "bg-white text-[#488D9F] border border-[#D6ECF0]",
                  "shadow-[0_1px_3px_rgba(72,141,159,0.08)]",
                  "hover:border-[#488D9F]/50 hover:bg-[#EAF5F8] hover:-translate-y-0.5",
                  "active:scale-[0.98] transition-all duration-200 ease-out"
                )}
              >
                <UserPlus className="w-4 h-4" />
                Join Group
              </button>

              {/* Primary — teal gradient */}
              <button
                onClick={() => setCreateOpen(true)}
                className={cn(
                  "flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold",
                  "bg-gradient-to-r from-[#488D9F] to-[#3E7C8C] text-white",
                  "shadow-[0_4px_14px_rgba(72,141,159,0.3)]",
                  "hover:shadow-[0_8px_24px_rgba(72,141,159,0.4)] hover:brightness-105 hover:-translate-y-0.5",
                  "active:scale-[0.98] transition-all duration-200 ease-out"
                )}
              >
                <Plus className="w-4 h-4" />
                Create Group
              </button>
            </div>
          </div>

          {/* ── Summary strip ── */}
          {!IS_LOADING && !isEmpty && (
            <div className="flex flex-wrap items-center gap-3">

              {/* Total Groups */}
              <div className={cn(
                "rounded-xl bg-white border border-[#D6ECF0] px-4 py-3 flex items-center gap-3",
                "shadow-[0_1px_3px_rgba(72,141,159,0.08)]"
              )}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-[0_4px_10px_rgba(72,141,159,0.25)]">
                  <Users className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#488D9F]/70">
                    Total Groups
                  </p>
                  <p className="text-base font-bold text-[#12303A]">{groups.length}</p>
                </div>
              </div>

              {/* Active */}
              <div className={cn(
                "rounded-xl bg-white border border-[#D6ECF0] px-4 py-3 flex items-center gap-3",
                "shadow-[0_1px_3px_rgba(72,141,159,0.08)]"
              )}>
                <div className="w-8 h-8 rounded-lg bg-[#EAF5F8] border border-[#D6ECF0] flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#488D9F]/70">
                    Active
                  </p>
                  <p className="text-base font-bold text-[#12303A]">
                    {groups.filter((g) => g.status === "active").length}
                  </p>
                </div>
              </div>

              {/* Total Contributed */}
              <div className={cn(
                "rounded-xl bg-white border border-[#D6ECF0] px-4 py-3 flex items-center gap-3",
                "shadow-[0_1px_3px_rgba(72,141,159,0.08)]"
              )}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3E7C8C] to-[#5FA3B3] flex items-center justify-center shadow-[0_4px_10px_rgba(72,141,159,0.25)]">
                  <Wallet className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#488D9F]/70">
                    Total Contributed
                  </p>
                  <p className="text-base font-bold text-[#12303A]">
                    ₱{groups
                      .reduce((sum, g) => sum + (g.yourContribution ?? 0), 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Trend indicator */}
              <div className={cn(
                "rounded-xl px-4 py-3 flex items-center gap-2",
                "bg-[#EAF5F8] border border-[#D6ECF0]"
              )}>
                <TrendingUp className="w-4 h-4 text-[#488D9F]" />
                <span className="text-xs font-semibold text-[#488D9F]">+12% this month</span>
              </div>

            </div>
          )}

          {/* ── Groups Grid ── */}
          {IS_LOADING ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <GroupCardSkeleton key={i} />
              ))}
            </div>
          ) : isEmpty ? (
            <EmptyState
              onJoin={() => setJoinOpen(true)}
              onCreate={() => setCreateOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── Modals ── */}
      <JoinGroupModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
      <CreateGroupModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
    </>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({
  onJoin,
  onCreate,
}: {
  onJoin: () => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      {/* Teal gradient icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center shadow-[0_8px_24px_rgba(72,141,159,0.35)]">
        <Users className="w-8 h-8 text-white" />
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-xl text-[#12303A]">No groups yet</h3>
        <p className="text-[0.9rem] text-[#488D9F]/80 max-w-xs leading-relaxed">
          You haven&apos;t joined any savings groups yet. Start by joining an existing one or
          creating your own.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onJoin}
          className={cn(
            "flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold",
            "bg-white text-[#488D9F] border border-[#D6ECF0]",
            "shadow-[0_1px_3px_rgba(72,141,159,0.08)]",
            "hover:border-[#488D9F]/50 hover:bg-[#EAF5F8] hover:-translate-y-0.5",
            "active:scale-[0.98] transition-all duration-200 ease-out"
          )}
        >
          <UserPlus className="w-4 h-4" />
          Join a Group
        </button>
        <button
          onClick={onCreate}
          className={cn(
            "flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold",
            "bg-gradient-to-r from-[#488D9F] to-[#3E7C8C] text-white",
            "shadow-[0_4px_14px_rgba(72,141,159,0.3)]",
            "hover:shadow-[0_8px_24px_rgba(72,141,159,0.4)] hover:brightness-105 hover:-translate-y-0.5",
            "active:scale-[0.98] transition-all duration-200 ease-out"
          )}
        >
          <Plus className="w-4 h-4" />
          Create Group
        </button>
      </div>
    </div>
  );
}
