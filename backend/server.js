// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");

// Database
const connectDB = require("./config/db");

// Routers
const authRouter = require("./routes/authrouter");

const adminCourseRouter = require("./routes/admincourserouter");
const lectureRouter = require("./routes/lecturerouter");
const paymentRouter = require("./routes/paymentrouter");
const adminRouter = require("./routes/adminrouter");
const instructorRoutes = require("./routes/instructorrouter");

// Controllers
const {
  getCourses,
  getCourseBySlug,
  getCourseById,
} = require("./controllers/coursecontrollers");

const {
  createCourseReview,
} = require("./controllers/reviewcontrollers");

// Middleware
const { protect } = require("./middleware/authmiddleware");

// Passport config
require("./config/passport");

const app = express();

/* ------------------- MIDDLEWARE ------------------- */
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

/* ------------------- HEALTH CHECK ------------------- */
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is working 🚀",
  });
});

/* ------------------- ROUTES ------------------- */
app.use("/api/auth", authRouter);

app.use("/api/admin/courses", adminCourseRouter);
app.use("/api/lectures", lectureRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/instructors", instructorRoutes);

/* ------------------- COURSE APIs ------------------- */
app.get("/api/courses", getCourses);
app.get("/api/courses/:slug", getCourseBySlug);
app.get("/api/courses/id/:id", getCourseById);
app.post("/api/courses/:id/reviews", protect, createCourseReview);

/* ------------------- ERROR HANDLER ------------------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ------------------- START SERVER ------------------- */
const PORT = process.env.PORT || 5000;

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

