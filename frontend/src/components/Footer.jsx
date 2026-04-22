// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-white pt-24 pb-12 px-6 md:px-16 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-8">
          <BrandLogo light={true} />
          <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
            Empowering the next generation of creators and professionals through 
            industry-led education and practical skill-building.
          </p>
          
          <div className="flex items-center gap-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#6366F1] hover:text-white transition-all duration-300 hover:-translate-y-1 border border-slate-700/50"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-8">Platform</h3>
          <ul className="space-y-4">
            {["Home", "Courses", "Instructors", "Resources", "Membership"].map((item) => (
              <li key={item}>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors duration-300 font-medium">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-8">Resources</h3>
          <ul className="space-y-4">
            {["Documentation", "Help Center", "Blog", "Community", "FAQs"].map((item) => (
              <li key={item}>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors duration-300 font-medium">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-8">Company</h3>
          <ul className="space-y-4">
            {["About Us", "Careers", "Legal", "Privacy", "Security"].map((item) => (
              <li key={item}>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors duration-300 font-medium">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-8">Stay Updated</h3>
          <p className="text-slate-400 text-sm mb-6 font-medium">
            Get the latest updates delivered to your inbox.
          </p>
          <div className="relative group">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-3.5 px-5 text-sm focus:outline-none focus:border-[#6366F1] transition-all"
            />
            <button className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-[#6366F1] text-white rounded-xl text-xs font-semibold uppercase hover:bg-[#4F46E5] transition-colors">
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} StackPath. Built for the future of learning.
        </p>
        <div className="flex gap-8">
          <Link to="/" className="text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/" className="text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
