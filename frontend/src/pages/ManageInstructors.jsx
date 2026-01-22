import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, Upload } from "lucide-react";
import { useInstructors } from "../context/InstructorContext";
import { useNavigate } from "react-router-dom";


export default function ManageInstructors() {
  const {
    instructors,
    fetchInstructors,
    createInstructor,
    updateInstructor,
    deleteInstructor,
    loading,
    error,
  } = useInstructors();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    experience: "",
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const resetForm = () => {
    setForm({ name: "", bio: "", experience: "" });
    setImageFile(null);
  };

  const openAddModal = () => {
    resetForm();
    setCurrentInstructor(null);
    setIsModalOpen(true);
  };

  const openEditModal = (instructor) => {
    setCurrentInstructor(instructor);
    setForm({
      name: instructor.name,
      bio: instructor.bio,
      experience: instructor.experience,
    });
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (imageFile) formData.append("profileImage", imageFile); // ✅ match backend

    const result = currentInstructor
      ? await updateInstructor(currentInstructor._id, formData, true)
      : await createInstructor(formData, true);

    if (result.success) {
      fetchInstructors();
      setIsModalOpen(false);
      resetForm();
    } else {
      alert(result.message || "Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this instructor?")) {
      const result = await deleteInstructor(id);
      if (result.success) fetchInstructors();
      else alert(result.message);
    }
    
  };

  const navigate = useNavigate();

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen md:py-30 lg:py-30">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#0e2d25]">Manage Instructors</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-lime-500 text-white px-5 py-2 rounded-md font-medium hover:bg-lime-600 transition"
        >
          <PlusCircle size={20} /> Add Instructor
        </button>
      </div>

      {/* Instructors Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {instructors.map((inst) => (
          <div
            key={inst._id}
            onClick={() => navigate (`/admin/instructors/${inst._id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={
                inst.profileImage
                  ? inst.profileImage  // ✅ Directly use the Cloudinary URL
      : "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={inst.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#0e2d25] mb-2">
                {inst.name}
              </h3>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                {inst.bio}
              </p>
              <p className="text-sm font-medium text-lime-700 mb-4">
                Experience: {inst.experience}
              </p>
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => openEditModal(inst)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-1"
                >
                  <Edit size={18} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(inst._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-1"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#0e2d25] mb-6">
              {currentInstructor ? "Edit Instructor" : "Add Instructor"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Instructor Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
                required
              />

              <textarea
                name="bio"
                placeholder="Instructor Bio"
                value={form.bio}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
                rows="3"
                required
              ></textarea>

              <input
                type="text"
                name="experience"
                placeholder="Experience (e.g. 5 years)"
                value={form.experience}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
                required
              />

              {/* File Upload */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 bg-lime-100 px-3 py-2 rounded-md cursor-pointer border border-lime-400 hover:bg-lime-200 transition">
                  <Upload size={18} /> Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {imageFile && (
                  <p className="text-sm text-gray-600">{imageFile.name}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-md"
                >
                  {currentInstructor ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
