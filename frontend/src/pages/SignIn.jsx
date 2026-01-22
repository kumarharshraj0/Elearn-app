import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from '../context/AuthContext'; // Import useAuth

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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0c2e25] text-white">
      {/* Left Section - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 flex items-center justify-center p-6 bg-[#0a241d]"
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
        className="md:w-1/2 flex items-center justify-center p-6 bg-[#0c2e25]"
      >
        <div className="w-full max-w-md space-y-6 bg-[#10372b] p-8 rounded-2xl shadow-2xl">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center"
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
                className="w-full px-4 py-3 rounded-full bg-[#0a241d] border border-[#1b4d3e] focus:outline-none focus:ring-2 focus:ring-[#b3ff00]"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <input
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-full bg-[#0a241d] border border-[#1b4d3e] focus:outline-none focus:ring-2 focus:ring-[#b3ff00]"
              />
            </motion.div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-[#b3ff00] bg-[#0a241d] border-[#1b4d3e]" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-[#b3ff00] hover:underline">
                Forgot Password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-full bg-[#b3ff00] text-black font-semibold hover:bg-lime-400 transition"
            >
              Sign in Now
            </motion.button>

            <p className="text-center text-sm">
              Don’t have an account? {" "}
              <Link to ={"/signup"}
              className="text-[#b3ff00] hover:underline">
                Create an Account
              </Link>
            </p>
          </form>

          {/* Social Login */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <motion.button onClick={()=>window.open("http://localhost:5000/api/auth/google", "_self")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#0a241d] border border-[#1b4d3e] hover:bg-[#134d39]"
            >
              <FaGoogle /> <span>Google</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#0a241d] border border-[#1b4d3e] hover:bg-[#134d39]"
            >
              <FaFacebookF /> <span>Facebook</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
