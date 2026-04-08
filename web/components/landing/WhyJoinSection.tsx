"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const reasons = [
  {
    quote:
      "Finally, a way to save with my friends without worrying about tracking.",
    name: "Ate Len",
    role: "Teacher, Quezon City",
    avatar: "L",
    color: "from-emerald-400 to-teal-500",
  },
  {
    quote:
      "Mas kampante ako kasi we vote on loans together. Walang papabor-pabor.",
    name: "Kuya Renz",
    role: "Small business owner, Cebu",
    avatar: "R",
    color: "from-blue-400 to-indigo-500",
  },
  {
    quote:
      "I like that the interest actually goes back to us, not a company.",
    name: "Mia Santos",
    role: "Freelancer, Manila",
    avatar: "M",
    color: "from-violet-400 to-purple-500",
  },
  {
    quote:
      "It feels like a modern version of what we already do as a community.",
    name: "Tito Boy",
    role: "OFW family, Pampanga",
    avatar: "B",
    color: "from-amber-400 to-orange-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function WhyJoinSection() {
  return (
    <section id="community" className="py-20 lg:py-28 bg-white">
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
            Real people, real stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Why People Are Joining Ambagan
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Not marketing fluff — just honest thoughts from people who get it.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {reasons.map((r, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="h-full border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 bg-white">
                <CardContent className="p-7 flex flex-col gap-5">
                  {/* Quote */}
                  <div className="relative">
                    <span className="absolute -top-2 -left-1 text-5xl text-emerald-100 font-serif leading-none select-none">
                      &ldquo;
                    </span>
                    <p className="relative z-10 text-gray-700 text-[15px] leading-relaxed pl-4 pt-3">
                      {r.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-50">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {r.name}
                      </p>
                      <p className="text-xs text-gray-400">{r.role}</p>
                    </div>
                    <Heart className="w-4 h-4 text-rose-300 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
