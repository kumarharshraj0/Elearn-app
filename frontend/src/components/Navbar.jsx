// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Import useAuth

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signout } = useAuth(); // Use user and signout from AuthContext

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[90%] bg-white shadow-lg rounded-full px-6 py-6 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-green-700">
          E-Learn
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              About Us
            </Link>
          </li>
          
          <li>
            <Link
              to="/courses"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              Courses
            </Link>
          </li>
          
          <li>
            <Link
              to="/blog"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              Blog
            </Link>
          </li>
          <li>
            {user ? (
              <>
                <Link
                  to="/account"
                  className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
                >
                  Account
                </Link>
                <button
                  onClick={signout}
                  className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition ml-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="flex flex-col items-center gap-4 mt-4 pb-4 md:hidden">
          <li>
            <Link
              to="/"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              About Us
            </Link>
          </li>
          
          <li>
            <Link
              to="/courses"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              Cart <span className="text-green-700 font-semibold">(0)</span>
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
            >
              Blog
            </Link>
          </li>
          <li>
            {user ? (
              <>
                <Link
                  to="/account"
                  className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
                >
                  Account
                </Link>
                <button
                  onClick={signout}
                  className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition ml-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="font-figtree font-semibold text-[18px] leading-[32px] text-[#001A10] hover:text-green-700 transition"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
