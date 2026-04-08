"use client";

import { motion } from "framer-motion";
import { UserPlus, PiggyBank, Banknote, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Join a Group",
    description:
      "Enter a code to join an existing savings circle, or create your own and invite your barkada, family, or co-workers.",
    color: "bg-[#488D9F]",
    glow: "shadow-[#7FB9C6]/30",
    textColor: "text-[#488D9F]",
    bgLight: "bg-[#E4F1F4]",
  },
  {
    number: "02",
    icon: PiggyBank,
    title: "Save & Participate",
    description:
      "Contribute your fixed monthly amount and take part in loan approvals. Every voice counts — it's a democracy of money.",
    color: "bg-[#5FA3B3]",
    glow: "shadow-[#7FB9C6]/30",
    textColor: "text-[#488D9F]",
    bgLight: "bg-[#E4F1F4]",
  },
  {
    number: "03",
    icon: Banknote,
    title: "Borrow & Grow",
    description:
      "Request funds when you need them, repay with fair interest that goes back to the group — not a faceless corporation.",
    color: "bg-[#6DAAB8]",
    glow: "shadow-[#9DCBD4]/30",
    textColor: "text-[#4F93A3]",
    bgLight: "bg-[#EAF4F6]",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#488D9F] uppercase tracking-widest mb-3">
            Simple process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto">
            Three steps. That&apos;s all it takes to start saving smarter with
            people you trust.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-14 left-1/2 -translate-x-1/2 w-[68%] h-px bg-gradient-to-r from-[#BFDDE3] via-[#9DCBD4] to-[#BFDDE3]" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step icon */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-lg ${step.glow} z-10 relative`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">
                      {i + 1}
                    </span>
                  </div>

                  {/* Arrow between steps (mobile only) */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden flex items-center justify-center my-2 text-gray-300">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>
                  )}

                  <div className={`${step.bgLight} rounded-2xl p-6 w-full`}>
                    <p
                      className={`text-xs font-bold uppercase tracking-widest mb-2 ${step.textColor}`}
                    >
                      Step {step.number}
                    </p>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
