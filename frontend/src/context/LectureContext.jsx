import { createContext, useContext, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const LectureContext = createContext();

export const LectureProvider = ({ children }) => {
  const { token } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://elearn-app-backend.onrender.com/api/lectures";

  // Fetch all lectures for a course
  const fetchLectures = useCallback(async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch lectures");
      setLectures(data.lectures);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Create lecture (with video & thumbnail)
  const createLecture = async (courseId, lectureData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", lectureData.title);
      formData.append("description", lectureData.description);
      if (lectureData.video) formData.append("video", lectureData.video);
      if (lectureData.thumbnail) formData.append("thumbnail", lectureData.thumbnail);

      const res = await fetch(`${API_BASE_URL}/${courseId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create lecture");

      setLectures((prev) => [...prev, data.lecture]);
      return { success: true, lecture: data.lecture };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update lecture
  const updateLecture = async (courseId, lectureId, lectureData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", lectureData.title);
      formData.append("description", lectureData.description);
      if (lectureData.video) formData.append("video", lectureData.video);
      if (lectureData.thumbnail) formData.append("thumbnail", lectureData.thumbnail);

      const res = await fetch(`${API_BASE_URL}/${courseId}/${lectureId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update lecture");

      setLectures((prev) =>
        prev.map((l) => (l._id === lectureId ? data.lecture : l))
      );
      return { success: true, lecture: data.lecture };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete lecture
  const deleteLecture = async (courseId, lectureId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/${courseId}/${lectureId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete lecture");

      setLectures((prev) => prev.filter((l) => l._id !== lectureId));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Mark lecture as watched
  const markLectureAsWatched = async (courseId, lectureId) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${courseId}/${lectureId}/watch`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to mark lecture as watched");

      // Update local state
      setLectures((prev) =>
        prev.map((l) =>
          l._id === lectureId ? { ...l, isWatched: true } : l
        )
      );
      return { success: true };
    } catch (err) {
      console.error("markLectureAsWatched error:", err.message);
      return { success: false, message: err.message };
    }
  };

  // Reset course progress
  const resetCourseProgress = async (courseId) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${courseId}/reset-progress`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset course progress");

      // Reset local state
      setLectures((prev) => prev.map((l) => ({ ...l, isWatched: false })));
      return { success: true };
    } catch (err) {
      console.error("resetCourseProgress error:", err.message);
      return { success: false, message: err.message };
    }
  };

  return (
    <LectureContext.Provider
      value={{
        lectures,
        loading,
        error,
        fetchLectures,
        createLecture,
        updateLecture,
        deleteLecture,
        markLectureAsWatched,   // ✅ Included
        resetCourseProgress,    // ✅ Included
      }}
    >
      {children}
    </LectureContext.Provider>
  );
};

export const useLectures = () => useContext(LectureContext);

