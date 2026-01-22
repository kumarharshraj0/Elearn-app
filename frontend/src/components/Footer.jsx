import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0D322C] text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand + Mission */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-lime-400">
            <span className="text-3xl">🎓</span> Tutomile
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Our mission is to provide accessible, affordable, and impactful
            learning, empowering learners to achieve goals with expert support.
          </p>

          {/* Social Icons */}
          <h3 className="mt-6 font-semibold">Follow us:</h3>
          <div className="flex items-center gap-4 mt-3">
            <a
              href="#"
              className="p-3 rounded-full bg-[#114239] hover:bg-lime-400 hover:text-black transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-[#114239] hover:bg-lime-400 hover:text-black transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-[#114239] hover:bg-lime-400 hover:text-black transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-[#114239] hover:bg-lime-400 hover:text-black transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-lime-400">Home</a></li>
            <li><a href="#" className="hover:text-lime-400">About Us</a></li>
            <li><a href="#" className="hover:text-lime-400">Courses</a></li>
            <li><a href="#" className="hover:text-lime-400">Blog</a></li>
            <li><a href="#" className="hover:text-lime-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-lime-400">FAQ</a></li>
            <li><a href="#" className="hover:text-lime-400">404</a></li>
            <li><a href="#" className="hover:text-lime-400">Style Guide</a></li>
            <li><a href="#" className="hover:text-lime-400">License</a></li>
            <li><a href="#" className="hover:text-lime-400">Change Log</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
          <p className="text-gray-300 mb-4">
            Stay updated on the latest courses, trends, and exclusive offers.
          </p>
          <div className="flex items-center bg-[#114239] rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-full bg-transparent outline-none text-white placeholder-gray-400"
            />
            <button className="px-6 py-3 bg-lime-400 text-black font-semibold hover:bg-lime-500 transition">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Tutomile. All rights reserved.
      </div>
    </footer>
  );
}
