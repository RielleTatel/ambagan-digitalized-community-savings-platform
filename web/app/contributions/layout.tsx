import { Sidebar } from "@/components/dashboard/Sidebar";

export default function ContributionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#E4F1F4] p-5 gap-3">
      <Sidebar />
      <div className="flex flex-1 min-w-0 gap-3">
        {children}
      </div>
    </div>
  );
}
