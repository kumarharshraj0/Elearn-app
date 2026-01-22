const asyncHandler = require("express-async-handler");
const Instructor = require("../models/instructormodel");
const cloudinary = require("../config/cloudinary");

// ✅ Get all instructors
const getInstructors = asyncHandler(async (req, res) => {
  const instructors = await Instructor.find();
  res.status(200).json({ success: true, instructors });
});

// ✅ Get single instructor
const getInstructorById = asyncHandler(async (req, res) => {
  const instructor = await Instructor.findById(req.params.id);
  if (!instructor) {
    return res.status(404).json({ success: false, message: "Instructor not found" });
  }
  res.status(200).json({ success: true, instructor });
});

// ✅ Create instructor
const createInstructor = asyncHandler(async (req, res) => {
  const { name, bio, experience } = req.body;

  if (!name || !bio || !experience) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  let profileImage = "";
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
    profileImage = result.secure_url;
  }

  const instructor = await Instructor.create({
    name,
    bio,
    experience,
    profileImage,
  });

  res.status(201).json({
    success: true,
    message: "Instructor created successfully",
    instructor,
  });
});

// ✅ Update instructor
const updateInstructor = asyncHandler(async (req, res) => {
  const { name, bio, experience } = req.body;
  const instructor = await Instructor.findById(req.params.id);

  if (!instructor) {
    return res.status(404).json({ success: false, message: "Instructor not found" });
  }

  let profileImage = instructor.profileImage;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
    profileImage = result.secure_url;
  }

  instructor.name = name || instructor.name;
  instructor.bio = bio || instructor.bio;
  instructor.experience = experience || instructor.experience;
  instructor.profileImage = profileImage;

  const updatedInstructor = await instructor.save();

  res.status(200).json({
    success: true,
    message: "Instructor updated successfully",
    instructor: updatedInstructor,
  });
});

// ✅ Delete instructor
const deleteInstructor = asyncHandler(async (req, res) => {
  const instructor = await Instructor.findById(req.params.id);
  if (!instructor) {
    return res.status(404).json({ success: false, message: "Instructor not found" });
  }

  await instructor.deleteOne();
  res.status(200).json({ success: true, message: "Instructor deleted successfully" });
});

module.exports = {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
};
