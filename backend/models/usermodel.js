const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      
    },
    password: {
      type: String,
      
      minlength: 6,
    },
    ProfileImage: {
      type: String,
      default: '/uploads/default-avatar.png', // Default avatar path
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    googleId: { type: String},
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    watchedLectures: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
        },
        lectures: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture',
          },
        ],
      },
    ],
  },
  { timestamps: true } // createdAt, updatedAt auto generate honge
);

const User = mongoose.model("User", userSchema);

module.exports = User;
