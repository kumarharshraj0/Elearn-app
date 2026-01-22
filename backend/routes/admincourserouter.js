const express = require('express');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/admincoursecontrollers');
const { protect, authorize } = require('../middleware/authmiddleware');
const upload = require('../middleware/uploadMiddleware'); // ✅ Import upload middleware

const router = express.Router();

// ✅ Admin routes (with image upload support)
router.route('/')
  .post(protect, authorize('admin'), upload.single('image'), createCourse) // handles multipart/form-data image upload
  .get(protect, authorize('admin'), getCourses);

router.route('/:id')
  .get(protect, authorize('admin'), getCourseById)
  .put(protect, authorize('admin'), upload.single('image'), updateCourse) // ✅ upload middleware for update
  .delete(protect, authorize('admin'), deleteCourse);

// ✅ Public route to view a course (no auth)
router.route('/id/:id')
  .get(getCourseById);

module.exports = router;
