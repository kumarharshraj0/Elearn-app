import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, Video } from "lucide-react";
import { useCourses } from "../../context/CourseContext";
import { useInstructors } from "../../context/InstructorContext";
import { useNavigate } from "react-router-dom";

export default function ManageCourses() {
  const { courses, getCourses, addCourse, updateCourse, deleteCourse, loading, error } = useCourses();
  const { instructors, fetchInstructors } = useInstructors();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [lessonFile, setLessonFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Programming",
    duration: "",
    level: "Beginner",
    shortDesc: "",
    fullDesc: "",
    price: "",
    instructor: "",
    lessons: [],
  });

  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    video: null,
  });

  useEffect(() => {
    getCourses();
    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setLessonForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      category: "Programming",
      duration: "",
      level: "Beginner",
      shortDesc: "",
      fullDesc: "",
      price: "",
      instructor: "",
      lessons: [],
    });
    setImageFile(null);
    setLessonForm({ title: "", description: "", video: null });
    setLessonFile(null);
  };

  const openModal = (course = null) => {
    setCurrentCourse(course);
    if (course) {
      setForm({
        ...course,
        instructor: course.instructor ? course.instructor._id : "",
        lessons: course.lessons || [],
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleAddLesson = () => {
    if (!lessonForm.title || !lessonForm.description) {
      alert("Please fill in lesson title and description");
      return;
    }
    const newLesson = {
      title: lessonForm.title,
      description: lessonForm.description,
      video: lessonFile ? URL.createObjectURL(lessonFile) : null,
    };
    setForm((prev) => ({
      ...prev,
      lessons: [...prev.lessons, newLesson],
    }));
    setLessonForm({ title: "", description: "", video: null });
    setLessonFile(null);
  };

  const handleRemoveLesson = (index) => {
    setForm((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "lessons") {
        formData.append("lessons", JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (imageFile) formData.append("image", imageFile);

    let result;
    if (currentCourse) {
      result = await updateCourse(currentCourse._id, formData);
    } else {
      result = await addCourse(formData);
    }

    if (result?.success) {
      getCourses();
      setIsModalOpen(false);
      resetForm();
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (confirmed) {
      await deleteCourse(id);
      getCourses();
    }
  };

  const openManageLectures = (courseId) => {
    navigate(`/admin/manage-lectures/${courseId}`);
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen lg:pt-32">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-semibold text-[#0F172A] tracking-tight">Manage Courses</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#6366F1] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20"
        >
          <PlusCircle size={20} /> Add New Course
        </button>
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {courses?.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                onClick={() => openManageLectures(course._id)}
                className="bg-white rounded-3xl p-6 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all border border-slate-100 group"
              >
                <div>
                  <img
                    src={course.image || "/placeholder.jpg"}
                    alt={course.title}
                    className="w-full h-44 object-cover rounded-2xl mb-4 group-hover:opacity-90 transition"
                  />
                  <h3 className="text-xl font-semibold text-[#0F172A] group-hover:text-[#6366F1] transition">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.category}</p>
                  <p className="text-gray-700 text-sm mt-2">
                    {course.shortDesc?.slice(0, 80)}...
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Duration: {course.duration || "N/A"}
                  </p>
                  <p className="text-[#6366F1] font-semibold text-xl mt-4">
                    ${course.price || 0}
                  </p>
                </div>

                <div
                  className="flex justify-between mt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => openModal(course)}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#6366F1] font-semibold transition"
                  >
                    <Edit size={18} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex items-center gap-2 text-red-400 hover:text-red-600 font-semibold transition"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-xl p-10 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-100">
            <h3 className="text-2xl font-semibold mb-8 text-[#0F172A] tracking-tight">
              {currentCourse ? "Edit Course Settings" : "Create New Course"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Course Title" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition" required />
              <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug (unique-url)" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition" required />
              <div className="grid grid-cols-2 gap-4">
                <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition" />
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition" />
              </div>
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price ($)" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition" required />
              <textarea name="shortDesc" value={form.shortDesc} onChange={handleChange} placeholder="Short Description" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition" />
              <textarea name="fullDesc" value={form.fullDesc} onChange={handleChange} placeholder="Full Description" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition" rows="4" />

              <div className="border border-slate-200 p-6 rounded-2xl bg-slate-50">
                <h4 className="font-semibold mb-3 text-slate-500 uppercase tracking-widest text-xs">Select Instructor</h4>
                <select name="instructor" value={form.instructor} onChange={handleChange} className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition" required>
                  <option value="">-- Choose Instructor --</option>
                  {instructors.map((inst) => (
                    <option key={inst._id} value={inst._id}>
                      {inst.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lessons Section */}
              <div className="border p-3 rounded bg-gray-50 mt-4">
                <h4 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                  <Video size={18} /> Add Lessons
                </h4>

                <input name="title" value={lessonForm.title} onChange={handleLessonChange} placeholder="Lesson Title" className="w-full p-2 border rounded mb-2" />
                <textarea name="description" value={lessonForm.description} onChange={handleLessonChange} placeholder="Lesson Description" className="w-full p-2 border rounded mb-2" />
                <input type="file" onChange={(e) => setLessonFile(e.target.files[0])} className="w-full border rounded p-2 mb-2" />

                <button type="button" onClick={handleAddLesson} className="bg-[#6366F1] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4F46E5] w-full transition shadow-lg shadow-indigo-500/10">
                  Add Lesson to Course
                </button>

                {form.lessons.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {form.lessons.map((lesson, index) => (
                      <li key={index} className="flex justify-between items-center bg-white border rounded p-2 text-sm">
                        <span>{lesson.title}</span>
                        <button onClick={() => handleRemoveLesson(index)} className="text-red-600 hover:text-red-800">
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-[#6366F1] font-semibold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#6366F1] file:text-white" />

              <button type="submit" className="bg-[#0F172A] text-white w-full py-4 rounded-full font-semibold hover:bg-[#6366F1] transition shadow-xl mt-6">
                {currentCourse ? "Save Course Changes" : "Publish Course Now"}
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-4 text-slate-500 font-semibold hover:text-slate-700 transition">
                Discard Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




