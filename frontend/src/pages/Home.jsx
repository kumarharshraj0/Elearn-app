// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Courses from "../components/Courses";



import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import CoursesSection from "../components/CoursesSection";

import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
  
      <Hero />
      
      <CoursesSection/>
      <WhyChooseUs/>
      <Courses />
      
      <Testimonials />
      <FAQ/>
      <CTA/>
      <Footer/>
     
    </>
  );
}
