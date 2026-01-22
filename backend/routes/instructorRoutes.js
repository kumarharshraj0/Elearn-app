const express = require("express");
const {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructorcontroller");

const upload = require('../middleware/uploadMiddleware');
const { protect, authorize } = require("../middleware/authmiddleware"); // assuming you already have this

const router = express.Router();

router
  .route("/")
  .get(getInstructors)
  .post(protect, authorize("admin"), upload.single("profileImage"), createInstructor);

router
  .route("/:id")
  .get(getInstructorById)
  .put(protect, authorize("admin"), upload.single("profileImage"), updateInstructor)
  .delete(protect, authorize("admin"), deleteInstructor);

module.exports = router;
