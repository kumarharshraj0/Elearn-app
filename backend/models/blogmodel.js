const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "StackPath Team" },
    category: { type: String, required: true },
    img: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, default: "5 min read" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
