import { cn } from "@/lib/utils";

type MemberStatus = "Active" | "Late" | "Pending";

interface Member {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  contribution: string;
  lastPaid: string;
  status: MemberStatus;
}

const dummyMembers: Member[] = [
  {
    id: 1,
    name: "Gabrielle Tatel",
    initials: "GT",
    avatarColor: "from-[#488D9F] to-[#3E7C8C]",
    contribution: "₱1,000 / mo",
    lastPaid: "Apr 10, 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Juan dela Cruz",
    initials: "JC",
    avatarColor: "from-[#7FB9C6] to-[#5FA3B3]",
    contribution: "₱1,000 / mo",
    lastPaid: "Apr 9, 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Maria Santos",
    initials: "MS",
    avatarColor: "from-amber-400 to-orange-400",
    contribution: "₱1,000 / mo",
    lastPaid: "Mar 30, 2026",
    status: "Late",
  },
  {
    id: 4,
    name: "Carlo Reyes",
    initials: "CR",
    avatarColor: "from-violet-400 to-purple-500",
    contribution: "₱1,000 / mo",
    lastPaid: "—",
    status: "Pending",
  },
  {
    id: 5,
    name: "Ana Bautista",
    initials: "AB",
    avatarColor: "from-emerald-400 to-teal-500",
    contribution: "₱1,000 / mo",
    lastPaid: "Apr 11, 2026",
    status: "Active",
  },
];

const statusStyle: Record<MemberStatus, string> = {
  Active: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Late: "bg-amber-50 text-amber-600 border border-amber-100",
  Pending: "bg-[#EAF5F8] text-[#488D9F]/70 border border-[#D6ECF0]",
};

interface MembersTableProps {
  members?: Member[];
  className?: string;
}

export function MembersTable({
  members = dummyMembers,
  className,
}: MembersTableProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-[#D6ECF0] shadow-sm p-5 flex flex-col gap-4",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#12303A]">Group Members</h3>
          <p className="text-sm text-[#488D9F]/60 mt-0.5">
            {members.length} active members this cycle
          </p>
        </div>
        <button className="text-xs font-semibold text-[#488D9F] hover:text-[#3E7C8C] hover:underline transition-colors">
          View all →
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="text-left">
              <th className="px-2 pb-3 text-[10px] font-semibold text-[#488D9F]/60 uppercase tracking-wider">
                Member
              </th>
              <th className="px-2 pb-3 text-[10px] font-semibold text-[#488D9F]/60 uppercase tracking-wider">
                Contribution
              </th>
              <th className="px-2 pb-3 text-[10px] font-semibold text-[#488D9F]/60 uppercase tracking-wider">
                Last Paid
              </th>
              <th className="px-2 pb-3 text-[10px] font-semibold text-[#488D9F]/60 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAF5F8]">
            {members.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-[#EAF5F8]/50 transition-colors"
              >
                {/* Name + Avatar */}
                <td className="px-2 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full bg-linear-to-br flex items-center justify-center text-white text-[10px] font-bold shrink-0",
                        member.avatarColor
                      )}
                    >
                      {member.initials}
                    </div>
                    <span className="font-medium text-[#12303A]">
                      {member.name}
                    </span>
                  </div>
                </td>

                <td className="px-2 py-3 text-[#488D9F]/70">{member.contribution}</td>
                <td className="px-2 py-3 text-[#488D9F]/70">{member.lastPaid}</td>

                {/* Status badge */}
                <td className="px-2 py-3">
                  <span
                    className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full",
                      statusStyle[member.status]
                    )}
                  >
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
