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
    <div className="p-6 bg-gray-50 min-h-screen md-py-30 lg:py-30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Courses</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          <PlusCircle size={18} /> Add New Course
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
                className="bg-white shadow rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div>
                  <img
                    src={course.image || "/placeholder.jpg"}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.category}</p>
                  <p className="text-gray-700 text-sm mt-2">
                    {course.shortDesc?.slice(0, 80)}...
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Duration: {course.duration || "N/A"}
                  </p>
                  <p className="text-gray-800 font-semibold mt-1">
                    ₹{course.price || 0}
                  </p>
                </div>

                <div
                  className="flex justify-between mt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => openModal(course)}
                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} /> Delete
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
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-semibold mb-4">
              {currentCourse ? "Edit Course" : "Add Course"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Course Title" className="w-full p-2 border rounded" required />
              <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug (unique)" className="w-full p-2 border rounded" required />
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />
              <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 10 hours)" className="w-full p-2 border rounded" />
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price (₹)" className="w-full p-2 border rounded" required />
              <textarea name="shortDesc" value={form.shortDesc} onChange={handleChange} placeholder="Short Description" className="w-full p-2 border rounded" />
              <textarea name="fullDesc" value={form.fullDesc} onChange={handleChange} placeholder="Full Description" className="w-full p-2 border rounded" />

              <div className="border p-3 rounded bg-gray-50">
                <h4 className="font-semibold mb-2 text-gray-700">Select Instructor</h4>
                <select name="instructor" value={form.instructor} onChange={handleChange} className="w-full p-2 border rounded" required>
                  <option value="">-- Select an Instructor --</option>
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

                <button type="button" onClick={handleAddLesson} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
                  Add Lesson
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

              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border rounded p-2" />

              <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
                {currentCourse ? "Update Course" : "Add Course"}
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-2 border rounded hover:bg-gray-100">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




