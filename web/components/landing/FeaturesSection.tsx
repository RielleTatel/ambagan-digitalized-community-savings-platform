"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CalendarCheck,
  ThumbsUp,
  TrendingUp,
  LayoutList,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Join or Create a Savings Group",
    description:
      "Start your own circle or enter a code to join an existing barkada, family, or colleague group. No strangers, only people you trust.",
    color: "bg-[#E4F1F4] text-[#488D9F]",
    badge: "Groups",
  },
  {
    icon: CalendarCheck,
    title: "Fixed Monthly Contributions",
    description:
      "Everyone commits to a set monthly amount. No more chasing — contributions are tracked automatically so nothing slips through.",
    color: "bg-[#E4F1F4] text-[#488D9F]",
    badge: "Auto-tracking",
  },
  {
    icon: ThumbsUp,
    title: "Community-Voted Loans",
    description:
      "Any member can request a loan, and the group votes together. Transparent, fair, and built on trust — not a credit score.",
    color: "bg-[#EAF4F6] text-[#4F93A3]",
    badge: "Democratic",
  },
  {
    icon: TrendingUp,
    title: "Earn from Shared Interest",
    description:
      "When members repay loans, the interest goes back to the group — not to a company. Your money works for everyone in the circle.",
    color: "bg-amber-50 text-amber-600",
    badge: "Shared earnings",
  },
  {
    icon: LayoutList,
    title: "Digital Ledger for Everything",
    description:
      "No more notebooks, spreadsheets, or messy group chats. Every peso in and out is logged, visible, and verifiable by all members.",
    color: "bg-rose-50 text-rose-600",
    badge: "Transparent",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your group's data is encrypted and only accessible to members. No third-party selling your info, no hidden fees, ever.",
    color: "bg-[#E4F1F4] text-[#488D9F]",
    badge: "Secure",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#488D9F] uppercase tracking-widest mb-3">
            What&apos;s inside
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Everything You Need to Save Together
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Simple tools for a powerful shared finance experience — no banking
            jargon, no complicated setup.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${feature.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-semibold text-gray-400 border-gray-200"
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
