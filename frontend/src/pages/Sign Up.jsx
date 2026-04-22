import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Import useAuth
import BrandLogo from "../components/BrandLogo";

export default function Signup() {
  const { signup } = useAuth(); // Use the signup function from AuthContext

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formdata.name, formdata.email, formdata.password); // Use signup from context
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Left Section - Image */}
      <div className="hidden md:flex w-1/2 mt-[7vh] px-6 bg-[#0F172A]">
        <img
          src="https://img.freepik.com/premium-photo/smiling-young-asian-man-headphones-talking-colleagues-video-call-using-laptop-online-meeting_7861-3199.jpg"
          alt="Learning"
          className="w-full h-full rounded-3xl object-cover "
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 bg-[#0F172A] flex items-center justify-center p-10">
        <div className="w-full max-w-md space-y-6 text-white">
          {/* Logo */}
          <div className="mb-4">
            <BrandLogo light={true} />
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-semibold font-figtree">Create an account</h2>
          <p className="text-gray-300">
            Let’s get started with your 30 day free trial.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formdata.name}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-full bg-slate-800/50 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formdata.email}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-full bg-slate-800/50 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formdata.password}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-full bg-slate-800/50 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#6366F1] text-white font-figtree font-semibold rounded-full hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20"
            >
              Sign up Now
            </button>
            {/* Sign In link */}
            <p className="text-gray-300 text-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-[#6366F1] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <hr className="flex-1 border-gray-600" />
            <span className="text-gray-400">OR</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition border border-slate-700">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition border border-slate-700">
              <img
                src="https://www.svgrepo.com/show/349553/facebook.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
