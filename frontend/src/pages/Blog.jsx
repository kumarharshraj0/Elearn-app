// src/pages/Blog.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All Posts",
    "Career Growth",
    "Technology & Innovation",
    "Tips & Strategies",
    "Development",
    "Marketing"
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
        const res = await axios.get(`${baseUrl}/blogs`);
        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles =
    activeCategory === "All Posts"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const remainingArticles = articles.length > 1 ? filteredArticles.filter(a => a._id !== featuredArticle._id) : filteredArticles;

  if (loading) {
    return (
      <div className="h-screen bg-[#0F172A] flex flex-col justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"
        />
        <span className=" mx-auto mt-6 max-w-3xl text-center text-lg md:text-xl opacity-80 ">Loading Knowledge...</span>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0F172A] relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6366F1] font-semibold uppercase tracking-[0.4em] text-xs mb-6 text-center"
          >
            StackPath Insights
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold text-white text-center leading-[1.1] tracking-tight mb-12"
          >
            Explore <br/> <span className="text-[#6366F1]">Knowledge.</span>
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 0.3 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${activeCategory === cat
                  ? "bg-[#6366F1] text-white shadow-[0_15px_30px_-5px_rgba(99,102,241,0.4)]"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredArticle && activeCategory === "All Posts" && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative grid lg:grid-cols-2 gap-12 items-center bg-slate-50 rounded-[48px] overflow-hidden p-8 md:p-12 hover:shadow-2xl transition-all duration-700 border border-slate-100"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl">
                <img
                  src={featuredArticle.img}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl text-[#6366F1] text-xs font-semibold uppercase tracking-widest shadow-lg">
                  Featured Article
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-semibold bg-indigo-100 text-[#6366F1] px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {featuredArticle.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    {featuredArticle.date} • {featuredArticle.readTime}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold text-[#0F172A] mb-6 leading-tight group-hover:text-[#6366F1] transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-lg text-slate-500 font-medium mb-8 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <Link
                  to={`/blog/${featuredArticle._id}`}
                  className="inline-flex items-center gap-3 text-[#0F172A] font-semibold uppercase tracking-[0.2em] text-sm group-hover:gap-5 transition-all"
                >
                  Start Reading <span className="text-[#6366F1] text-2xl">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {remainingArticles.map((article, i) => (
                <motion.div
                  key={article._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col bg-white border border-slate-100 rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-500 h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[#6366F1] text-[10px] font-semibold uppercase tracking-widest">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                      {article.date} • {article.readTime}
                    </div>
                    <h3 className="text-xl font-semibold text-[#0F172A] mb-4 group-hover:text-[#6366F1] transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium mb-8 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <Link
                      to={`/blog/${article._id}`}
                      className="mt-auto text-[#0F172A] font-semibold flex items-center gap-2 group/btn"
                    >
                      <span className="text-xs uppercase tracking-widest">Read More</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-[#6366F1] group-hover/btn:text-white transition-all">
                        →
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}

