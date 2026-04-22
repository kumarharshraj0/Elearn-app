import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

// Theme colors (same as login page)
const COLORS = {
  bgDark: "#0F172A",
  card: "#1E293B",
  accent: "#6366F1",
  ink: "#F8FAFC",
};

export default function AboutUs() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden py-8" style={{ backgroundColor: COLORS.bgDark }}>
      {/* HERO SECTION */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-35 md:py-48">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center font-semibold tracking-tight text-4xl md:text-6xl"
            style={{ color: COLORS.ink }}
          >
            Skills made simple,
            <br className="hidden md:block" />
            <span className="inline-block">Learning made accessible</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl text-center text-lg md:text-xl opacity-80"
            style={{ color: COLORS.ink }}
          >
            Discover knowledge, learn from experts, and achieve goals with engaging,
            live, and interactive learning experiences.
          </motion.p>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="w-full bg-white/95 min-h-[110vh]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:gap-14 md:py-24">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0f2f23]">Who we are</h2>
            <div className="mt-6 space-y-5 text-gray-700 text-lg leading-8">
              <p>
                At StackPath, we believe learning should be accessible to everyone. Our mission is to make
                skill development simple, flexible, and effective, empowering learners to achieve their goals on
                their own terms.
              </p>
              <p>
                With a wide range of courses and tools, we bring quality education to your fingertips—anytime,
                anywhere. Our name reflects our commitment to helping you take bold strides toward your educational
                goals.
              </p>
              <p>
                Whether you’re a working professional, a student, or a lifelong learner, we’re here to support your
                journey.
              </p>
            </div>

            <div className="mt-10">
             <Link 
             to= {`/Courses`}
                
                className="px-8 py-4 mt-[4vh] rounded-full bg-[#6366F1] text-white text-lg font-semibold hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20"
              >
                Explore Courses

                </Link>
              
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 flex items-center justify-center"
          >
            <img
              src="https://listwr.com/RbzibJ " // replace with your asset
              alt="Learner focused"
              className="w-full max-w-xl h-[80vh] rounded-3xl shadow-xl object-cover"
            />
          </motion.div>
        </div>
      </section>
       
            
            
            <Testimonials />
            <FAQ/>
            <CTA/>
            <Footer/>

    
    </div>
  );
}
