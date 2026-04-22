import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useLectures } from "../context/LectureContext";
import { useAuth } from "../context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";

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
      <div className="bg-[#0F172A] min-h-screen pt-24 px-6">
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
    <div className="bg-[#0F172A] text-white min-h-screen pt-24">
      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-8">
        {/* Left */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-semibold tracking-tight">{course.title}</h1>
            <button
              onClick={handleRestartCourse}
              className="bg-red-500/20 text-red-500 border border-red-500/50 px-6 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition"
            >
              Restart Course
            </button>
          </div>

          <div className="mb-8">
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6366F1] h-full transition-all duration-700 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm font-semibold text-slate-400 mt-2 uppercase tracking-widest">{Math.round(progress)}% Completed</p>
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

          <div className="mt-8 bg-slate-800/50 border border-slate-700 p-8 rounded-3xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#6366F1]">About this course</h2>
            <p className="text-slate-300 leading-relaxed">{course.fullDesc}</p>
          </div>
        </div>

        {/* Right */}
        <aside className="lg:w-1/3 bg-[#020617] p-6 rounded-3xl border border-slate-800 max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#6366F1] rounded-full animate-pulse"></span>
            Lectures
          </h2>

          {lectures.map((lec) => (
            <div
              key={lec._id}
              onClick={() => {
                setCurrentVideoUrl(lec.videoUrl);
                markLectureAsWatched(courseId, lec._id);
              }}
              className={`p-4 mb-4 rounded-2xl cursor-pointer transition-all border ${
                currentVideoUrl === lec.videoUrl
                  ? "bg-slate-800 border-[#6366F1] shadow-lg"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex gap-4">
                <FaCheckCircle
                  className={
                    lec.isWatched ? "text-[#6366F1]" : "text-slate-700"
                  }
                />
                <div>
                  <h3 className={`font-semibold transition ${currentVideoUrl === lec.videoUrl ? 'text-[#6366F1]' : 'text-slate-300'}`}>
                    {lec.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{lec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* Reviews */}
      <section className="bg-white text-black px-10 py-20 rounded-t-3xl mt-12">
        <h2 className="text-3xl font-semibold mb-10 text-[#0F172A]">
          Student Reviews ({course.numReviews})
        </h2>

        {user && isEnrolled && !hasReviewed && (
          <form onSubmit={submitReviewHandler} className="mb-12 space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="bg-white border border-slate-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#6366F1] transition"
              >
                <option value="">Rating</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>

            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white border border-slate-200 p-4 w-full rounded-xl outline-none focus:ring-2 focus:ring-[#6366F1] transition"
              placeholder="Write your review..."
            />

            <button className="bg-[#6366F1] text-white px-10 py-3 rounded-full font-semibold hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20">
              Submit Review
            </button>
          </form>
        )}

        {course.reviews.map((r) => (
          <div key={r._id} className="border-b border-slate-100 pb-8 mb-8 last:border-b-0">
            <div className="flex items-center gap-4 mb-3">
              <p className="font-semibold text-[#0F172A]">{r.user.name}</p>
              <div className="text-yellow-400 text-sm">{"★".repeat(r.rating)}</div>
            </div>
            <p className="text-slate-600 leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EnrolledCourseDetail;

