import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import axios from "axios";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [articles, setArticles] = useState([]); // ✅ Empty initially
  const [loading, setLoading] = useState(true);

  const categories = [
    "All Posts",
    "Career Growth",
    "Technology & Innovation",
    "Tips & Strategies",
    "Development",
  ];

  // ✅ Fetch from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // ✅ Filter by category
  const filteredArticles =
    activeCategory === "All Posts"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl text-[#0e2d25]">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#0e2d25] text-white h-[70vh] flex flex-col justify-center items-center text-center px-6 py-[48vh]">
        <h1 className="text-5xl font-bold mb-6">Explore. Learn. Grow.</h1>
        <p className="text-lg max-w-2xl text-gray-200 leading-relaxed">
          Your ultimate source for knowledge, tips, and trends, fueling growth,
          success, and lifelong learning in education and technology.
        </p>
        <div className="mt-8 flex space-x-4">
          <a
            href="#blog"
            className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-full shadow-lg hover:bg-lime-500 transition"
          >
            Read Blog
          </a>
          <Link
            to={"/courses"}
            className="px-6 py-3 border border-gray-300 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <h2 className="text-5xl font-bold text-center text-[#0e2d25] mb-18 ">
          Featured Articles
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-gray-500 text-sm flex items-center mb-2">
                  <span className="mr-2">📅</span> {article.date}
                </p>
                <h3 className="font-semibold text-lg text-[#0e2d25] leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm flex-grow mb-4">
                  {article.excerpt}
                </p>
                <Link
                  to={`/blog/${article.id}`}
                  className="text-green-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Thoughts, Tips, Tools Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-[#0e2d25] mb-8">
          Thoughts, Tips, and Tools for Success
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? "bg-[#0e2d25] text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Articles */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-gray-500 text-sm flex items-center mb-2">
                  <span className="mr-2">📅</span> {article.date}
                </p>
                <h3 className="font-semibold text-lg text-[#0e2d25] leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm flex-grow mb-4">
                  {article.excerpt}
                </p>
                <Link
                  to={`/blog/${article.id}`}
                  className="text-green-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
}

