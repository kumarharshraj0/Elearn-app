const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Instructor name is required"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "Instructor bio is required"],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, "Experience is required (e.g., '5 years')"],
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", instructorSchema);

