const Course = require('../models/coursemodel');
const Instructor = require('../models/instructormodel');
const User = require('../models/usermodel'); // Import User model
const Lecture = require('../models/lecturemodel'); // Import Lecture model

// @desc    Get all courses (public)
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate('instructor', 'name bio experience profileImage')
      .populate({
        path: 'reviews.user',
        select: 'name',
      });
    res.json(courses);
  } catch (error) {
   
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single course by slug (public)
// @route   GET /api/courses/:slug
// @access  Public
const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('instructor', 'name bio experience profileImage')
      .populate('lessons', 'title description videoUrl thumbnailUrl')
      .populate({
        path: 'reviews.user',
        select: 'name',
      });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single course by ID (public)
// @route   GET /api/courses/id/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name bio experience profileImage')
      .populate('lessons', 'title description videoUrl thumbnailUrl')
      .populate({
        path: 'reviews.user',
        select: 'name',
      });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    
    res.status(500).json({ message: 'Server Error' });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate({
        path: "enrolledCourses",
        model: "Course",
        select: "title image duration lessons",
        populate: [
          {
            path: "lessons", // Populate lessons within each course
            model: "Lecture",
            select: "_id", // Only need _id to count total lectures
          },
          {
            path: "instructor", // Populate instructor details
            model: "Instructor",
            select: "name bio experience profileImage",
          },
        ],
      })
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let courses = user.enrolledCourses || [];

    // Calculate progress for each enrolled course
    courses = await Promise.all(
      courses.map(async (course) => {
        const totalLectures = course.lessons ? course.lessons.length : 0;
        const watchedLecturesForCourse = user.watchedLectures.find(
          (wl) => wl.course.toString() === course._id.toString()
        );

        const watchedCount = watchedLecturesForCourse
          ? watchedLecturesForCourse.lectures.length
          : 0;

        const progress =
          totalLectures > 0 ? (watchedCount / totalLectures) * 100 : 0;

        return { ...course, progress: parseFloat(progress.toFixed(2)) };
      })
    );

    return res.status(200).json(courses);
  } catch (error) {
  
    return res.status(500).json({ message: "Server error fetching courses" });
  }
};



module.exports = {
  getCourses,
  getCourseBySlug,
  getCourseById,
  getEnrolledCourses
};