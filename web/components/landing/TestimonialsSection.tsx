"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShieldCheck, Zap, Users } from "lucide-react";

const testimonials = [
  {
    rating: 5,
    quote:
      "Super helpful for our small business group. Transparent and fair. We can finally see who paid and who hasn't without the awkward conversations.",
    name: "Donna A.",
    role: "Sari-sari store owner, Batangas",
    avatar: "D",
    color: "from-[#5FA3B3] to-[#488D9F]",
  },
  {
    rating: 5,
    quote:
      "Mas organized na yung ambagan namin. Walang stress, walang away. I just check the app and everything is there.",
    name: "Paolo R.",
    role: "BPO Team Lead, BGC",
    avatar: "P",
    color: "from-[#7FB9C6] to-[#5FA3B3]",
  },
  {
    rating: 5,
    quote:
      "I like that everyone has a say before loans are approved. It feels like a real community, not a business transaction.",
    name: "Grace T.",
    role: "OFW, Abroad",
    avatar: "G",
    color: "from-[#8AC1CC] to-[#6DAAB8]",
  },
];

const trustBadges = [
  {
    icon: ShieldCheck,
    label: "Secure & Transparent",
    desc: "Every transaction is logged and visible to all group members.",
  },
  {
    icon: Users,
    label: "Community Trust Model",
    desc: "Decisions are made by the group, not by an algorithm.",
  },
  {
    icon: Zap,
    label: "No Hidden Fees",
    desc: "What you contribute is what you grow. Simple as that.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gray-50">
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
            Early users
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            What Early Users Are Saying
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Real feedback from people who tested Ambagan with their own circles.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="h-full border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="p-6 flex flex-col gap-4">
                  <StarRating count={t.rating} />
                  <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
        >
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E4F1F4] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#488D9F]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {badge.label}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
