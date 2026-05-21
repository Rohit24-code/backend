const cloudinaryConfig = require("../config/image.config");

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinaryConfig.uploader.upload(imagePath, options);

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadImage;
