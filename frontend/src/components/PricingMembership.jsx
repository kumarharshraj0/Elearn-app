// src/components/PricingMembership.jsx
import React from 'react';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const tiers = [
  {
    name: "Starter",
    price: "0",
    desc: "Perfect for exploring the basics and starting your journey.",
    features: [
      "Access to 5 free courses",
      "Basic community support",
      "Digital participation badge",
      "Mobile app access"
    ],
    cta: "Take for Free",
    featured: false
  },
  {
    name: "Pro Learner",
    price: "19",
    desc: "Our most popular plan for career-driven students.",
    features: [
      "Unlimited access to all courses",
      "1-on-1 mentorship sessions",
      "Certified certificates",
      "Offline learning mode",
      "Early access to new content"
    ],
    cta: "Start Pro Trial",
    featured: true
  },
  {
    name: "Enterprise",
    price: "99",
    desc: "Tailored solutions for teams and organizations.",
    features: [
      "Bulk student accounts",
      "Detailed progress analytics",
      "Whitelabel certificates",
      "Dedicated account manager",
      "Custom learning paths"
    ],
    cta: "Contact Sales",
    featured: false
  }
];

export default function PricingMembership() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#6366F1] font-semibold uppercase tracking-[0.4em] text-xs mb-4"
          >
            Simple Pricing
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold text-[#0F172A] tracking-tight mb-6"
          >
            Investment in your <span className="text-[#6366F1]">Future.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-medium"
          >
            Join 50,000+ students and get the tools you need to master your craft.
            No hidden fees. Cancel anytime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-[40px] border transition-all duration-500 ${
                tier.featured 
                  ? "bg-[#0F172A] border-[#6366F1] shadow-[0_40px_100px_-20px_rgba(99,102,241,0.25)] md:py-14" 
                  : "bg-white border-slate-100 hover:border-indigo-100/50 hover:shadow-2xl shadow-sm"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-xl">
                  <Star size={14} fill="white" /> Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-2 ${tier.featured ? "text-white" : "text-[#0F172A]"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm font-medium ${tier.featured ? "text-slate-400" : "text-slate-500"}`}>
                  {tier.desc}
                </p>
              </div>

              <div className="mb-10 flex items-baseline gap-2">
                <span className={`text-5xl font-semibold ${tier.featured ? "text-white" : "text-[#0F172A]"}`}>
                  ${tier.price}
                </span>
                <span className={`text-base font-semibold ${tier.featured ? "text-slate-500" : "text-slate-400"}`}>
                  / month
                </span>
              </div>

              <div className="space-y-4 mb-12">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${tier.featured ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-50 text-[#6366F1]"}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className={`text-sm font-semibold ${tier.featured ? "text-slate-300" : "text-slate-600"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-2xl text-base font-semibold transition-all active:scale-95 ${
                tier.featured 
                  ? "bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-[0_15px_30px_-10px_rgba(99,102,241,0.5)]" 
                  : "bg-slate-50 text-[#0F172A] hover:bg-indigo-50 hover:text-[#6366F1] border border-transparent hover:border-indigo-100"
              }`}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
