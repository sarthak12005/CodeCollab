const User = require('../models/user');
const Cloudinary = require('../config/Cloudinary');

exports.uploadProfilePicture = async (req, res) => {
    try {
        const { userId } = req.params;

        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Image not found" });
        }

        const result = await Cloudinary.uploader.upload(image, {
            folder: "user-profile"
        });

        if (!result) {
            return res.status(404).json({ message: "The error in Cloudinary image upload" });
        }

        const user = await User.findByIdAndUpdate(userId,
            { userImage: result.secure_url },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Image upload successfully", url: result.secure_url });

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error", error);
    }

}

exports.uploadImage = async (req, res) => {
  try {
    const { image, folder } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    const uploadResult = await Cloudinary.uploader.upload(image, {
      folder: folder || "uploads",
    });

    if (!uploadResult?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });

  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};