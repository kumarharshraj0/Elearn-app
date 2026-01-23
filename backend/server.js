const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const connection = require("./config/db.js");
const authrouter = require(path.join(__dirname, "./routes/authrouter.js")); // Import router
const blogRouter = require(path.join(__dirname, "./routes/blogrouter.js"));
const adminCourseRouter = require(path.join(__dirname, "./routes/admincourserouter.js"));
const lectureRouter = require(path.join(__dirname, "./routes/lecturerouter.js"));
const paymentRouter = require(path.join(__dirname, "./routes/paymentrouter.js"));
const adminRouter = require(path.join(__dirname, "./routes/adminrouter.js"));
const instructorRoutes = require("./routes/instructorrouter.js");
const { getCourses, getCourseBySlug, getCourseById } = require("./controllers/coursecontrollers.js");
const { createCourseReview } = require("./controllers/reviewcontrollers.js"); // Import review controller
const { protect } = require('./middleware/authmiddleware'); // Import protect middleware
require("./config/passport");

// .env config load
dotenv.config();

const app = express();
connection();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// ✅ Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

// ✅ Use Auth Routes
app.use("/api/auth", authrouter);  // 👈 yaha authrouter pass karo
app.use("/api/blogs", blogRouter);
app.use("/api/admin/courses", adminCourseRouter);
app.use("/api/lectures", lectureRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);

// Course Routes
app.get("/api/courses", getCourses);
app.get("/api/courses/:slug", getCourseBySlug);
app.get("/api/courses/id/:id", getCourseById);
app.post("/api/courses/:id/reviews", protect, createCourseReview); // Add review route
app.use("/api/instructors", instructorRoutes);

const PORT = process.env.PORT || 5001; // Changed port to 5001 to avoid EADDRINUSE
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});


