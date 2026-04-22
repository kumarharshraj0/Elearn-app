const express = require("express");
const router = express.Router();
const { getBlogs, getBlogById } = require("../controllers/blogcontroller");

router.get("/", getBlogs);
router.get("/:id", getBlogById);

module.exports = router;
