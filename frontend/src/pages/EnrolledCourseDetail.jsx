import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useLectures } from "../context/LectureContext";
import { useAuth } from "../context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

/* =======================
   Skeleton Components
======================= */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
);

const VideoSkeleton = () => (
  <Skeleton className="w-full aspect-video rounded-lg" />
);

const LectureSkeleton = () => (
  <div className="flex gap-3 p-4 bg-white rounded-lg">
    <Skeleton className="w-16 h-16" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
    </div>
  </div>
);

const EnrolledCourseDetail = () => {
  const { courseId } = useParams();

  const {
    getCourseById,
    loading: courseLoading,
    error: courseError,
    createCourseReview,
  } = useCourses();

  const {
    lectures,
    loading: lectureLoading,
    error: lectureError,
    fetchLectures,
    markLectureAsWatched,
    resetCourseProgress,
  } = useLectures();

  const { user, token, loading: authLoading, getEnrolledCourses } = useAuth();

  const [course, setCourse] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const enrollmentCheckedRef = useRef(false); // ✅ prevents loop

  /* =======================
     Fetch Course & Lectures
  ======================= */
  useEffect(() => {
    if (!courseId || !token || authLoading) return;

    const fetchData = async () => {
      const fetchedCourse = await getCourseById(courseId);
      setCourse(fetchedCourse);
      await fetchLectures(courseId);
    };

    fetchData();
  }, [courseId, token, authLoading]);

  /* =======================
     Enrollment & Review (RUN ONCE)
  ======================= */
  useEffect(() => {
    if (!user || !course || enrollmentCheckedRef.current) return;

    const checkStatus = async () => {
      const res = await getEnrolledCourses();

      if (res.success) {
        setIsEnrolled(res.courses.some((c) => c._id === course._id));
      }

      setHasReviewed(
        course.reviews?.some((r) => r.user._id === user._id)
      );

      enrollmentCheckedRef.current = true;
    };

    checkStatus();
  }, [user, course, getEnrolledCourses]);

  /* =======================
     Initial Video
  ======================= */
  useEffect(() => {
    if (lectures?.length && !currentVideoUrl) {
      setCurrentVideoUrl(lectures[0].videoUrl);
    }
  }, [lectures, currentVideoUrl]);

  /* =======================
     Progress Calculation
  ======================= */
  useEffect(() => {
    if (!lectures?.length) {
      setProgress(0);
      return;
    }

    const watched = lectures.filter((l) => l.isWatched).length;
    const newProgress = (watched / lectures.length) * 100;

    setProgress((prev) => (prev !== newProgress ? newProgress : prev));
  }, [lectures]);

  /* =======================
     Review Submit
  ======================= */
  const submitReviewHandler = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      toast.error("Please add rating and comment");
      return;
    }

    const res = await createCourseReview(course._id, { rating, comment });

    if (res.success) {
      toast.success("Review submitted");
      setRating("");
      setComment("");

      const updatedCourse = await getCourseById(courseId);
      setCourse(updatedCourse);
      setHasReviewed(true);
    }
  };

  /* =======================
     Restart Course
  ======================= */
  const handleRestartCourse = async () => {
    if (!window.confirm("Restart course?")) return;

    await resetCourseProgress(courseId);
    await fetchLectures(courseId);

    setCurrentVideoUrl("");
    setProgress(0);
    enrollmentCheckedRef.current = false;

    toast.success("Course restarted");
  };

  /* =======================
     Loading Skeleton
  ======================= */
  if (authLoading || courseLoading || lectureLoading) {
    return (
      <div className="bg-[#0e2d25] min-h-screen pt-24 px-6">
        <div className="container mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-2 w-full" />
            <VideoSkeleton />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <LectureSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (courseError || lectureError) {
    return (
      <div className="text-center text-red-500 py-20">
        {courseError || lectureError}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 text-2xl">
        Course Not Found
      </div>
    );
  }

  /* =======================
     MAIN UI (UNCHANGED)
  ======================= */
  return (
    <div className="bg-[#0e2d25] text-white min-h-screen pt-20">
      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-8">
        {/* Left */}
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <button
              onClick={handleRestartCourse}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Restart
            </button>
          </div>

          <div className="mb-4">
            <div className="w-full bg-gray-700 h-2 rounded">
              <div
                className="bg-green-600 h-2 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm mt-1">{Math.round(progress)}% Completed</p>
          </div>

          <div className="aspect-video rounded overflow-hidden">
            {currentVideoUrl?.includes("youtube") ? (
              <iframe
                src={currentVideoUrl}
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              <video src={currentVideoUrl} controls className="w-full h-full" />
            )}
          </div>

          <div className="mt-6 bg-green-950 p-5 rounded">
            <h2 className="text-xl font-semibold mb-2">About this course</h2>
            <p>{course.fullDesc}</p>
          </div>
        </div>

        {/* Right */}
        <div className="lg:w-1/3 bg-green-950 p-4 rounded max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Lectures</h2>

          {lectures.map((lec) => (
            <div
              key={lec._id}
              onClick={() => {
                setCurrentVideoUrl(lec.videoUrl);
                markLectureAsWatched(courseId, lec._id);
              }}
              className={`p-3 mb-3 rounded cursor-pointer ${
                currentVideoUrl === lec.videoUrl
                  ? "bg-green-700"
                  : "bg-white text-black"
              }`}
            >
              <div className="flex gap-3">
                <FaCheckCircle
                  className={
                    lec.isWatched ? "text-green-500" : "text-gray-400"
                  }
                />
                <div>
                  <h3 className="font-semibold">{lec.title}</h3>
                  <p className="text-sm">{lec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <section className="bg-white text-black px-10 py-16">
        <h2 className="text-2xl font-bold mb-6">
          Reviews ({course.numReviews})
        </h2>

        {user && isEnrolled && !hasReviewed && (
          <form onSubmit={submitReviewHandler} className="mb-10 space-y-4">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Rating</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>

            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 w-full"
              placeholder="Write your review..."
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Submit Review
            </button>
          </form>
        )}

        {course.reviews.map((r) => (
          <div key={r._id} className="border-b pb-4 mb-4">
            <p className="font-semibold">{r.user.name}</p>
            <p>{"★".repeat(r.rating)}</p>
            <p>{r.comment}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EnrolledCourseDetail;

