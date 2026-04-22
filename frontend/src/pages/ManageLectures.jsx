import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusCircle, Edit, Trash2, Upload, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLectures } from "../context/LectureContext";
import { useAuth } from "../context/AuthContext";

export default function ManageLectures() {
  const { courseId } = useParams();
  const { token } = useAuth();
  const {
    lectures,
    fetchLectures,
    createLecture,
    updateLecture,
    deleteLecture,
    loading,
    error,
  } = useLectures();

  const [form, setForm] = useState({
    title: "",
    description: "",
    video: null,
    thumbnail: null,
  });

  const [editingLecture, setEditingLecture] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  useEffect(() => {
    if (courseId && token) {
      fetchLectures(courseId);
    }
  }, [courseId, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));

      // 🎞️ Auto video preview for uploaded files
      if (name === "video") {
        const fileUrl = URL.createObjectURL(files[0]);
        setPreviewVideo(fileUrl);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      if (editingLecture) {
        await updateLecture(courseId, editingLecture._id, form);
        setEditingLecture(null);
      } else {
        await createLecture(courseId, form);
      }

      setForm({ title: "", description: "", video: null, thumbnail: null });
      setPreviewVideo(null);
      fetchLectures(courseId);
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  const handleEdit = (lecture) => {
    setEditingLecture(lecture);
    setForm({
      title: lecture.title,
      description: lecture.description,
      video: null,
      thumbnail: null,
    });
  };

  const handleDelete = async (lectureId) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      await deleteLecture(courseId, lectureId);
      fetchLectures(courseId);
    }
  };

  const handlePlay = (lecture) => {
    setSelectedLecture(lecture);
    setPreviewVideo(lecture.videoUrl);
  };

  return (
    <div className="bg-[#0F172A] min-h-screen text-white pt-24 pb-10">
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        {/* LEFT: Form + Lecture List */}
        <div>
          <motion.h1
            className="text-4xl font-semibold mb-10 flex items-center gap-3 text-white tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PlusCircle className="text-[#6366F1]" size={36} />
            Manage Lectures
          </motion.h1>

          {/* ✅ Lecture Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-3xl p-8 mb-10 shadow-2xl space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Lecture Title"
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#6366F1] outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Lecture Description"
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#6366F1] outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-green-300 mb-1 block">
                  Upload Video
                </label>
                <input
                  type="file"
                  name="video"
                  onChange={handleChange}
                  accept="video/*"
                  className="w-full p-2 border border-slate-700 rounded-xl bg-slate-900 text-slate-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#6366F1] file:text-white hover:file:bg-[#4F46E5]"
                />
              </div>
              <div>
                <label className="text-sm text-green-300 mb-1 block">
                  Upload Thumbnail
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-2 border border-slate-700 rounded-xl bg-slate-900 text-slate-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/20 file:text-indigo-400 hover:file:bg-indigo-500/30"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 flex justify-center items-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                loading
                  ? "bg-slate-700 cursor-not-allowed text-slate-500"
                  : "bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-indigo-500/20"
              }`}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <Upload size={18} />
              {editingLecture ? "Update Lecture" : "Create Lecture"}
            </motion.button>
          </motion.form>

          {/* ✅ Lecture List */}
          <motion.div
            className="bg-slate-800/30 border border-slate-700 rounded-3xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8 text-[#6366F1] uppercase tracking-widest text-sm">
              All Lectures
            </h2>

            {loading && <p className="text-gray-400">Loading lectures...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {lectures.length === 0 ? (
              <p className="text-gray-400 italic">No lectures available yet.</p>
            ) : (
              <AnimatePresence>
                <ul className="space-y-4">
                  {lectures.map((lecture) => (
                    <motion.li
                      key={lecture._id}
                      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex justify-between items-center hover:border-[#6366F1] transition-all duration-300"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => handlePlay(lecture)}
                      >
                        {lecture.thumbnailUrl && (
                          <motion.img
                            src={lecture.thumbnailUrl}
                            alt={lecture.title}
                            className="w-20 h-20 object-cover rounded-xl border-2 border-slate-700 shadow-xl"
                            whileHover={{ scale: 1.05 }}
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {lecture.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {lecture.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          onClick={() => handleEdit(lecture)}
                          className="text-yellow-400 hover:text-yellow-500"
                          whileHover={{ scale: 1.2 }}
                          title="Edit"
                        >
                          <Edit size={22} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(lecture._id)}
                          className="text-red-500 hover:text-red-600"
                          whileHover={{ scale: 1.2 }}
                          title="Delete"
                        >
                          <Trash2 size={22} />
                        </motion.button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </AnimatePresence>
            )}
          </motion.div>
        </div>

        {/* RIGHT: 🎥 Video Player Preview */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-8 text-[#6366F1] uppercase tracking-widest text-sm">
            {selectedLecture ? "Now Playing" : "Video Preview"}
          </h2>

          {previewVideo ? (
            <video
              key={previewVideo}
              src={previewVideo}
              controls
              autoPlay
              className="rounded-2xl w-full aspect-video bg-black shadow-2xl border border-slate-700"
            />
          ) : (
            <div className="flex flex-col items-center justify-center aspect-video w-full bg-slate-900 rounded-2xl border-2 border-dashed border-slate-700 text-slate-500">
              <PlayCircle size={64} className="mb-4 text-slate-700" />
              <p className="font-medium">Select a lecture to preview</p>
            </div>
          )}

          {selectedLecture && (
            <div className="mt-8 text-center bg-slate-900/50 p-6 rounded-2xl w-full border border-slate-800">
              <h3 className="text-xl font-semibold text-white">
                {selectedLecture.title}
              </h3>
              <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                {selectedLecture.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




