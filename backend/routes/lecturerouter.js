const express = require('express');
const router = express.Router();
const {
  getLectures,
  getLecture,
  createLecture,
  updateLecture,
  deleteLecture,
  uploadLectureFiles,
  markLectureAsWatched,
  resetCourseProgress,
} = require('../controllers/lecturecontrollers');

const { protect, authorize } = require('../middleware/authmiddleware');
const upload = require('../middleware/uploadMiddleware');

// ✅ Routes
router
  .route('/:courseId')
  .get(protect, getLectures)
  .post(
    upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
    protect,
    authorize('admin'),
    createLecture
  );

// ⚠️ Move this BEFORE `/:courseId/:id`
router.route('/:courseId/reset-progress').put(protect, resetCourseProgress);

// ✅ Then dynamic lecture routes
router
  .route('/:courseId/:id')
  .get(protect, authorize('admin'), getLecture)
  .put(
    upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
    protect,
    authorize('admin'),
    updateLecture
  )
  .delete(protect, authorize('admin'), deleteLecture);

router.route('/:courseId/:id/watch').put(protect, markLectureAsWatched);

module.exports = router;

