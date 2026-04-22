import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import { useCourses } from "../context/CourseContext";

/* ===========================
   SKELETON COMPONENT
=========================== */
const CourseSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden h-[450px] flex flex-col animate-pulse">
      <div className="w-full h-52 bg-gray-200" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="mt-auto h-10 w-36 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

export default function CoursePage() {
  const { courses, loading, error, getCourses } = useCourses();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    getCourses();
  }, []);

  const categories = [
    "All",
    "Programming",
    "Design",
    "Marketing",
    "Business",
    "Photography",
    "Music",
    "Other",
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="bg-[#0F172A] text-white h-[70vh] flex flex-col justify-center items-center text-center px-6 py-[45vh]">
        <h1 className="text-5xl font-semibold mb-6">
          Learn Without Limits
        </h1>
        <p className="text-lg max-w-2xl text-gray-200 leading-relaxed">
          Explore our wide range of courses designed to help you master new
          skills, advance your career, and achieve success.
        </p>
        <div className="mt-8">
          <a
            href="#courses"
            className="px-10 py-4 bg-[#6366F1] text-white font-semibold rounded-full shadow-lg hover:bg-[#4F46E5] transition shadow-indigo-500/30"
          >
            Browse Courses
          </a>
        </div>
      </section>

      {/* FEATURED COURSES */}


      {/* TOP COURSES */}
      <section
        id="courses"
        className="py-24 px-6 md:px-12 lg:px-20 bg-white"
      >
        <h2 className="text-4xl font-semibold text-center text-[#0F172A] mb-10 tracking-tight">
          Top Courses to Get You Started
        </h2>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full font-semibold transition shadow-sm ${activeCategory === cat
                  ? "bg-[#6366F1] text-white shadow-indigo-500/20 shadow-lg"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* COURSES GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <CourseSkeleton key={i} />
            ))
            : (filteredCourses || []).map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-3xl shadow-sm overflow-hidden transition group h-[480px] flex flex-col hover:shadow-2xl border border-slate-100 hover:border-indigo-100"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover group-hover:opacity-80 transition-all duration-500"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-[#6366F1] font-semibold uppercase tracking-widest mb-2">
                    {course.category}
                  </p>
                  <h3 className="font-semibold text-xl text-[#0F172A] mb-4 group-hover:text-[#6366F1] transition">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={course.instructor?.profileImage}
                      alt={course.instructor?.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="text-sm font-medium group-hover:text-white transition">
                        {course.instructor?.name}
                      </p>
                      <p className="text-xs text-gray-500 group-hover:text-gray-300 transition">
                        {course.instructor?.bio}
                      </p>
                    </div>
                  </div>

                  {course.slug && (
                    <Link
                      to={`/courses/${course.slug}`}
                      className="mt-auto inline-block text-center px-8 py-3 bg-[#6366F1] text-white rounded-full font-semibold hover:bg-[#4F46E5] transition shadow-md shadow-indigo-500/20"
                    >
                      View Course →
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}

