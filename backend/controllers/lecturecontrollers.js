const asyncHandler = require('express-async-handler');
const Lecture = require('../models/lecturemodel');
const Course = require('../models/coursemodel');
const User = require('../models/usermodel'); // Import User model
const cloudinary = require('../config/cloudinary'); // Import cloudinary

/**
 * @desc    Get all lectures for a specific course
 * @route   GET /api/lectures/:courseId
 * @access  Private (Admin)
 */
const getLectures = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }

  const lectures = await Lecture.find({ course: courseId });

  const lecturesWithWatchedStatus = lectures.map((lecture) => {
    let isWatched = false;
    if (req.user) {
      const userWatchedCourse = req.user.watchedLectures.find(
        (wc) => wc.course.toString() === courseId
      );
      if (userWatchedCourse && userWatchedCourse.lectures.includes(lecture._id.toString())) {
        isWatched = true;
      }
    }
    return { ...lecture.toObject(), isWatched };
  });

  res.status(200).json({
    success: true,
    count: lecturesWithWatchedStatus.length,
    lectures: lecturesWithWatchedStatus,
    message:
      lecturesWithWatchedStatus.length === 0
        ? 'No lectures available for this course.'
        : undefined,
  });
});

/**
 * @desc    Get a single lecture by ID
 * @route   GET /api/lectures/:courseId/:id
 * @access  Private (Admin)
 */
const getLecture = asyncHandler(async (req, res) => {
  const { courseId, id } = req.params;

  const lecture = await Lecture.findOne({ _id: id, course: courseId });
  if (!lecture) {
    return res.status(404).json({ success: false, message: 'Lecture not found for this course' });
  }

  res.status(200).json({ success: true, lecture });
});

/**
 * @desc    Create a new lecture for a course
 * @route   POST /api/lectures/:courseId
 * @access  Private (Admin)
 */
const createLecture = asyncHandler(async (req, res) => {
  try {
    console.log('🟢 createLecture called');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const { title, description } = req.body;
    const { courseId } = req.params;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and description',
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    let videoUrl = '';
    let thumbnailUrl = '';

    if (req.files?.video?.[0]) {
      const videoFile = req.files.video[0];
      console.log('Uploading video file:', videoFile.path);
      const videoResult = await cloudinary.uploader.upload(videoFile.path, { resource_type: 'video' });
      videoUrl = videoResult.secure_url;
    }

    if (req.files?.thumbnail?.[0]) {
      const thumbnailFile = req.files.thumbnail[0];
      console.log('Uploading thumbnail file:', thumbnailFile.path);
      const thumbnailResult = await cloudinary.uploader.upload(thumbnailFile.path, { resource_type: 'image' });
      thumbnailUrl = thumbnailResult.secure_url;
    }

    const lecture = await Lecture.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: 'Lecture created successfully',
      lecture,
    });
  } catch (error) {
    console.error('❌ Error creating lecture:', error.message);
    console.error(error.stack);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to create lecture',
      error: error.message,
    });
  }
});

/**
 * @desc    Update an existing lecture
 * @route   PUT /api/lectures/:courseId/:id
 * @access  Private (Admin)
 */
const updateLecture = asyncHandler(async (req, res) => {
  try {
    const { courseId, id } = req.params;
    const { title, description } = req.body;

    console.log('🟡 Update Lecture Called');
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    console.log('Files:', req.files);

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and description',
      });
    }

    const lecture = await Lecture.findOne({ _id: id, course: courseId });
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: 'Lecture not found for this course',
      });
    }

    let videoUrl = lecture.videoUrl;
    let thumbnailUrl = lecture.thumbnailUrl;

    if (req.files?.video?.[0]) {
      const videoFile = req.files.video[0];
      console.log('Uploading new video:', videoFile.path);
      const videoResult = await cloudinary.uploader.upload(videoFile.path, { resource_type: 'video' });
      videoUrl = videoResult.secure_url;
    }

    if (req.files?.thumbnail?.[0]) {
      const thumbnailFile = req.files.thumbnail[0];
      console.log('Uploading new thumbnail:', thumbnailFile.path);
      const thumbnailResult = await cloudinary.uploader.upload(thumbnailFile.path, { resource_type: 'image' });
      thumbnailUrl = thumbnailResult.secure_url;
    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
      id,
      { title, description, videoUrl, thumbnailUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Lecture updated successfully',
      lecture: updatedLecture,
    });
  } catch (error) {
    console.error('❌ Error updating lecture:', error.message);
    console.error(error.stack);
    res.status(500).json({
      success: false,
      message: 'Server Error: Failed to update lecture',
      error: error.message,
    });
  }
});

/**
 * @desc    Delete a lecture
 * @route   DELETE /api/lectures/:courseId/:id
 * @access  Private (Admin)
 */
const deleteLecture = asyncHandler(async (req, res) => {
  const { courseId, id } = req.params;

  const lecture = await Lecture.findOne({ _id: id, course: courseId });
  if (!lecture) {
    return res.status(404).json({
      success: false,
      message: 'Lecture not found for this course',
    });
  }

  await lecture.deleteOne();

  res.status(200).json({
    success: true,
    id,
    message: 'Lecture deleted successfully',
  });
});

/**
 * @desc    Mark a lecture as watched
 * @route   PUT /api/lectures/:courseId/:id/watch
 * @access  Private (User)
 */
const markLectureAsWatched = asyncHandler(async (req, res) => {
  const { courseId, id: lectureId } = req.params;
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  let watchedCourse = user.watchedLectures.find(
    (wc) => wc.course.toString() === courseId
  );

  if (watchedCourse) {
    if (!watchedCourse.lectures.includes(lectureId)) {
      watchedCourse.lectures.push(lectureId);
    }
  } else {
    user.watchedLectures.push({ course: courseId, lectures: [lectureId] });
  }

  await user.save();

  res.status(200).json({ success: true, message: 'Lecture marked as watched' });
});

/**
 * @desc    Reset all lectures for a course to unwatched for a user
 * @route   PUT /api/lectures/:courseId/reset-progress
 * @access  Private (User)
 */
const resetCourseProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.watchedLectures = user.watchedLectures.filter(
    (wc) => wc.course.toString() !== courseId
  );

  await user.save();

  res.status(200).json({ success: true, message: 'Course progress reset successfully' });
});

module.exports = {
  getLectures,
  getLecture,
  createLecture,
  updateLecture,
  deleteLecture,
  markLectureAsWatched,
  resetCourseProgress,
};
