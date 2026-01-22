const Course = require("../models/coursemodel");
const cloudinary = require("../config/cloudinary"); // use your config file

/**
 * @desc Create a new course
 * @route POST /api/admin/courses
 * @access Private/Admin
 */
const createCourse = async (req, res) => {
  try {
    const {
      slug,
      title,
      category,
      shortDesc,
      fullDesc,
      duration,
      level,
      instructor,
      price,
    } = req.body;

    // ✅ Parse lessons from string (FormData sends them as JSON string)
    let lessons = [];
    if (req.body.lessons) {
      try {
        lessons = JSON.parse(req.body.lessons);
      } catch (err) {
        return res.status(400).json({ message: "Invalid lessons format" });
      }
    }

    // ✅ Upload thumbnail image (if provided)
    let imageUrl = null;
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "course_thumbnails",
      });
      imageUrl = uploadRes.secure_url;
    }

    // ✅ Validation
    if (!title || !slug || !category || !shortDesc || !fullDesc || !instructor) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // ✅ Create course
    const newCourse = new Course({
      slug,
      title,
      category,
      shortDesc,
      fullDesc,
      duration,
      level,
      instructor,
      price,
      image: imageUrl,
      lessons,
    });

    const savedCourse = await newCourse.save();
    return res.status(201).json({ success: true, course: savedCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Get all courses
 * @route GET /api/admin/courses
 * @access Private/Admin
 */
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Get single course by ID
 * @route GET /api/admin/courses/:id
 * @access Private/Admin
 */
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Update an existing course
 * @route PUT /api/admin/courses/:id
 * @access Private/Admin
 */
const updateCourse = async (req, res) => {
  try {
    const {
      slug,
      title,
      category,
      shortDesc,
      fullDesc,
      duration,
      level,
      instructor,
      price,
    } = req.body;

    let lessons = [];
    if (req.body.lessons) {
      try {
        lessons = JSON.parse(req.body.lessons);
      } catch (err) {
        return res.status(400).json({ message: "Invalid lessons format" });
      }
    }

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // ✅ Handle image re-upload
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "course_thumbnails",
      });
      course.image = uploadRes.secure_url;
    }

    // ✅ Update fields
    if (slug) course.slug = slug;
    if (title) course.title = title;
    if (category) course.category = category;
    if (shortDesc) course.shortDesc = shortDesc;
    if (fullDesc) course.fullDesc = fullDesc;
    if (duration) course.duration = duration;
    if (level) course.level = level;
    if (instructor) course.instructor = instructor;
    if (price) course.price = price;
    if (lessons) course.lessons = lessons;

    const updatedCourse = await course.save();
    return res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Delete a course
 * @route DELETE /api/admin/courses/:id
 * @access Private/Admin
 */
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.deleteOne();
    return res.status(200).json({ success: true, message: "Course deleted" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

