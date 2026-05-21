const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      require: true,
    },
    publicId: {
      type: String,
      require: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

module.exports = Image;
