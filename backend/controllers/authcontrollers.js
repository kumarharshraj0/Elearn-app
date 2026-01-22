const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/usermodel");
const path = require('path'); // Import path module
const cloudinary = require("../config/cloudinary");

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage || null, // Include avatar in signup response
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// SIGNIN
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
       _id: existingUser._id, 
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        profileImage: existingUser.profileImage || null, // Include avatar in signin response
      },
    });
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "enrolledCourses",
      populate: {
        path: "instructor",
        model: "Instructor", // or "User" if instructors are stored in the User model
        select: "name bio experience profileImage",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    console.error("Get Enrolled Courses Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// @route   PUT /api/auth/profile-picture
// @desc    Upload profile picture for user
// @access  Private
const uploadProfilePicture = async (req, res) => {
  try {
    // 1️⃣ Find the logged-in user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Upload to Cloudinary if file exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      user.profileImage = result.secure_url; // update the user's profileImage
    } else {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 3️⃣ Save the user
    await user.save();

    // 4️⃣ Send response
    res.json({
      message: "Profile picture updated successfully",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};


// ADMIN CONTROLLERS
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, bio, experience, image, socials } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      bio,
      experience,
      image,
      socials,
    });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Create User Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Get User By ID Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password,  role } = req.body;
 const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Update text fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
   
    if (role) user.role = role;

    // ✅ Handle password update safely
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // ✅ Handle profile image update
    if (req.file) {
      // File uploaded → upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      user.profileImage = result.secure_url;
    } else if (req.body.profileImage) {
      // Direct URL provided → use it
      user.profileImage = req.body.profileImage;
    }

    // ✅ Save changes
    const updatedUser = await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
       
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Update User Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export all at the bottom (after definitions)
module.exports = {
  signup,
  signin,
  getEnrolledCourses,
  uploadProfilePicture, // Add uploadProfilePicture to exports
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
