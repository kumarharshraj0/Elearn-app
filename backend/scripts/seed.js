const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Instructor = require("../models/instructormodel");
const Course = require("../models/coursemodel");
const Blog = require("../models/blogmodel");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedData = async () => {
  try {
    console.log("🚀 Starting Comprehensive Database Seed...");

    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // 2. Clear existing data
    console.log("🧹 Purging existing Courses, Instructors, and Blogs...");
    await Course.deleteMany({});
    await Instructor.deleteMany({});
    await Blog.deleteMany({});
    console.log("✨ Collections cleared.");

    // 3. Create Premium Instructors
    console.log("👥 Creating 5 Diverse Instructors...");
    
    const instructorsData = [
      {
        name: "Dr. Elena Vance",
        bio: "Senior UI/UX Researcher & Full Stack Architect with 12+ years of industry experience at top tech firms. Expert in React, Node.js, and Design Systems.",
        experience: "12+ Years",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      },
      {
        name: "Marcus Thorne",
        bio: "Former Wall Street analyst turned entrepreneur. Specializes in Business Strategy, Finance, and Scaling Startups. Over 15 years in venture capital.",
        experience: "15+ Years",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      },
      {
        name: "Sarah Jenkins",
        bio: "Digital Marketing Specialist and SEO Strategist. Helped 50+ brands grow their organic traffic by 400%. Certified HubSpot & Google Partner.",
        experience: "8+ Years",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
      },
      {
        name: "Kai Chen",
        bio: "Cybersecurity Expert and Cloud Architect. Certified Ethical Hacker (CEH) with a focus on AWS security and automated DevSecOps pipelines.",
        experience: "10+ Years",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      },
      {
        name: "Amara Okafor",
        bio: "Award-winning Creative Director and Visual Artist. Expert in Adobe Creative Suite, Brand Identity, and Digital Illustration for luxury brands.",
        experience: "9+ Years",
        profileImage: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=400",
      }
    ];

    const instructors = await Instructor.insertMany(instructorsData);
    console.log(`✅ ${instructors.length} Instructors Created.`);

    // 4. Helper for Course Creation
    const createCourseObj = (slug, title, category, image, shortDesc, fullDesc, duration, level, price, instructorIdx, lessons) => ({
      slug, title, category, image, shortDesc, fullDesc, duration, level, price,
      instructor: instructors[instructorIdx]._id,
      instructorDetails: {
        name: instructors[instructorIdx].name,
        bio: instructors[instructorIdx].bio,
        experience: instructors[instructorIdx].experience,
        image: instructors[instructorIdx].profileImage,
      },
      lessons: lessons || [
        { title: "Getting Started", description: "Foundational concepts and setup." },
        { title: "Advanced Techniques", description: "Deep dive into core mechanics." },
        { title: "Final Project", description: "Building a production-ready application." }
      ]
    });

    console.log("📚 Creating 19 Diverse Courses...");
    
    const courses = [
      // PROGRAMMING (Elena & Kai)
      createCourseObj(
        "mastering-react-19-nextjs", "Mastering React 19 & Next.js 15", "Programming",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        "Learn React 19 and build lightning-fast SaaS apps with Next.js 15.",
        "Comprehensive course covering Server Actions, Suspense, and the latest React 19 hooks.",
        "24 Hours", "Beginner to Advanced", 4999, 0
      ),
      createCourseObj(
        "ethical-hacking-cybersecurity", "Ethical Hacking & Cybersecurity", "Programming",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        "Master the art of penetration testing and network security.",
        "Learn everything from network sniffing to advanced privilege escalation. Certified Ethical Hacker curriculum.",
        "40 Hours", "Intermediate", 6999, 3
      ),
      createCourseObj(
        "python-for-data-analytics", "Python for Data Analytics Masterclass", "Programming",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "Analyze data like a pro using Pandas, Scikit-Learn, and Python.",
        "Learn how to manipulate large datasets and build predictive models using real-world financial data.",
        "30 Hours", "Beginner", 3999, 0
      ),
      createCourseObj(
        "aws-cloud-architect-pro", "AWS Certified Cloud Architect", "Programming",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        "Build scalable and resilient infrastructure on AWS.",
        "Master EC2, Lambda, S3, and RDS while preparing for the Solutions Architect certification.",
        "35 Hours", "Advanced", 7499, 3
      ),

      // DESIGN (Elena & Amara)
      createCourseObj(
        "premium-ui-ux-design", "Premium UI/UX Design Masterclass", "Design",
        "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
        "Master high-end interface design using Figma and Protopie.",
        "Pixel-perfect interfaces, user research, and interactive prototyping for luxury brands.",
        "18 Hours", "Intermediate", 3499, 4
      ),
      createCourseObj(
        "brand-identity-fundamentals", "Brand Identity & Visual Design", "Design",
        "https://images.unsplash.com/photo-1561070791-26c11d204a3d?auto=format&fit=crop&q=80&w=800",
        "Create memorable logos and brand systems that command attention.",
        "Theory of color, typography, and brand psychology applied to modern tech companies.",
        "12 Hours", "Beginner", 1999, 4
      ),
      createCourseObj(
        "motion-graphics-after-effects", "Motion Graphics with After Effects", "Design",
        "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800",
        "Bring your designs to life with smooth animations and VFX.",
        "From kinetic typography to complex character animation. The industry standard for motion.",
        "22 Hours", "Intermediate", 4499, 4
      ),

      // MARKETING (Sarah)
      createCourseObj(
        "modern-marketing-growth", "Modern Marketing & Growth Hacking", "Marketing",
        "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20a?auto=format&fit=crop&q=80&w=800",
        "Drive massive traffic and convert users with data-driven marketing.",
        "SEO, Social Media Marketing, Performance Ads, and Email Automation strategy.",
        "15 Hours", "Beginner", 2499, 2
      ),
      createCourseObj(
        "social-media-content-creation", "Social Media Content Strategy 2024", "Marketing",
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
        "Learn to create viral reels, TikToks, and ads that convert.",
        "Video editing, storytelling, and algorithm optimization for the current social landscape.",
        "10 Hours", "All Levels", 1499, 2
      ),

      // BUSINESS (Marcus)
      createCourseObj(
        "startup-scaling-blueprint", "The Startup Scaling Blueprint", "Business",
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
        "Move from MVP to Series A with proven business systems.",
        "Hiring, fundraising, operations, and leadership for first-time founders.",
        "20 Hours", "Advanced", 8999, 1
      ),
      createCourseObj(
        "financial-intelligence-founders", "Financial Intelligence for Founders", "Business",
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        "Master your P&L, balance sheets, and unit economics.",
        "Understand the numbers behind your business to make better investment decisions.",
        "14 Hours", "Intermediate", 3499, 1
      ),

      // PHOTOGRAPHY (Amara)
      createCourseObj(
        "professional-product-photography", "Professional Product Photography", "Photography",
        "https://images.unsplash.com/photo-1542038783-0ad18cc9a3cd?auto=format&fit=crop&q=80&w=800",
        "Capture stunning images for e-commerce and editorial use.",
        "Lighting setups, composition, and post-processing in Lightroom and Photoshop.",
        "16 Hours", "All Levels", 2999, 4
      ),
      createCourseObj(
        "street-photography-storytelling", "Street Photography & Storytelling", "Photography",
        "https://images.unsplash.com/photo-1551029170-a392b45070f8?auto=format&fit=crop&q=80&w=800",
        "Master light and moment in the urban environment.",
        "Candid photography techniques and building a cohesive photo essay.",
        "8 Hours", "Beginner", 999, 4
      ),

      // MUSIC (Other - we can assign to anyone or Marcus for Business of Music)
      createCourseObj(
        "music-production-ableton-live", "Music Production with Ableton Live", "Music",
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
        "Produce professional tracks from your bedroom studio.",
        "Beatmaking, mixing, mastering, and sound design using Ableton Live 12.",
        "26 Hours", "Intermediate", 4999, 1
      ),
      createCourseObj(
        "music-marketing-distribution", "The Business of Music & Streaming", "Music",
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800",
        "How to distribute and market your music in the streaming era.",
        "Spotify playlists, TikTok marketing, and distribution deals for independent artists.",
        "12 Hours", "Beginner", 1999, 1
      ),

      // MIXED ( Elena, Kai, Sarah)
      createCourseObj(
        "ai-integrations-developers", "AI Integrations for Developers", "Programming",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        "Build AI-powered apps using OpenAI and Pinecone.",
        "LlamaIndex, LangChain, and RAG architectures for modern LLM applications.",
        "18 Hours", "Advanced", 5999, 0
      ),
      createCourseObj(
        "full-stack-saas-blueprint-v2", "SaaS Blueprint: Build & Launch", "Programming",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        "Launch your propio SaaS from scratch with MERN & Stripe.",
        "Auth, Subscriptions, Multi-tenancy, and Cloud Deployment.",
        "32 Hours", "Advanced", 7999, 3
      ),
      createCourseObj(
        "no-code-saas-builder", "No-Code SaaS Builder Masterclass", "Business",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        "Build complex apps without writing a single line of code.",
        "Master Bubble.io and Airtable to launch products in weeks, not months.",
        "15 Hours", "Beginner", 2499, 1
      ),
      createCourseObj(
        "copywriting-high-conversion", "Copywriting for High Conversion", "Marketing",
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
        "Write words that sell products and drive action.",
        "Landing page copy, email sequences, and ad copy psychology.",
        "9 Hours", "All Levels", 1299, 2
      )
    ];

    await Course.insertMany(courses);
    console.log(`✅ ${courses.length} Courses Created`);

    // 5. Create Premium Blogs
    console.log("📝 Creating High-End Dummy Blogs...");
    const blogsData = [
      {
        title: "The Future of AI in Modern Education",
        excerpt: "Discover how large language models and adaptive learning are reshaping the classroom of 2024.",
        content: "Artificial Intelligence is no longer a futuristic concept. In this deep dive, we explore how StackPath is integrating AI to personalize learning paths for every student...",
        category: "Technology & Innovation",
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        date: "April 15, 2024",
        readTime: "8 min read"
      },
      {
        title: "10 Tips for Landing Your First UX Design Job",
        excerpt: "Building a portfolio that stands out in a competitive market requires more than just good visuals.",
        content: "Landing a job in UX design today requires a mix of storytelling, user research, and technical proficiency. Our lead designers share their top secrets...",
        category: "Career Growth",
        img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
        date: "April 12, 2024",
        readTime: "6 min read"
      },
      {
        title: "Why Full-Stack Development is Still the #1 Choice",
        excerpt: "The demand for developers who can handle both front and back end continues to soar in 2024.",
        content: "In a world of specialized roles, the versatility of a full-stack developer is unmatched. We analyze market trends and salary data for StackPath members...",
        category: "Development",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        date: "April 10, 2024",
        readTime: "5 min read"
      },
      {
        title: "Mastering the Art of Remote Productivity",
        excerpt: "How to stay focused and avoid burnout while learning and working from home.",
        content: "Learning from home offers freedom, but requires discipline. These proven strategies will help you maintain a high level of productivity...",
        category: "Tips & Strategies",
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        date: "April 08, 2024",
        readTime: "7 min read"
      },
      {
        title: "The Rise of No-Code and Low-Code Solutions",
        excerpt: "Is the era of traditional coding coming to an end? We look at the data.",
        content: "No-code tools are empowering non-technical founders to build MVPs in record time. We discuss the synergy between coding and no-code at StackPath...",
        category: "Technology & Innovation",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        date: "April 05, 2024",
        readTime: "10 min read"
      },
      {
        title: "Effective SEO Strategies for 2024",
        excerpt: "Google's algorithms are changing faster than ever. Here's how to keep up.",
        content: "Search Engine Optimization is no longer about keyword stuffing. It's about user intent and content quality. Sarah Jenkins shares her latest insights...",
        category: "Marketing",
        img: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20a?auto=format&fit=crop&q=80&w=800",
        date: "April 02, 2024",
        readTime: "9 min read"
      }
    ];

    await Blog.insertMany(blogsData);
    console.log(`✅ ${blogsData.length} Blogs Created`);

    console.log("🎉 Database Seeded Successfully with 5 Instructors, 19 Courses, and 6 Blogs!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Failed:", error.message);
    process.exit(1);
  }
};

seedData();
