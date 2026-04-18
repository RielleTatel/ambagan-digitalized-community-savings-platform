"use client";

import { useState } from "react";
import { Plus, UserPlus, Users } from "lucide-react";
import { GroupsHeader } from "@/components/groups/GroupsHeader";
import { GroupCard, GroupCardSkeleton, type Group } from "@/components/groups/GroupCard";
import { JoinGroupModal } from "@/components/groups/JoinGroupModal";
import { CreateGroupModal } from "@/components/groups/CreateGroupModal";

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
      {/* Page content */}
      <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-8 p-6 pb-12 max-w-7xl w-full mx-auto">

          {/* ── Header + Actions ── */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <GroupsHeader />

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setJoinOpen(true)}
                className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold border border-[#488D9F] text-[#488D9F] bg-white hover:bg-[#EAF5F8] transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                Join Group
              </button>
              <button
                onClick={() => setCreateOpen(true)}
                className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold bg-[#488D9F] text-white hover:bg-[#3E7C8C] transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Create Group
              </button>
            </div>
          </div>

          {/* ── Summary strip ── */}
          {!IS_LOADING && !isEmpty && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-xl bg-white border border-[#D6ECF0] shadow-sm px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF5F8] flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#488D9F]" />
                </div>
                <div>
                  <p className="text-xs text-[#488D9F]/70 uppercase tracking-widest font-semibold">Total Groups</p>
                  <p className="text-base font-extrabold text-[#12303A]">{groups.length}</p>
                </div>
              </div>
              <div className="rounded-xl bg-white border border-[#D6ECF0] shadow-sm px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                </div>
                <div>
                  <p className="text-xs text-[#488D9F]/70 uppercase tracking-widest font-semibold">Active</p>
                  <p className="text-base font-extrabold text-[#12303A]">
                    {groups.filter((g) => g.status === "active").length}
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-white border border-[#D6ECF0] shadow-sm px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF5F8] flex items-center justify-center">
                  <span className="text-sm font-bold text-[#488D9F]">₱</span>
                </div>
                <div>
                  <p className="text-xs text-[#488D9F]/70 uppercase tracking-widest font-semibold">Total Contributed</p>
                  <p className="text-base font-extrabold text-[#12303A]">
                    ₱{groups
                      .reduce((sum, g) => sum + (g.yourContribution ?? 0), 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Groups Grid ── */}
          {IS_LOADING ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

function EmptyState({
  onJoin,
  onCreate,
}: {
  onJoin: () => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#EAF5F8] flex items-center justify-center">
        <Users className="w-8 h-8 text-[#488D9F]/60" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-[#12303A]">No groups yet</h3>
        <p className="text-[0.9rem] text-gray-400 max-w-xs">
          You haven&apos;t joined any savings groups yet. Start by joining an existing one or creating your own.
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          onClick={onJoin}
          className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold border border-[#488D9F] text-[#488D9F] bg-white hover:bg-[#EAF5F8] transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Join a Group
        </button>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold bg-[#488D9F] text-white hover:bg-[#3E7C8C] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Group
        </button>
      </div>
    </div>
  );
}
