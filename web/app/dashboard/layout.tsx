import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#E4F1F4] p-3 gap-3">
      {/* Sidebar is rendered once here — never re-mounts on page changes */}
      <Sidebar />

      {/* Page content fills the remaining space */}
      <div className="flex flex-1 min-w-0 gap-3">
        {children}
      </div>
    </div>
  );
}
