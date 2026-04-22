import React from "react";
import { Code, Palette, Megaphone, Briefcase, Camera, Music, Layout, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Programming", icon: <Code />, color: "bg-blue-500", count: "1,200+ Courses" },
  { name: "Design", icon: <Palette />, color: "bg-purple-500", count: "850+ Courses" },
  { name: "Marketing", icon: <Megaphone />, color: "bg-pink-500", count: "450+ Courses" },
  { name: "Business", icon: <Briefcase />, color: "bg-indigo-500", count: "600+ Courses" },
  { name: "Photography", icon: <Camera />, color: "bg-cyan-500", count: "300+ Courses" },
  { name: "Music", icon: <Music />, color: "bg-orange-500", count: "200+ Courses" },
  { name: "UI/UX", icon: <Layout />, color: "bg-emerald-500", count: "400+ Courses" },
  { name: "Development", icon: <Terminal />, color: "bg-slate-700", count: "900+ Courses" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-[#6366F1] font-semibold uppercase tracking-[0.4em] text-xs mb-4"
          >
            Curated Paths
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-semibold text-[#0F172A] tracking-tight mb-6"
          >
            Explore Top <span className="text-[#6366F1]">Categories.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium opacity-80 leading-relaxed"
          >
            Discover thousands of world-class courses designed to help you master 
            new skills from industry leaders.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((cat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Link 
                to="/courses"
                className="group relative h-full flex flex-col bg-slate-50 p-8 rounded-[32px] overflow-hidden hover:bg-[#6366F1] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-indigo-500/10"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl ${cat.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:bg-white group-hover:text-[#6366F1] transition-all duration-500`}>
                  {React.cloneElement(cat.icon, { size: 28 })}
                </div>
                
                <h3 className="text-xl font-semibold text-[#0F172A] group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-500 text-sm font-semibold group-hover:text-white/80 transition-colors mt-1">
                  {cat.count}
                </p>
                
                {/* Background Decor */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black/5 rounded-full group-hover:bg-white/10 transition-all duration-500 blur-2xl"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
