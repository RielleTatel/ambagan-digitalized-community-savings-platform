"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const appPreviews = [
  {
    icon: Wallet,
    label: "Group Balance",
    value: "₱45,200",
    sub: "8 active members",
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-white/20",
  },
  {
    icon: TrendingUp,
    label: "Interest Earned",
    value: "₱3,840",
    sub: "This cycle",
    color: "from-blue-500 to-indigo-600",
    iconBg: "bg-white/20",
  },
  {
    icon: Users,
    label: "Loan Votes",
    value: "6 / 8",
    sub: "Approved this month",
    color: "from-violet-500 to-purple-600",
    iconBg: "bg-white/20",
  },
];

export function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* Left — App preview cards */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 grid grid-cols-1 gap-4 w-full max-w-sm"
          >
            {appPreviews.map((preview, i) => {
              const Icon = preview.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                  className={`bg-gradient-to-r ${preview.color} rounded-2xl p-5 flex items-center gap-4 shadow-lg`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${preview.iconBg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-medium">
                      {preview.label}
                    </p>
                    <p className="text-white text-2xl font-extrabold leading-tight">
                      {preview.value}
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">{preview.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right — CTA copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Get Instant Access to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Smarter Community Savings
              </span>
            </h2>

            <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0">
              Be part of the future of community finance. Built for trust,
              powered by people.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
            >
              {submitted ? (
                <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-5 py-3.5 text-emerald-400 font-medium text-sm w-full justify-center">
                  <CheckCircle className="w-4 h-4" />
                  You&apos;re on the list! We&apos;ll reach out soon.
                </div>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 rounded-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 px-5 h-12 text-sm backdrop-blur-sm focus:border-emerald-400 focus:ring-emerald-400/30"
                  />
                  <Button
                    type="submit"
                    className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white h-12 px-6 font-semibold text-sm shadow-lg shadow-emerald-900/50 whitespace-nowrap"
                  >
                    Join the Waitlist
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </>
              )}
            </form>

            {/* Reassurance */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500 justify-center lg:justify-start">
              {[
                "No credit card required",
                "No spam, ever",
                "Be first when we launch",
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 mt-20 pt-8 border-t border-white/10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Ambagan</span>
          </div>
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Ambagan. Built with love for the
            Filipino community.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
