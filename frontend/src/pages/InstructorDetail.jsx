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
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 relative">
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
              className="rounded-xl w-64 h-64 object-cover shadow-md"
            />

            {isEditing && (
              <label className="mt-4 flex items-center gap-2 bg-lime-100 px-3 py-2 rounded-md cursor-pointer border border-lime-400 hover:bg-lime-200 transition">
                <Upload size={18} /> Change Image
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
                  className="border p-2 rounded-md w-full"
                  placeholder="Instructor Name"
                  required
                />
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows="4"
                  className="border p-2 rounded-md w-full"
                  placeholder="Instructor Bio"
                  required
                />
                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Experience (e.g. 5 years)"
                  required
                />
                <button
                  type="submit"
                  className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
                >
                  <Save size={18} /> Save
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-[#0e2d25]">
                  {instructor.name}
                </h1>
                <p className="text-gray-700">{instructor.bio}</p>
                <p className="text-lime-700 font-medium">
                  Experience: {instructor.experience}
                </p>
              </>
            )}

            {/* Edit Button */}
            {user?.role === "admin" && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md"
              >
                <Edit size={18} /> Edit
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
            <h2 className="text-2xl font-bold mb-4 text-[#0e2d25]">
              Courses by {instructor.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-[#0e2d25] mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
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
