const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    // Changed from ObjectId ref to User → plain String holding the Clerk userId
    // Clerk user IDs are strings like "user_2abc123..."
    user: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);