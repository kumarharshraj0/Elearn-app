import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
        const res = await axios.get(`${baseUrl}/blogs/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-[#0F172A] flex flex-col justify-center items-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"
        />
        <span className="text-white font-semibold uppercase tracking-[0.3em] text-xs">Unfolding Story...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-white px-6 text-center">
        <h2 className="text-4xl font-semibold text-[#0F172A] mb-4">404</h2>
        <p className="text-slate-500 font-medium mb-8 text-xl text-balance">The insight you're looking for has moved or doesn't exist.</p>
        <Link to="/blog" className="bg-[#6366F1] text-white px-10 py-4 rounded-full font-semibold uppercase tracking-widest text-xs shadow-xl shadow-indigo-200">
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs font-semibold bg-indigo-50 text-[#6366F1] px-5 py-2 rounded-full uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              {article.date} • {article.readTime || "5 min read"}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold text-[#0F172A] leading-[1.1] tracking-tight mb-12"
          >
            {article.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] rounded-[48px] overflow-hidden shadow-2xl mb-16"
          >
            <img 
              src={article.img} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-xl prose-slate max-w-none"
          >
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-10 first-letter:text-7xl first-letter:font-semibold first-letter:text-[#6366F1] first-letter:mr-3 first-letter:float-left">
              {article.content}
            </p>
            
            {/* Extended dummy content for scroll */}
            <p className="text-lg text-slate-500 leading-relaxed mb-6">
              In the rapidly evolving landscape of modern education, staying ahead requires more than just access to information; it requires a structured path to mastery. At StackPath, we've observed that the most successful learners are those who blend technical proficiency with a mindset of continuous improvement.
            </p>
            
            <h2 className="text-3xl font-semibold text-[#0F172A] mt-12 mb-6">Breaking the Barriers</h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              One of the primary challenges identified in recent UX research is the overwhelming amount of choice. This article highlights why curated paths are becoming the standard for elite technical education. As we integrate more AI-driven features into our platform, our focus remains steadfast on the human element of learning. 
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-slate-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Written by</p>
                <p className="text-lg font-semibold text-[#0F172A]">{article.author || "StackPath Insights Team"}</p>
              </div>
            </div>
            
            <Link 
              to="/blog"
              className="group flex items-center gap-3 text-xs font-semibold text-[#0F172A] uppercase tracking-[0.2em] hover:text-[#6366F1] transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                ←
              </div>
              Back to Insights
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
