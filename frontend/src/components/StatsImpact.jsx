import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Students Globally", value: "10K+", suffix: "" },
  { label: "Premium Courses", value: "50+", suffix: "" },
  { label: "Expert Instructors", value: "500+", suffix: "" },
  { label: "Success Stories", value: "100%", suffix: "" },
];

export default function StatsImpact() {
  return (
    <section className="relative py-32 bg-[#0F172A] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-5xl md:text-6xl font-semibold text-[#6366F1] mb-2 tracking-tighter">
                  {stat.value}
                </h3>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Impact Message */}
        <div className="mt-24 text-center border-t border-white/5 pt-16">
          <p className="text-2xl md:text-3xl font-semibold text-white max-w-3xl mx-auto leading-relaxed">
            "We aren’t just a platform; we are a community dedicated to 
            <span className="text-[#6366F1]"> unlocking human potential</span> through high-impact education."
          </p>
        </div>
      </div>
    </section>
  );
}
