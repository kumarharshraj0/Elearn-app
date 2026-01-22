// backend/routes/blog.js
const express = require("express");
const router = express.Router();

// Dummy blog data (ye DB se aayega future me)
const blogs = [
  {
    id: 1,
    title: "Top strategies for staying focused while learning online",
    date: "Jan 05, 2025",
    img: "https://via.placeholder.com/400x250?text=Article+1",
    category: "Career Growth",
    excerpt:
      "Maintaining focus in an online environment can be challenging. This blog explores tips to stay productive...",
  },
  {
    id: 2,
    title: "Mastering skills anytime: The future of eLearning",
    date: "Jan 05, 2025",
    img: "https://via.placeholder.com/400x250?text=Article+2",
    category: "Technology & Innovation",
    excerpt:
      "Discover how eLearning platforms like Edumile are revolutionizing education and skill development...",
  },
  {
    id: 3,
    title: "Mastering skills anytime: The future of eLearning",
    date: "Jan 05, 2025",
    img: "https://via.placeholder.com/400x250?text=Article+2",
    category: "Technology & Innovation",
    excerpt:
      "Discover how eLearning platforms like Edumile are revolutionizing education and skill development...",
  },
  {
    id: 4,
    title: "Mastering skills anytime: The future of eLearning",
    date: "Jan 05, 2025",
    img: "https://via.placeholder.com/400x250?text=Article+2",
    category: "Technology & Innovation",
    excerpt:
      "Discover how eLearning platforms like Edumile are revolutionizing education and skill development...",
  },
];

// ✅ GET blogs API
router.get("/", (req, res) => {
  res.json(blogs);
});

module.exports = router;
