import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from '../context/AuthContext'; // Import useAuth
import BrandLogo from "../components/BrandLogo";

export default function SignIn() {
  const { signin } = useAuth();
  const {user} = useAuth();
  // Use the signin function from AuthContext

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signin(formdata.email, formdata.password); // Use signin from context
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0F172A] text-white">
      {/* Left Section - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 flex items-center justify-center p-6 bg-[#020617]"
      >
        <img
          src="https://images.unsplash.com/photo-1581091215367-59ab6b62d25a" // Replace with your own image
          alt="login"
          className="rounded-2xl shadow-lg w-full max-w-lg"
        />
      </motion.div>

      {/* Right Section - Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 flex items-center justify-center p-6 bg-[#0F172A]"
      >
        <div className="w-full max-w-md space-y-6 bg-slate-800/80 p-8 rounded-2xl shadow-2xl border border-slate-700">
          <div className="flex justify-center mb-4">
             <BrandLogo light={true} />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-semibold text-center"
          >
            Login to your account
          </motion.h2>
          <p className="text-center text-gray-400">
            Welcome back! Select method to log in
          </p>

          {/* Form */}
          <form  onSubmit={handleSubmit}     className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-full bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <input
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-full bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </motion.div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-[#6366F1] bg-slate-900 border-slate-700" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-[#6366F1] hover:underline">
                Forgot Password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-full bg-[#6366F1] text-white font-semibold hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20"
            >
              Sign in Now
            </motion.button>

            <p className="text-center text-sm">
              Don’t have an account? {" "}
              <Link to ={"/signup"}
              className="text-[#6366F1] hover:underline font-semibold">
                Create an Account
              </Link>
            </p>
          </form>

          {/* Social Login */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <motion.button onClick={()=>window.open("https://elearn.hharshportfolio.com/api/auth/google", "_self")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800"
            >
              <FaGoogle /> <span>Google</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800"
            >
              <FaFacebookF /> <span>Facebook</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
