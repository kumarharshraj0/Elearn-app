import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // ✅ Import AuthContext to access token

const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuth(); // ✅ Get token from AuthContext
  const API_BASE = "http://localhost:5000/api/instructors";

  // ✅ Fetch all instructors
  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure data is always an array
      setInstructors(Array.isArray(data) ? data : data.instructors || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      setError(err.response?.data?.message || "Failed to fetch instructors");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get instructor by ID
  const getInstructorById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setError(null);
      return data; // { instructor, courses }
    } catch (err) {
      console.error("Error fetching instructor by ID:", err);
      setError(err.response?.data?.message || "Failed to fetch instructor");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create instructor (supports file upload)
  const createInstructor = async (formData, isMultipart = false) => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": isMultipart
          ? "multipart/form-data"
          : "application/json",
      };

      const { data } = await axios.post(API_BASE, formData, { headers });

      setInstructors((prev) => [...prev, data.instructor || data]);
      return { success: true, message: "Instructor created successfully" };
    } catch (err) {
      console.error("Error creating instructor:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to create instructor",
      };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update instructor (supports file upload)
  const updateInstructor = async (id, formData, isMultipart = false) => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": isMultipart
          ? "multipart/form-data"
          : "application/json",
      };

      const { data } = await axios.put(`${API_BASE}/${id}`, formData, {
        headers,
      });

      setInstructors((prev) =>
        prev.map((inst) => (inst._id === id ? data.instructor || data : inst))
      );

      return { success: true, message: "Instructor updated successfully" };
    } catch (err) {
      console.error("Error updating instructor:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to update instructor",
      };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete instructor
  const deleteInstructor = async (id) => {
    try {
      setLoading(true);

      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInstructors((prev) => prev.filter((inst) => inst._id !== id));
      return { success: true, message: "Instructor deleted successfully" };
    } catch (err) {
      console.error("Error deleting instructor:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to delete instructor",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <InstructorContext.Provider
      value={{
        instructors,
        loading,
        error,
        fetchInstructors,
        getInstructorById, // ✅ Added
        createInstructor,
        updateInstructor,
        deleteInstructor,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};

// ✅ Custom hook
export const useInstructors = () => useContext(InstructorContext);



