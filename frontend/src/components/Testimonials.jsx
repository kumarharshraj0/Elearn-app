// src/components/Testimonials.jsx
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior UX Designer",
    company: "DesignCo",
    text: "StackPath transformed the way our team learns. the curriculum is practically focused and incredibly deep. Highly recommended!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    company: "TechFlow",
    text: "The Pro Membership is the best investment I've made in my career. The 1-on-1 mentorship sessions were a total game changer for me.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Marketing Director",
    company: "GrowthX",
    text: "I started as a beginner and within 4 months, I was leading our digital marketing strategy. The community support is amazing.",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Data Analyst",
    company: "FinTech",
    text: "Concise, expert-led, and incredibly affordable. StackPath makes high-end education accessible to everyone, everywhere.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5
  }
];

export default function Testimonials() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[#6366F1] font-semibold uppercase tracking-[0.4em] text-xs mb-4"
          >
            Student Insights
          </motion.p>
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6"
          >
            Voices of <span className="text-[#6366F1]">Success.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-medium opacity-80 leading-relaxed mb-16"
          >
            Join thousands of learners who have transformed their lives through 
            StackPath's world-class education.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 md:p-12 rounded-[48px] bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all duration-500 relative"
            >
              <div className="absolute top-10 right-10 text-slate-800 group-hover:text-indigo-500/20 transition-colors">
                <Quote size={80} strokeWidth={1} />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="#6366F1" className="text-[#6366F1]" />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed mb-10 relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-5 mt-auto">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800 group-hover:border-indigo-500 transition-colors">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{t.name}</h4>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">
                    {t.role} <span className="text-indigo-500/50 mx-2">•</span> {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
