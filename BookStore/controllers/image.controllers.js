const uploadImage = require("../helpers/image.helper");
const Image = require("../models/image.model");
const fs = require("fs");
const path = require("path");

const imageController = async (req, res) => {
  const file = req.file.path;

  try {
    const imageDetails = await uploadImage(file);

    let NewImage = await Image.create({
      url: imageDetails.url,
      publicId: imageDetails.public_id,
      createdBy: req.user._id,
    });

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return res.status(200).json({
      message: "image uploaded successfully",
      NewImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = imageController;
