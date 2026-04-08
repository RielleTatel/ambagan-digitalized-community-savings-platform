"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, CheckCircle, ArrowRight } from "lucide-react";

function PhoneMockup() {
  const members = [
    { name: "Ana R.", initial: "A", color: "from-emerald-400 to-teal-500" },
    { name: "Jose M.", initial: "J", color: "from-blue-400 to-indigo-500" },
    { name: "Maria L.", initial: "M", color: "from-violet-400 to-purple-500" },
    { name: "Carlo D.", initial: "C", color: "from-amber-400 to-orange-500" },
  ];

  return (
    <div className="relative mx-auto w-60 sm:w-64">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-300/30 to-blue-300/30 rounded-[3.5rem] blur-2xl" />
      {/* Phone frame */}
      <div className="relative w-full aspect-[9/19] bg-gray-900 rounded-[2.5rem] border-4 border-gray-700 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="absolute inset-0 bg-white flex flex-col">
          {/* Status bar */}
          <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-end justify-between px-4 pb-1">
            <span className="text-[9px] font-semibold text-gray-400">9:41</span>
            <div className="flex gap-1 items-center">
              <div className="w-3 h-2 border border-gray-400 rounded-sm relative">
                <div className="absolute inset-0.5 right-0.5 bg-gray-400 rounded-sm" />
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-white">
            <p className="text-[10px] font-medium opacity-80">Barkada Savings</p>
            <p className="text-xl font-bold leading-tight">₱45,200.00</p>
            <p className="text-[10px] opacity-70 mt-0.5">Group Balance · 8 Members</p>
          </div>

          {/* Your share */}
          <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-gray-500 uppercase tracking-wide">Your Share</p>
              <p className="text-sm font-bold text-gray-900">₱5,650</p>
            </div>
            <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 rounded-full">
              <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
              <span className="text-[9px] font-semibold text-emerald-700">+8.2%</span>
            </div>
          </div>

          {/* Members */}
          <div className="px-4 pt-2.5 flex-1">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Members
            </p>
            <div className="space-y-1.5">
              {members.map((m) => (
                <div key={m.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-[9px] font-bold`}
                    >
                      {m.initial}
                    </div>
                    <span className="text-[10px] text-gray-700">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-emerald-600">
                    <CheckCircle className="w-2.5 h-2.5" />
                    <span className="text-[9px] font-medium">Paid</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Loan request */}
            <div className="mt-3 bg-blue-50 rounded-xl p-2.5 border border-blue-100">
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="w-2.5 h-2.5 text-blue-500" />
                <p className="text-[9px] font-semibold text-blue-700">Loan Vote Active</p>
              </div>
              <p className="text-[9px] text-gray-600">
                Maria requested{" "}
                <span className="font-semibold text-blue-700">₱5,000</span>
              </p>
              <div className="flex gap-1.5 mt-1.5">
                <div className="flex-1 h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-emerald-500 rounded-full" />
                </div>
                <span className="text-[8px] text-gray-500">6/8</span>
              </div>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="h-10 border-t border-gray-100 flex items-center justify-around px-4">
            {["Home", "Group", "History", "Profile"].map((tab) => (
              <div
                key={tab}
                className={`text-[8px] font-medium ${tab === "Group" ? "text-emerald-600" : "text-gray-400"}`}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <AuroraBackground className="h-auto min-h-screen pt-16" showRadialGradient>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <Badge className="mb-5 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold hover:bg-emerald-50">
              🇵🇭 Built for Filipino Communities
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Save Together.{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Grow Together.
              </span>{" "}
              Access Funds When You Need Them.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed mx-auto lg:mx-0">
              A digital community savings platform where you and your trusted
              circle contribute monthly, access fair loans, and grow your money
              through shared interest.
            </p>

            {/* Email CTA */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
            >
              {submitted ? (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-5 py-3 text-emerald-700 font-medium text-sm w-full justify-center">
                  <CheckCircle className="w-4 h-4" />
                  You&apos;re on the list! We&apos;ll be in touch soon.
                </div>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm px-5 h-12 text-sm shadow-sm"
                  />
                  <Button
                    type="submit"
                    className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white h-12 px-6 font-semibold text-sm shadow-md whitespace-nowrap"
                  >
                    Get Early Access
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </>
              )}
            </form>

            {/* Social proof snippet */}
            <div className="mt-6 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["A", "J", "M", "C", "R"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">500+</span> people
                already joined the waitlist
              </p>
            </div>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="flex-shrink-0 w-full max-w-xs lg:max-w-sm"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
}
