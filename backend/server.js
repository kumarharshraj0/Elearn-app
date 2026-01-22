const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");

// DB
const connectDB = require("./config/db");

// Routes
const authRouter = require("./routes/authrouter");
const blogRouter = require("./routes/blogrouter");          // ✅ exact filename
const adminCourseRouter = require("./routes/admincourserouter");
const lectureRouter = require("./routes/lecturerouter");
const paymentRouter = require("./routes/paymentrouter");
const adminRouter = require("./routes/adminrouter");
const instructorRoutes = require("./routes/instructorroutes");

// Controllers
const {
  getCourses,
  getCourseBySlug,
  getCourseById,
} = require("./controllers/coursecontrollers");

const { createCourseReview } = require("./controllers/reviewcontrollers");

// Middleware
const { protect } = require("./middleware/authmiddleware");

// Passport config
require("./config/passport");

// Load env
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Health Check
app.get("/api/test", (req, res) => {
  res.status(200).json({ success: true, message: "Backend is working 🚀" });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);
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

// Global Error Handler (VERY IMPORTANT for Render)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
