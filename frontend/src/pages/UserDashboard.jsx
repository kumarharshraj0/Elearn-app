import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserDashboard() {
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
  }, [ token]); // ✅ re-run when token or authLoading changes

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

  // ✅ Handle when authContext is still loading (restoring session)
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Restoring your session...
      </div>
    );
  }

  // ✅ Handle when fetching enrolled courses
  if (loadingCourses) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-[#0e2d25] text-white h-[50vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-300 text-lg">
          Here’s your learning journey and enrolled courses.
        </p>
      </section>

      {/* COURSES SECTION */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50" id="courses">
        <h2 className="text-3xl font-bold text-center text-[#0e2d25] mb-8">
          Your Enrolled Courses
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? "bg-[#0e2d25] text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
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
          <div className="text-center bg-white p-10 rounded-2xl shadow">
            <p className="text-gray-600 mb-4">
              You haven’t enrolled in any {activeCategory} courses yet.
            </p>
            <Link
              to="/courses"
              className="px-6 py-2 bg-lime-400 rounded-full text-black font-semibold hover:bg-lime-500 transition"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition group h-[450px] flex flex-col hover:bg-[#0e2d25]"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover group-hover:opacity-80 transition-all duration-500"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-green-600 font-medium mb-1 group-hover:text-lime-300 transition">
                    {course.category}
                  </p>
                  <h3 className="font-semibold text-xl text-[#0e2d25] mb-2 group-hover:text-white transition">
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
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-lime-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-300">
                    Progress: {course.progress || 0}%
                  </p>

                  <Link
                    to={`/enrolled-courses/${course._id}`}
                    className="mt-auto inline-block text-center px-5 py-2 bg-lime-400 text-black rounded-full font-medium hover:bg-lime-500 transition"
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

