"use client";

import { motion } from "framer-motion";
import { Shield, Users, CheckCircle } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Secure and private" },
  { icon: CheckCircle, label: "No hidden fees" },
  { icon: Users, label: "Built for trusted communities" },
];

const members = [
  { initial: "A", color: "from-[#5FA3B3] to-[#488D9F]" },
  { initial: "J", color: "from-[#7FB9C6] to-[#5FA3B3]" },
  { initial: "M", color: "from-[#8AC1CC] to-[#6DAAB8]" },
  { initial: "C", color: "from-amber-400 to-orange-400" },
  { initial: "R", color: "from-[#488D9F] to-[#3E7C8C]" },
];

export function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between min-h-screen bg-linear-to-br from-[#12303A] via-[#1E4D5C] to-[#3E7C8C] p-12 text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-40 -left-20 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-36 h-36 rounded-full bg-[#488D9F]/20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-20 h-20 rounded-full bg-white/3 pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5">
        <span className="text-2xl font-extrabold tracking-tight">Ambagan</span>
        <span className="text-[10px] bg-white/20 border border-white/20 px-2 py-0.5 rounded-full font-semibold tracking-wide">
          BETA
        </span>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 space-y-7"
      >
        <div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
            Save together.
            <br />
            <span className="text-[#A8D9E4]">Grow together.</span>
          </h2>
          <p className="mt-4 text-white/65 text-base leading-relaxed max-w-sm">
            A community-powered savings platform where you can build funds with
            people you trust, access loans fairly, and grow your money together.
          </p>
        </div>

        {/* Savings group widget */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 space-y-4">
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">
            Active Savings Group
          </p>

          <div className="flex items-center gap-2">
            {members.map((m, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full bg-linear-to-br ${m.color} flex items-center justify-center text-white text-[10px] font-bold border-2 border-white/20 shadow-sm`}
              >
                {m.initial}
              </div>
            ))}
            <span className="text-xs text-white/50 ml-1">+3</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60">Monthly goal</span>
              <span className="font-semibold">₱50,000</span>
            </div>
            <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                className="h-full bg-linear-to-r from-[#A8D9E4] to-[#5FA3B3] rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/45">₱36,000 collected</span>
              <span className="text-[#A8D9E4] font-semibold">72%</span>
            </div>
          </div>

          <div className="pt-1 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Next contribution in 6 days</span>
            <span className="text-[#A8D9E4] font-medium">On track ✓</span>
          </div>
        </div>
      </motion.div>

      {/* Trust elements */}
      <div className="relative z-10 space-y-3">
        {trustItems.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm text-white/70">
            <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
