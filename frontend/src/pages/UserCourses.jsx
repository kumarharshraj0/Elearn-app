import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserCourses() {
  const { user, getEnrolledCourses, loading: authLoading, token } = useAuth(); // ✅ renamed loading -> authLoading
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!token) return; // ✅ don't call API until token exists
      setLoadingCourses(true);
      const result = await getEnrolledCourses();
      if (result.success) setCourses(result.courses);
      else setError(result.message);
      setLoadingCourses(false);
    };

    if (!authLoading && token) {
      fetchCourses();
    }
  }, [token]); // ✅ re-run when token or authLoading changes

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

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-[#0F172A] text-white h-[40vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-300 text-lg">
          Here’s your learning journey and enrolled courses.
        </p>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-20" id="courses">
        <h2 className="text-4xl font-semibold text-center text-[#0F172A] mb-12 tracking-tight">
          Your Enrolled Courses
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-full font-semibold transition shadow-sm ${activeCategory === cat
                  ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-center text-red-500 mb-6 font-medium">{error}</p>
        )}

        {filteredCourses.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-600 mb-8 font-medium">
              You haven’t enrolled in any {activeCategory} courses yet.
            </p>
            <Link
              to="/courses"
              className="px-8 py-3 bg-[#6366F1] rounded-full text-white font-semibold hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-3xl shadow-sm overflow-hidden transition group h-[480px] flex flex-col hover:shadow-xl border border-slate-100"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover group-hover:opacity-80 transition-all duration-500"
                />

                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-sm text-[#6366F1] font-semibold uppercase tracking-widest mb-2">
                    {course.category}
                  </p>
                  <h3 className="font-semibold text-xl text-[#0F172A] mb-4">
                    {course.title}
                  </h3>

                  {/* Instructor Info */}
                  {course.instructor && (
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={course.instructor.profileImage}
                        alt={course.instructor.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800 group-hover:text-white transition">
                          {course.instructor.name}
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-300 transition">
                          {course.instructor.experience}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-[#6366F1] h-2.5 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mb-6 uppercase">
                    Status: {course.progress || 0}% Complete
                  </p>

                  <Link
                    to={`/enrolled-courses/${course._id}`}
                    className="mt-auto inline-block text-center px-6 py-3 bg-[#6366F1] text-white rounded-full font-semibold hover:bg-[#4F46E5] transition shadow-md shadow-indigo-500/20"
                  >
                    Continue Learning →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

