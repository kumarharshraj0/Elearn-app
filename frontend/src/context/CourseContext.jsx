import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  // Base URLs
  const API_BASE_URL = "https://elearn-app-backend.onrender.com/api/courses";
  const ADMIN_API_BASE_URL = "https://elearn-app-backend.onrender.com/api/admin/courses";

  // Normal user API instance
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  // Admin API instance
  const admin_api = axios.create({
    baseURL: ADMIN_API_BASE_URL,
  });

  // ✅ Attach token to normal API requests
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Attach token to admin API requests
  admin_api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Fetch all courses (public/student)
  const getCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/");
      const fetchedCourses = Array.isArray(res.data)
        ? res.data
        : res.data.courses || [];
      setCourses(fetchedCourses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.response?.data?.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, [api]);

  // ✅ Fetch single course by ID
  const getCourseById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/id/${id}`);
      return res.data || null;
    } catch (err) {
      console.error("Error fetching course by ID:", err);
      setError(err.response?.data?.message || "Failed to fetch course");
      return null;
    } finally {
      setLoading(false);
    }
  }, [api]);

  // ✅ Fetch course by slug
  const fetchCourseBySlug = useCallback(async (slug) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/${slug}`);
      return res.data || null;
    } catch (err) {
      console.error("Error fetching course by slug:", err);
      setError(err.response?.data?.message || "Failed to fetch course by slug");
      return null;
    } finally {
      setLoading(false);
    }
  }, [api]);

  // ✅ Add new course (admin only)
  const addCourse = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await admin_api.post("/", formData, config);
      const newCourse = res.data?.course || res.data;
      setCourses((prevCourses) => [...prevCourses, newCourse]);
      return { success: true, message: "Course added successfully" };
    } catch (err) {
      console.error("Error adding course:", err);
      const msg = err.response?.data?.message || "Failed to add course";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, [admin_api]);

  // ✅ Update existing course (admin only)
  const updateCourse = useCallback(async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await admin_api.put(`/${id}`, formData, config);
      const updatedCourse = res.data?.course || res.data;
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === id ? updatedCourse : course
        )
      );
      return { success: true, message: "Course updated successfully" };
    } catch (err) {
      console.error("Error updating course:", err);
      const msg = err.response?.data?.message || "Failed to update course";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, [admin_api]);

  // ✅ Delete a course (admin only)
  const deleteCourse = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await admin_api.delete(`/${id}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== id)
      );
      return { success: true, message: "Course deleted successfully" };
    } catch (err) {
      console.error("Error deleting course:", err);
      const msg = err.response?.data?.message || "Failed to delete course";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, [admin_api]);

  // ✅ Add course review
  const createCourseReview = useCallback(async (courseId, reviewData) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(`${API_BASE_URL}/${courseId}/reviews`, reviewData, config);
      // After successful review, refetch the course to update reviews and rating
      const updatedCourse = await fetchCourseBySlug(res.data.slug); // Assuming slug is returned or can be derived
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? updatedCourse : course
        )
      );
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error("Error creating review:", err);
      const msg = err.response?.data?.message || "Failed to create review";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, [token, fetchCourseBySlug]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        getCourses,
        getCourseById,
        fetchCourseBySlug,
        addCourse,
        updateCourse,
        deleteCourse,
        createCourseReview, // Add createCourseReview to context value
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);

