// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";





export default function Hero() {
  return (
    <section className="flex min-h-[120vh] flex-col md:flex-row items-center justify-between gap-45 pt-32 px-10 md:px-20 bg-[#0E3128] text-white">
      {/* Left Content */}
      <div 
         
      
      
      className="max-w-xl space-y-6">
        <motion.h1 
        initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        
        className="text-5xl md:text-6xl font-extrabold leading-tight font-figtree">
          Unlock your skills, <br /> elevate your life
        </motion.h1>
        <motion.p 
        initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        
        className="text-lg text-gray-200 font-medium">
          Explore a wide range of professional and personal development
          courses. Gain the skills you need to succeed in your career and
          thrive in life. Start learning today!
        </motion.p>
        <Link to="/courses">
        <button className="px-6 py-4 mt-[4vh] rounded-full bg-[#BCE955] text-black text-lg font-semibold hover:bg-lime-500 transition">
          Explore Courses
        </button>
        </Link>
        

        {/* Learner Stats */}
        <div className="flex items-center gap-4 mt-[10vh]">
          <div className="flex -space-x-3">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-12 h-12 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-12 h-12 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/men/50.jpg" className="w-12 h-12 rounded-full border-2 border-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold">10k+</h4>
            <p className="text-gray-300 text-sm">Satisfied Learners</p>
          </div>
        </div>
      </div>

      {/* Right Image + Categories */}
      <motion.div 
      initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
      className="flex-1 relative   ]">
        <img
          src="https://listwr.com/gqE5ht"
          alt="Student"
          className="w-full max-w-lg  rounded-2xl shadow-lg h-[90vh]"
        />
        <div className="absolute bottom-6  px-8 py-4 flex  flex-wrap gap-3">
          {["UI/UX Design", "Graphics Design", "Data Analyst", "Programming", "Marketing"].map(
            (cat, i) => (
              <span
                key={i}
                className="bg-white text-black px-8 py-4 rounded-full shadow text-sm font-medium"
              >
                {cat}
              </span>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}

