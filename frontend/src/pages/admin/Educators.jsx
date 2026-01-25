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

  const ADMIN_API_BASE_URL = 'https://elearn-app-backend.onrender.com/api/admin/users'; // Assuming admin user management endpoint

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
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md ">
      <h1 className="text-3xl font-bold text-[#0e2d25] mb-6">Manage Educators</h1>

      <button
        onClick={openAddModal}
        className="bg-lime-500 text-white px-4 py-2 rounded-md flex items-center gap-2 mb-6 hover:bg-lime-600 transition"
      >
        <PlusCircle size={20} />
        Add New Educator
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {educators.map((educator) => (
              <tr key={educator._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {educator._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {educator.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {educator.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {educator.experience}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(educator)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteEducator(educator._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-[#0e2d25]">
              {currentEducator ? "Edit Educator" : "Add New Educator"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
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
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0e2d25] mb-4">Socials</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
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
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {currentEducator ? "Update Educator" : "Add Educator"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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