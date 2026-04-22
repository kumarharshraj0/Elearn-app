import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, Save, Upload } from "lucide-react";
import { useInstructors } from "../context/InstructorContext";
import { useAuth } from "../context/AuthContext";

export default function InstructorDetail() {
  const { id } = useParams();
  const { getInstructorById, updateInstructor, loading } = useInstructors();
  const { user } = useAuth(); // check role if needed

  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({ name: "", bio: "", experience: "" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstructorById(id);
      if (data) {
        setInstructor(data.instructor);
        setCourses(data.courses || []);
        setForm({
          name: data.instructor.name,
          bio: data.instructor.bio,
          experience: data.instructor.experience,
        });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (imageFile) formData.append("profileImage", imageFile);

    const result = await updateInstructor(id, formData, true);
    if (result.success) {
      alert("Instructor updated successfully!");
      setIsEditing(false);
      const data = await getInstructorById(id);
      setInstructor(data.instructor);
    } else {
      alert(result.message);
    }
  };

  if (loading || !instructor)
    return (
      <div className="text-center py-20 text-gray-500">Loading instructor...</div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 lg:pt-32">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-10 relative">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="md:w-1/3 flex flex-col items-center">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : instructor.profileImage || "https://via.placeholder.com/300x300?text=No+Image"
              }
              alt={instructor.name}
              className="rounded-2xl w-64 h-64 object-cover shadow-2xl border-4 border-slate-50"
            />

            {isEditing && (
              <label className="mt-6 flex items-center gap-2 bg-indigo-50 px-6 py-3 rounded-xl cursor-pointer border border-indigo-200 hover:bg-indigo-100 transition text-[#6366F1] font-semibold">
                <Upload size={18} /> Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Info Section */}
          <div className="md:w-2/3 space-y-4">
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition"
                  placeholder="Instructor Name"
                  required
                />
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition"
                  placeholder="Instructor Bio"
                  required
                />
                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition"
                  placeholder="Experience (e.g. 5 years)"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-8 py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg shadow-indigo-500/20"
                >
                  <Save size={18} /> Save Settings
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-4xl font-semibold text-[#0F172A] tracking-tight">
                  {instructor.name}
                </h1>
                <p className="text-slate-600 leading-relaxed text-lg">{instructor.bio}</p>
                <div className="inline-block bg-indigo-50 text-[#6366F1] px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-widest">
                  {instructor.experience} Exp
                </div>
              </>
            )}

            {/* Edit Button */}
            {user?.role === "admin" && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 flex items-center gap-2 bg-[#0F172A] hover:bg-[#6366F1] text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-indigo-500/10"
              >
                <Edit size={18} /> Edit Profile
              </button>
            )}
          </div>
        </motion.div>

        {/* Courses Section */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <h2 className="text-2xl font-semibold mb-8 text-[#0F172A] flex items-center gap-3">
              <span className="w-2 h-8 bg-[#6366F1] rounded-full"></span>
              Courses by {instructor.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#6366F1] transition group cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2 group-hover:text-[#6366F1] transition">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 italic">
                    {course.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
