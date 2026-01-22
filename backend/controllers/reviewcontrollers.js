const asyncHandler = require('express-async-handler');
const Course = require('../models/coursemodel');
const User = require('../models/usermodel');

// @desc    Create new review
// @route   POST /api/courses/:id/reviews
// @access  Private
const createCourseReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;
  const userId = req.user._id;

  const course = await Course.findById(id);

  if (course) {
    // Check if user is enrolled in the course
    const user = await User.findById(userId);
    if (!user || !user.enrolledCourses.includes(id)) {
      res.status(401);
      throw new Error('You must be enrolled in this course to leave a review');
    }

    const alreadyReviewed = course.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Course already reviewed');
    }

    const review = {
      user: userId,
      rating: Number(rating),
      comment,
    };

    course.reviews.push(review);
    course.numReviews = course.reviews.length;
    course.rating =
      course.reviews.reduce((acc, item) => item.rating + acc, 0) /
      course.reviews.length;

    await course.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

module.exports = {
  createCourseReview,
};