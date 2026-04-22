import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";

const categories = [
  "All Courses",
  "Programming",
  "Data Analytics",
  "UI/UX Design",
  "Graphics Design",
  "Marketing",
];

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

  // ✅ Pick top 6 courses for the home page grid
  const topCourses = filteredCourses.slice(0, 6);

  if (loading) {
    return <div className="text-center py-20">Loading courses...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 tracking-tight text-[#0F172A]">
          Top courses to get you started
        </h2>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-full font-semibold transition shadow-sm ${
                selectedCategory === cat
                  ? "bg-[#6366F1] text-white shadow-indigo-500/20 shadow-lg"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid (3 Columns) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {topCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-[40px] shadow-sm overflow-hidden transition group flex flex-col hover:shadow-2xl border border-slate-100 hover:border-indigo-100"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-[#6366F1] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-sm">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-semibold text-2xl text-[#0F172A] mb-3 group-hover:text-[#6366F1] transition-colors line-clamp-2 min-h-[64px]">
                  {course.title}
                </h3>

                <p className="text-gray-500 mb-4 font-medium flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">👤</span>
                  {course.instructor?.name}
                </p>

                <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed flex-grow">
                  {course.shortDesc}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-[#0F172A] font-semibold mb-8">
                  <span className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100">⏱ {course.duration || "2 Hours"}</span>
                  <span className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100">📚 {course.totalLessons || 0} Lessons</span>
                </div>

                <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Price</span>
                    <span className="text-2xl font-semibold text-[#0F172A]">
                      ${course.price}
                    </span>
                  </div>

                  {course.slug && (
                    <Link
                      to={`/courses/${course.slug}`}
                      className="inline-block text-center px-8 py-4 bg-[#6366F1] text-white rounded-full font-semibold hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/25"
                    >
                      View Course →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="flex justify-center mt-20">
          <Link
            to="/courses"
            className="px-12 py-5 bg-[#0F172A] text-white text-lg font-semibold rounded-full hover:bg-[#6366F1] transition shadow-2xl flex items-center gap-3 group"
          >
            Explore All Courses
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
