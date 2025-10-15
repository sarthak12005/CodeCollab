const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String, // e.g., URL or icon name (like "🔥", "🏅", etc.)
      default: "",
    },
    minPoints: {
      type: Number,
      required: true, // Points required to unlock this badge
    },
    color: {
      type: String,
      default: "#FFD700", // default gold color
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Badge", badgeSchema);
