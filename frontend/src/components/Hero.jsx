// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FloatingElement = ({ className, delay = 0, duration = 6, size = "w-64 h-64" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.1, 0.2, 0.1],
      y: [-20, 20, -20],
      scale: [1, 1.1, 1],
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut" 
    }}
    className={`absolute rounded-full blur-[100px] pointer-events-none z-0 ${size} ${className}`}
  />
);

export default function Hero() {
  return (
    <section 
      className="relative flex items-center justify-center min-h-[100vh] px-6 py-32 text-white overflow-hidden text-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Soft Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>

      {/* Decorative Background Elements */}
      <FloatingElement className="bg-[#6366F1] top-1/4 -left-32" delay={0} duration={8} />
      <FloatingElement className="bg-emerald-500 bottom-1/4 -right-32" delay={2} duration={10} size="w-96 h-96" />
      <FloatingElement className="bg-purple-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={1} duration={12} size="w-[500px] h-[500px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center mt-12">
        
        {/* Top Badge */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 10 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 shadow-2xl shadow-black/20"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1] relative flex">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-[#6366F1]"></span>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">Join over 50,000+ professionals</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-semibold leading-[1.1] font-figtree tracking-tight"
        >
          Skills made simple, <br className="hidden sm:block" />
          <span className="inline-block text-[#6366F1]">Learning made accessible</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-center text-lg md:text-xl opacity-80 text-white/90"
        >
          Discover knowledge, learn from experts, and achieve goals with engaging,
          live, and interactive learning experiences.
        </motion.p>
        
        {/* Search Bar & Primary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl mt-14"
        >
          <div className="bg-white/10 backdrop-blur-2xl p-2.5 rounded-[40px] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 flex items-center px-6 py-4 gap-4 w-full">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl border border-white/10 group-hover:bg-indigo-500 transition-colors">
                🔍
              </div>
              <input 
                type="text" 
                placeholder="What skill do you want to master?" 
                className="bg-transparent border-none outline-none text-white text-xl w-full placeholder:text-white/40 font-semibold"
              />
            </div>
            
            <div className="h-10 w-[1px] bg-white/20 hidden md:block"></div>
            
            <Link to="/courses" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-12 py-4 rounded-full bg-[#6366F1] text-white text-lg font-semibold hover:bg-[#4F46E5] transition-all duration-300 shadow-2xl shadow-indigo-500/40 hover:-translate-y-1 active:scale-95">
                Explore Courses
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Tags / Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 pt-16 max-w-4xl"
        >
          {["AI & ML", "Data Science", "Web Development", "UI/UX Design", "Cybersecurity", "Blockchain"].map(
            (cat, i) => (
              <span
                key={i}
                className="bg-white/5 backdrop-blur-md text-white/50 px-6 py-2.5 rounded-2xl shadow-lg border border-white/10 hover:border-[#6366F1] hover:text-white hover:bg-white/10 transition-all duration-500 cursor-pointer text-[10px] font-semibold uppercase tracking-[0.2em]"
              >
                {cat}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
