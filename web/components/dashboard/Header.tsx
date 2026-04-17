import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <div className="flex flex-col gap-1">
      {/* Greeting row */}
      <div className="flex items-center justify-between">

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#488D9F] hover:border-[#488D9F] transition-colors shadow-sm">
            <Search className="w-4 h-4" />
          </button>
          <button className="relative w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#488D9F] hover:border-[#488D9F] transition-colors shadow-sm">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#488D9F] rounded-full text-[9px] text-white font-bold flex items-center justify-center">
              3
            </span>
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#488D9F] to-[#3E7C8C] flex items-center justify-center text-white text-sm font-bold shadow-sm">
            G
          </div>
        </div>
      </div>
    </div>
  );
}
