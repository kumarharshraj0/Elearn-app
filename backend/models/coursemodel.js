const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Design', 'Marketing', 'Business', 'Photography', 'Music', 'Other'],
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/600x350?text=Course+Image',
  },
  videoUrl: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  shortDesc: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200,
  },
  fullDesc: {
    type: String,
    required: true,
    minlength: 50,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Beginner to Advanced'],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true,
  },
  instructorDetails: {
    name: { type: String, required: true },
    image: { type: String, default: 'https://via.placeholder.com/150?text=Instructor' },
    bio: { type: String, required: true },
    experience: { type: String, required: true },
    socials: {
      linkedin: { type: String },
      twitter: { type: String },
      website: { type: String },
    },
  },
  lessons: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        video: { type: String },
      },
    ],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  studentsEnrolled: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;