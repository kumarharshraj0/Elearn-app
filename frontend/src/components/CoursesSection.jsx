import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All Courses",
  "Programming",
  "Data Analytics",
  "UI/UX Design",
  "Graphics Design",
  "Marketing",
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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CoursesSection() {
  const { courses, loading, error, getCourses } = useCourses();
  const [selectedCategory, setSelectedCategory] = useState("All Courses");

  useEffect(() => {
    getCourses();
  }, []);

  const filteredCourses =
    selectedCategory === "All Courses"
      ? courses
      : courses.filter(
          (course) => course.category === selectedCategory
        );

  const featuredCourses = filteredCourses.slice(0, 6);

  if (loading) {
    return <div className="text-center py-20 text-[#6366F1] font-semibold">Loading premium content...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[#6366F1] font-semibold uppercase tracking-[0.4em] text-xs mb-4"
          >
            Discover Excellence
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-[#0F172A] tracking-tight mb-6"
          >
            Featured <span className="text-[#6366F1]">Courses.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium opacity-80 leading-relaxed"
          >
             Unleash your potential with our most popular and highly-rated programs curated for your success.
          </motion.p>
        </div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#6366F1] text-white shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)]"
                  : "bg-white text-slate-500 shadow-sm hover:shadow-md hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {featuredCourses.map((course) => (
              <motion.div
                key={course._id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-[40px] shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[#6366F1] text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                    {course.category}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-[#0F172A] group-hover:text-[#6366F1] transition-colors leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-slate-400 text-sm font-semibold mb-6">
                    By {course.instructor?.name || "Professional Instructor"}
                  </p>

                  <div className="flex flex-wrap gap-3 text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-8">
                    <span className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
                      <span className="text-indigo-500">⏱</span> {course.duration || "2+ Hours"}
                    </span>
                    <span className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
                      <span className="text-indigo-500">📚</span> {course.totalLessons || 0} Lessons
                    </span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Tuition</span>
                      <span className="text-2xl font-semibold text-[#0F172A]">
                        ${course.price}
                      </span>
                    </div>

                    {course.slug && (
                      <Link
                        to={`/courses/${course.slug}`}
                        className="bg-[#0F172A] text-white p-4 rounded-2xl hover:bg-[#6366F1] transition-all duration-300 shadow-xl shadow-slate-200 group-hover:shadow-indigo-200"
                      >
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
