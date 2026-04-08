"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareQuote } from "lucide-react";

const painPoints = [
  {
    quote: "Ang hirap mag-ipon mag-isa… lagi may emergency.",
    tagline: "Solo saving is tough",
    emoji: "😮‍💨",
  },
  {
    quote: "I want to borrow money, but I don't trust loan apps.",
    tagline: "Loan apps feel sketchy",
    emoji: "😟",
  },
  {
    quote: "We already do ambagan manually… ang gulo lang i-track.",
    tagline: "Manual tracking is a mess",
    emoji: "🤯",
  },
  {
    quote: "I wish there was a way to save with friends but still feel secure.",
    tagline: "Community but no security",
    emoji: "🙏",
  },
  {
    quote: "Banks feel too complicated for small savings.",
    tagline: "Banks aren't built for us",
    emoji: "🏦",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function PainPointsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">
            We get it
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Sound familiar?
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            These are the real struggles people face with saving and borrowing
            in the community.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {painPoints.map((point, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white group">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{point.emoji}</span>
                    <MessageSquareQuote className="w-5 h-5 text-gray-200 group-hover:text-emerald-300 transition-colors" />
                  </div>
                  <blockquote className="text-gray-700 text-[15px] leading-relaxed font-medium italic">
                    &ldquo;{point.quote}&rdquo;
                  </blockquote>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-auto">
                    {point.tagline}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Closing card */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <Card className="h-full border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200">
              <CardContent className="p-6 flex flex-col justify-center gap-3 h-full">
                <p className="text-2xl font-extrabold leading-tight">
                  That&apos;s why we built Ambagan.
                </p>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  A smarter, safer, community-powered way to save, borrow, and
                  grow money together.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
