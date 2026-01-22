const courses = [
  {
    id: 1,
    slug: "mastering-javascript",
    title: "Mastering JavaScript from Scratch",
    category: "Programming",
    image: "https://via.placeholder.com/600x350?text=JavaScript+Course",
    shortDesc: "Learn JavaScript with hands-on projects and expert guidance.",
    fullDesc:
      "This course covers JavaScript basics to advanced concepts including ES6, async programming, and real projects. You'll learn how to build interactive websites, use APIs, and write clean, efficient code for modern applications.",
    duration: "8 weeks",
    level: "Beginner to Advanced",
    instructor: "John Doe",
    instructorDetails: {
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=60",
      bio: "John is a senior JavaScript developer with over 9 years of experience working on front-end frameworks like React, Vue, and Angular. He has taught 15,000+ students worldwide through online and offline programs.",
      experience: "9+ years experience",
      socials: {
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
        website: "https://johndoedev.com",
      },
    },
    lessons: [
      "Introduction to JavaScript and Setup",
      "Understanding Variables and Data Types",
      "Functions, Loops, and Conditionals",
      "DOM Manipulation and Events",
      "ES6 Features and Modules",
      "Async Programming with Promises and Fetch API",
      "Final Project: Interactive Web App",
    ],
  },
  {
    id: 2,
    slug: "data-analytics-python",
    title: "Data Analytics with Python",
    category: "Data Analytics",
    image: "https://via.placeholder.com/600x350?text=Python+Analytics",
    shortDesc: "Analyze data like a pro with Python and visualization tools.",
    fullDesc:
      "Dive deep into Pandas, NumPy, Matplotlib, and Seaborn while working on real-world datasets. This course helps you understand data patterns, clean data, visualize trends, and create meaningful insights through analytics projects.",
    duration: "6 weeks",
    level: "Intermediate",
    instructor: "Jane Smith",
    instructorDetails: {
      name: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=60",
      bio: "Jane is a professional data analyst and machine learning enthusiast with over 7 years of experience in Python-based data analysis. She has mentored students in building strong analytical and visualization skills.",
      experience: "7+ years experience",
      socials: {
        linkedin: "https://linkedin.com/in/janesmith",
        twitter: "https://twitter.com/janesmith",
        website: "https://janesmithdata.com",
      },
    },
    lessons: [
      "Introduction to Data Analytics",
      "Data Cleaning and Preprocessing",
      "Exploratory Data Analysis (EDA)",
      "Visualization with Matplotlib and Seaborn",
      "Statistical Analysis with Pandas",
      "Building a Real-World Analytics Dashboard",
    ],
  },
];

export default courses;

