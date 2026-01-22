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

  // ✅ Pick top 8–10 courses (here: 8)
  const topCourses = filteredCourses.slice(0, 8);

  // ✅ Split into rows of 4
  const rows = [];
  for (let i = 0; i < topCourses.length; i += 4) {
    rows.push(topCourses.slice(i, i + 4));
  }

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
    <section className="py-16 bg-gray-50 min-h-[120vh]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Top courses to get you started
        </h2>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Rows */}
        <div className="space-y-10">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-6 w-max [&::-webkit-scrollbar]:hidden">
                {row.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition w-80 flex-shrink-0"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-44 object-cover"
                    />

                    <div className="p-6">
                      <p className="text-green-600 font-medium mb-2">
                        {course.category}
                      </p>

                      <h3 className="text-xl font-bold mb-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-500 mb-3">
                        By {course.instructor?.name}
                      </p>

                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>{course.totalLessons || 0} Lessons</span>
                        <span>{course.duration || "—"}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">
                          ₹{course.price}
                        </span>

                        {course.slug && (
                          <Link
                            to={`/courses/${course.slug}`}
                            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                          >
                            View Course
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="flex justify-center mt-12">
          <Link
            to="/courses"
            className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-full hover:bg-green-700 transition"
          >
            View More Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
