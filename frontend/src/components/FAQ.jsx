// src/components/FAQ.jsx
import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What makes StackPath different from other platforms?",
    answer: "StackPath focuses on job-ready skills with industry-led curriculums. Unlike other platforms, we provide direct mentorship and lifetime access to our community of professionals."
  },
  {
    question: "Are the certificates industry-recognized?",
    answer: "Yes! Our certificates are co-signed by industry experts and are recognized by top tech companies globally as a mark of verified skills."
  },
  {
    question: "How long do I have access to the course content?",
    answer: "Lifetime access. Once you enroll or subscribe to a Pro plan, you can learn at your own pace and revisit complex topics whenever you need."
  },
  {
    question: "Can I switch between monthly and annual plans?",
    answer: "Absolutely. You can upgrade or downgrade your membership at any time from your account settings without any hidden penalties."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "We offer a 14-day 'no questions asked' money-back guarantee if you're not satisfied with the learning experience."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="w-16 h-16 rounded-3xl bg-indigo-50 text-[#6366F1] flex items-center justify-center mx-auto mb-6"
          >
            <HelpCircle size={32} />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-[#6366F1] font-semibold uppercase tracking-[0.4em] text-xs mb-4"
          >
            Frequently Asked
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-semibold text-[#0F172A] tracking-tight mb-6"
          >
            Common <span className="text-[#6366F1]">Questions.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium opacity-80 leading-relaxed"
          >
            Everything you need to know about our platform and how we help you 
            achieve your goals.
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-[32px] transition-all duration-500 border ${
                  isOpen 
                    ? "bg-slate-50 border-indigo-100 shadow-sm" 
                    : "bg-white border-transparent hover:border-slate-100"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-6 px-8 py-7 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`text-lg md:text-xl font-semibold transition-colors ${isOpen ? "text-[#6366F1]" : "text-[#0F172A]"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                    isOpen ? "bg-[#6366F1] text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  }`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-8 pt-2 text-slate-600 text-lg leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
