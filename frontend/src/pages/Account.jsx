import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Account() {
  const {
    user,
    signout,
    getEnrolledCourses,
    loading,
    uploadProfilePicture,
    updateUser,
  } = useAuth();

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      const result = await getEnrolledCourses();
      if (result.success) setCourses(result.courses);
      else setError(result.message);
    };
    fetchCourses();
  }, [user, getEnrolledCourses]);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: "" });
    }
  }, [user]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!profilePicture) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", profilePicture);

    const result = await uploadProfilePicture(formData);
    if (result.success) {
      toast.success("Profile picture updated successfully!");
      setPreview(null);
      setProfilePicture(null);
    } else {
      toast.error(result.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (profilePicture) data.append("profileImage", profilePicture);

    const result = await updateUser(user._id, data);

    if (result.success) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setFormData({ ...formData, password: "" });
    } else {
      toast.error(result.message);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          You are not logged in
        </h2>
        <Link
          to="/signin"
          className="px-8 py-3 bg-[#6366F1] rounded-full text-white font-semibold hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20"
        >
          Go to Sign In
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12 lg:py-30">
      {/* 🧑‍💼 Profile Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="relative">
          <img
            src={preview ||user?.profileImage   || "/default-avatar.png"}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#6366F1]"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-0 right-0 bg-[#6366F1] p-2 rounded-full cursor-pointer hover:bg-[#4F46E5] transition"
          >
            📷
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-[#0F172A] mb-2">
            {user.name}
          </h1>
          <p className="text-gray-600 mb-1">{user.email}</p>
          <p
            className={`inline-block mt-1 px-4 py-1 rounded-full text-sm font-medium ${
              user.role === "admin"
                ? "bg-red-100 text-red-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {user.role.toUpperCase()}
          </p>

          {profilePicture && (
            <div className="mt-4">
              <button
                onClick={handleUpload}
                className="px-6 py-2 bg-[#6366F1] text-white font-semibold rounded-full hover:bg-[#4F46E5] transition shadow-md shadow-indigo-500/20"
              >
                Upload Profile Picture
              </button>
            </div>
          )}

          <div className="mt-4 flex justify-center md:justify-start gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-full hover:bg-slate-200 transition font-semibold"
            >
              Edit Profile
            </button>
            <button
              onClick={signout}
              className="px-6 py-2 bg-[#0F172A] text-white rounded-full hover:bg-[#6366F1] transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ✏️ Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md relative border border-slate-100">
            <h2 className="text-2xl font-semibold text-center text-[#0F172A] mb-8">
              Edit Profile
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-[#6366F1] outline-none transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-[#6366F1] outline-none transition"
              />

              <input
                type="password"
                name="password"
                placeholder="New Password (optional)"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-[#6366F1] outline-none transition"
              />

              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#6366F1] text-white font-semibold rounded-full hover:bg-[#4F46E5] transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🎯 Dashboard Section */}
      <div className="bg-white rounded-3xl p-8 mb-12 text-center border border-slate-100">
        <h2 className="text-xl font-semibold text-[#0F172A] mb-8 uppercase tracking-widest text-sm">
          Go to Dashboards
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/user/dashboard")}
            className="px-8 py-3 bg-[#6366F1] text-white font-semibold rounded-full hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20"
          >
            Go to User Dashboard
          </button>
          {user.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition"
            >
              Go to Admin Dashboard
            </button>
          )}
        </div>
      </div>

      {/* 📚 Enrolled Courses */}
      <div className="bg-white rounded-3xl shadow-sm p-10 mb-10 border border-slate-100">
        <h2 className="text-3xl font-semibold text-[#0F172A] mb-8 tracking-tight">
          Enrolled Courses
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm font-medium">{error}</p>
        )}

        {courses.length === 0 ? (
          <div className="text-center text-gray-600 mb-4">
            You haven’t enrolled in any courses yet.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-gray-50 rounded-2xl shadow p-5 hover:shadow-lg transition"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Progress: {course.progress || 0}%
                </p>
                <Link
                  to={`/enrolled-courses/${course._id}`}
                  className="inline-block px-6 py-2.5 bg-[#6366F1] text-white font-semibold rounded-full hover:bg-[#4F46E5] transition shadow-md shadow-indigo-500/20 text-sm"
                >
                  Continue Learning →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

