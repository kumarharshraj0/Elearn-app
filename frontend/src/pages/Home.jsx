// src/pages/Home.jsx
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import CategoryGrid from "../components/CategoryGrid";
import StatsImpact from "../components/StatsImpact";
import CoursesSection from "../components/CoursesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import InstructorSpotlight from "../components/InstructorSpotlight";
import Testimonials from "../components/Testimonials";
import NewsletterHero from "../components/NewsletterHero";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const SectionWrapper = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      
      <SectionWrapper>
        <TrustedBy />
      </SectionWrapper>

      <SectionWrapper>
        <CategoryGrid />
      </SectionWrapper>

      <SectionWrapper>
        <StatsImpact />
      </SectionWrapper>
      
      <SectionWrapper id="featured-courses">
        <CoursesSection />
      </SectionWrapper>

      <SectionWrapper>
        <WhyChooseUs />
      </SectionWrapper>

      <SectionWrapper>
        <InstructorSpotlight />
      </SectionWrapper>

      <SectionWrapper>
        <Testimonials />
      </SectionWrapper>

      <SectionWrapper>
        <NewsletterHero />
      </SectionWrapper>

      <SectionWrapper>
        <FAQ />
      </SectionWrapper>

      <SectionWrapper>
        <CTA />
      </SectionWrapper>

      <Footer />
    </div>
  );
}
