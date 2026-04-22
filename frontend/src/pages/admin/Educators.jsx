import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Assuming AuthContext provides user/educator data

export default function Educators() {
  const { token } = useAuth(); // Assuming token is needed for API calls
  const [educators, setEducators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEducator, setCurrentEducator] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // Only for creation, not for update
    role: "educator",
    bio: "",
    experience: "",
    image: "",
    socials: {
      linkedin: "",
      twitter: "",
      website: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ADMIN_API_BASE_URL = 'https://elearn.hharshportfolio.com/api/admin/users'; // Assuming admin user management endpoint

  useEffect(() => {
    fetchEducators();
  }, []);

  const fetchEducators = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(ADMIN_API_BASE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch educators');
      }
      const data = await response.json();
      // Filter for educators, assuming role is 'educator'
      setEducators(data.filter(user => user.role === 'educator'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socials.")) {
      const [parent, socialKey] = name.split(".");
      setForm((prevForm) => ({
        ...prevForm,
        socials: {
          ...prevForm.socials,
          [socialKey]: value,
        },
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let response;
      if (currentEducator) {
        // Update educator
        response = await fetch(`${ADMIN_API_BASE_URL}/${currentEducator._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      } else {
        // Add new educator
        response = await fetch(ADMIN_API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${currentEducator ? 'update' : 'create'} educator`);
      }

      setIsModalOpen(false);
      setForm({
        name: "",
        email: "",
        password: "",
        role: "educator",
        bio: "",
        experience: "",
        image: "",
        socials: {
          linkedin: "",
          twitter: "",
          website: "",
        },
      });
      setCurrentEducator(null);
      fetchEducators(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setCurrentEducator(null);
    setForm({
      name: "",
      email: "",
      password: "",
      role: "educator",
      bio: "",
      experience: "",
      image: "",
      socials: {
        linkedin: "",
        twitter: "",
        website: "",
      },
    });
    setIsModalOpen(true);
  };

  const openEditModal = (educator) => {
    setCurrentEducator(educator);
    setForm({
      name: educator.name,
      email: educator.email,
      password: "", // Password should not be pre-filled for security
      role: educator.role,
      bio: educator.bio || "",
      experience: educator.experience || "",
      image: educator.image || "",
      socials: educator.socials || {
        linkedin: "",
        twitter: "",
        website: "",
      },
    });
    setIsModalOpen(true);
  };

  const handleDeleteEducator = async (id) => {
    if (window.confirm("Are you sure you want to delete this educator?")) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${ADMIN_API_BASE_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete educator');
        }
        fetchEducators(); // Refresh the list
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading educators...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-10 bg-slate-50 min-h-screen lg:pt-32">
      <h1 className="text-4xl font-semibold text-[#0F172A] mb-10 tracking-tight">Manage Educators</h1>

      <button
        onClick={openAddModal}
        className="bg-[#6366F1] text-white px-8 py-3 rounded-full flex items-center gap-2 mb-10 hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20 font-semibold"
      >
        <PlusCircle size={22} />
        Add New Educator Account
      </button>

        <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  ID
                </th>
                <th className="px-8 py-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Personal Info
                </th>
                <th className="px-8 py-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Contact
                </th>
                <th className="px-8 py-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Experience
                </th>
                <th className="px-8 py-5 text-center text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Management
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {educators.map((educator) => (
                <tr key={educator._id} className="hover:bg-slate-50/50 transition">
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-semibold text-slate-400">
                    #{educator._id.slice(-6)}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#6366F1] font-semibold">
                        {educator.name[0]}
                      </div>
                      <div className="text-sm font-semibold text-[#0F172A]">{educator.name}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-500">
                    {educator.email}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="bg-indigo-50 text-[#6366F1] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                      {educator.experience}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-center">
                    <button
                      onClick={() => openEditModal(educator)}
                      className="text-slate-400 hover:text-[#6366F1] mr-4 transition"
                    >
                      <Edit size={22} />
                    </button>
                    <button
                      onClick={() => handleDeleteEducator(educator._id)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-100">
            <h2 className="text-3xl font-semibold mb-8 text-[#0F172A] tracking-tight">
              {currentEducator ? "Edit Profile" : "Register New Educator"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              {!currentEducator && ( // Only show password field for new educator
                <div className="mb-6">
                  <label className="block text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">
                    Security Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label className="block text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">
                  Image Source URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#6366F1] outline-none transition"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-6 uppercase tracking-widest text-sm">Professional Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    name="socials.linkedin"
                    value={form.socials.linkedin}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Twitter
                  </label>
                  <input
                    type="text"
                    name="socials.twitter"
                    value={form.socials.twitter}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    name="socials.website"
                    value={form.socials.website}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold py-4 px-8 rounded-full transition shadow-lg shadow-indigo-500/20"
                >
                  {currentEducator ? "Save Profile Changes" : "Create Educator Account"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 text-slate-500 font-semibold hover:text-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
