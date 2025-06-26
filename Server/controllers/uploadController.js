const User = require('../models/user');
const Cloudinary = require('../config/Cloudinary');

exports.uploadProfilePicture = async (req, res) => {
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

}