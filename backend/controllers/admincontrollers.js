const User = require('../models/usermodel');
const Course = require('../models/coursemodel');
const Instructor = require('../models/instructormodel');
const asyncHandler = require('express-async-handler');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStudents = await User.countDocuments({ role: 'user' });
  const totalTeachers = await Instructor.countDocuments();
  const totalAdmins = await User.countDocuments({ role: 'admin' });
  const totalCourses = await Course.countDocuments();

  // Calculate total earnings based on enrolled courses
  const usersWithEnrolledCourses = await User.find({ 'enrolledCourses.0': { $exists: true } }).populate('enrolledCourses', 'price');

  let totalEarnings = 0;
  usersWithEnrolledCourses.forEach(user => {
    user.enrolledCourses.forEach(course => {
      if (course.price) {
        totalEarnings += course.price;
      }
    });
  });

  res.status(200).json({
    totalUsers,
    totalStudents,
    totalTeachers,
    totalAdmins,
    totalCourses,
    totalEarnings,
  });
});

module.exports = {
  getDashboardStats,
};