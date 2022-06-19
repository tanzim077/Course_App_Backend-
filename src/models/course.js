const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
      trim: true,
    },
    steps: [{
        id: {
          type: Number,
        },
        step_number: {
          type: Number,
        },
        title: {
          type: String,
        },
        content: {
          type: String,
        },
      }],
    course_description: {
      type: String,
      required: true,
    },
    current_users: {
      type: Number,
    },
    terminal_type: {
      type: String,
    },
    yaml: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
