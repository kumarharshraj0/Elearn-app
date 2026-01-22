// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

// DB
const connectDB = require("./config/db");

// Routes (placeholders if actual routes are missing)
const authRouter = require("./routes/authrouter") || require("./routes/placeholder");
const adminCourseRouter = require("./routes/admincourserouter") || require("./routes/placeholder");
const lectureRouter = require("./routes/lecturerouter") || require("./routes/placeholder");
const paymentRouter = require("./routes/paymentrouter") || require("./routes/placeholder");
const adminRouter = require("./routes/adminrouter") || require("./routes/placeholder");
const instructorRoutes = require("./routes/instructorroutes") || require("./routes/placeholder");

// Controllers (basic placeholders if missing)
const {
  getCourses = (req, res) => res.json({ courses: [] }),
  getCourseBySlug = (req, res) => res.json({ slug: req.params.slug }),
  getCourseById = (req, res) => res.json({ id: req.params.id }),
} = require("./controllers/coursecontrollers") || {};

const { createCourseReview = (req, res) => res.json({ message: "Review created" }) } =
  require("./controllers/reviewcontrollers") || {};

// Middleware
const { protect = (req, res, next) => next() } = require("./middleware/authmiddleware") || {};

// Passport
try {
  require("./config/passport");
} catch (err) {
  console.warn("⚠️  Passport config missing. Skipping...");
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Health check
app.get("/api/test", (req, res) =>
  res.status(200).json({ success: true, message: "Backend is working 🚀" })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/courses", adminCourseRouter);
app.use("/api/lectures", lectureRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/instructors", instructorRoutes);

// Course APIs
app.get("/api/courses", getCourses);
app.get("/api/courses/:slug", getCourseBySlug);
app.get("/api/courses/id/:id", getCourseById);
app.post("/api/courses/:id/reviews", protect, createCourseReview);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server AFTER DB connection
const PORT = process.env.PORT || 5000; // Render automatically provides PORT

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });

