import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import StarRating from "../components/StarRating"; // Assuming a StarRating component exists or will be created

export default function CourseDetail() {
  const { slug } = useParams();
  const { user, getEnrolledCourses } = useAuth();
  const { fetchCourseBySlug, loading, error, createCourseReview } = useCourses();
  const [course, setCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const getCourse = async () => {
      const fetchedCourse = await fetchCourseBySlug(slug);
      setCourse(fetchedCourse);
    };
    getCourse();
  }, [slug]);

  useEffect(() => {
    const checkEnrollmentAndReview = async () => {
      if (user && course) {
        const enrolledCoursesResult = await getEnrolledCourses();
        if (enrolledCoursesResult.success) {
          const enrolledCourseIds = enrolledCoursesResult.courses.map(c => c._id);
          setIsEnrolled(enrolledCourseIds.includes(course._id));
        }

        const userReview = course.reviews?.find(
          (review) => review.user._id === user._id
        );
        setHasReviewed(!!userReview);
      }
    };
    checkEnrollmentAndReview();
  }, [user, course, getEnrolledCourses]);

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Please select a rating and write a comment");
      return;
    }

    const result = await createCourseReview(course._id, { rating, comment });
    if (result.success) {
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      // Re-fetch course to update reviews
      const updatedCourse = await fetchCourseBySlug(slug);
      setCourse(updatedCourse);
      setHasReviewed(true);
    } else {
      toast.error(result.message);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading course details...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!course) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-600">Course Not Found</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] text-white min-h-[110vh]">
      {/* Hero Section */}
      <section className="pt-20 pb-10 md:py-24 px-6 md:px-16 flex flex-col md:flex-row items-center gap-12 lg:py-[30vh]">
        {/* Course Image */}
        <div className="w-full md:w-1/2">
          <img
            src={course.image}
            alt={course.title}
            className="w-full rounded-2xl shadow-lg"
          />
          {course.thumbnailUrl && (
            <img src={course.thumbnailUrl} alt="Course Thumbnail" className="w-full rounded-2xl shadow-lg mt-4" />
          )}
          {course.videoUrl && (
            <video controls src={course.videoUrl} className="w-full rounded-2xl shadow-lg mt-4" muted={false}></video>
          )}
        </div>

        {/* Course Info */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <StarRating rating={course.rating} />
            <p className="text-gray-300 text-sm">
              {course.rating?.toFixed(1)} ({course.numReviews} Reviews)
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-3">
            {course.title}
          </h1>
          <p className="text-gray-200 mb-5 leading-relaxed">
            {course.fullDesc}
          </p>

          <p className="text-gray-300 mb-4">
            By{" "}
            <span className="font-semibold text-white">
              {course.instructor?.name}
            </span>
          </p>

          <h2 className="text-3xl font-semibold mb-2">${course.price}</h2>

          <Link
            to="/checkout"
            state={{ course }} // Pass course data to checkout page
            className="inline-block mt-3 px-8 py-3 bg-[#6366F1] text-white font-semibold rounded-full
                       shadow-md hover:bg-white hover:text-[#0F172A] transition"
          >
            Get Access To This Course
          </Link>
          {user && user.role === 'admin' && (
            <Link
              to={`/admin/courses/${course._id}/lectures`}
              className="inline-block mt-3 ml-4 px-8 py-3 bg-purple-500 text-white font-semibold rounded-full
                         shadow-md hover:bg-purple-700 transition"
            >
              Manage Lectures
            </Link>
          )}
        </div>
      </section>

      {/* Course Lessons + Info */}
      <section className="bg-white text-black py-16 px-6 md:px-16 lg:px-32 rounded-t-3xl">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Lessons Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#0F172A]">
              Lessons in this course
            </h2>
            <div className="space-y-3">
              {course.lessons?.map((lesson, i) => (
                <div
                  key={lesson._id}
                  className="border border-gray-200 rounded-xl px-5 py-4 hover:bg-gray-100 transition"
                >
                  <p className="font-semibold text-gray-800">
                    Lesson {i + 1}: {lesson.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Course Information */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <h3 className="text-xl font-semibold mb-4 text-[#0F172A]">
              Course Information
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Lessons:</strong> {course.lessons?.length}
              </li>
              <li>
                <strong>Duration:</strong> {course.duration}
              </li>
              <li>
                <strong>Students:</strong> {course.students}
              </li>
              <li>
                <strong>Language:</strong> {course.language}
              </li>
              <li>
                <strong>Subtitles:</strong> {course.subtitles}
              </li>
              <li>
                <strong>Resources:</strong> {course.resources} files
              </li>
              <li>
                <strong>Certificate:</strong> Upon completion
              </li>
            </ul>

            <Link
              to="/checkout"
              state={{ course }} // Pass course data to checkout page
              className="block mt-6 text-center bg-[#0F172A] text-white py-4 rounded-full
                         font-semibold hover:bg-[#6366F1] transition shadow-lg"
            >
              Get Access To This Course
            </Link>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="bg-white text-black px-6 md:px-16 lg:px-32 py-16">
        <h2 className="text-2xl font-semibold mb-6 text-[#0F172A]">
          Meet your teacher
        </h2>
        <div className="flex items-center gap-6">
          <img
            src={course.instructor?.profileImage}
            alt={course.instructor?.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg text-[#0F172A]">
              {course.instructor?.name}
            </h3>
            <p className="text-gray-600 mb-2">{course.instructor?.experience}</p>
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              {course.instructor?.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white text-black px-6 md:px-16 lg:px-32 py-16 border-t border-slate-100">
        <h2 className="text-2xl font-semibold mb-6 text-[#0F172A]">
          Student Reviews ({course.numReviews})
        </h2>

        {user && isEnrolled && !hasReviewed && (
          <div className="mb-10 p-6 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <form onSubmit={submitReviewHandler} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select...</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Comment
                </label>
                <textarea
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        {course.reviews?.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review this course!</p>
        ) : (
          <div className="space-y-8">
            {course.reviews?.map((review) => (
              <div key={review._id} className="border-b border-slate-100 pb-6">
                <div className="flex items-center mb-3">
                  <p className="font-semibold text-[#0F172A] mr-3">{review.user.name}</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

