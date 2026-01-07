const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { RegisterZodSchema } = require('../validations/registerUser.zod');
const { ZodError } = require('zod');

const generateToken = (userId, username, secret, expiry) => {
    return jwt.sign({ id: userId, username: username }, secret, { expiresIn: expiry });
}


exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = generateToken(user._id, user.username, process.env.JWT_SECRET, process.env.JWT_EXPIRY);
        // console.log("User login successfull", token);

        res.status(200).json({ message: "User login successful", token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.signUpUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;


        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
       if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: err.errors 
            });
        }
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).json({ message: "User id is required." });
        }

        const user = await User.findById(userId)
            .select('-password')
            .populate('solveProblems');


        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User retrieved successfully.", user });
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ message: "Internal Server Error", err });
    }
}

exports.addUser = async (req, res) => {
    try {
        const { username, email, password, userImage } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required." });
        }

        // Check if user already exists
        let user = await User.findOne({ $or: [{ email }, { username }] });

        if (!user) {
            // Register new user
            const hashedPassword = await bcrypt.hash(password, 10);

            user = new User({
                username,
                email,
                password: hashedPassword,
                userImage: userImage || "https://example.com/default-avatar.png", // Default image if not provided
            });

            await user.save();
        } else {
            // Login existing user: check password match
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password." });
            }
        }

        // Generate token for both login & register
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            message: "User logged in successfully.",
            token,
        });

    } catch (error) {
        console.error("Error in addUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.editUser = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!userId) {
            return res.status(401).json({ message: "user id does not found " })
        }

        const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true }).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User updated successfully.", user });

    } catch (err) {
        console.error("Edit user error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}


exports.toogleFavorite = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { userId } = req.user;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isFavorite = user.userFavorites.includes(problemId);
        const favoirtes = user.userFavorites;

        if (isFavorite) {
            user.userFavorites = favoirtes.filter((id) => id !== problemId);
        } else {
            user.userFavorites.push(problemId);
        }

        await user.save();

        // ✅ Add a response back to the client
        res.status(200).json({
            message: isFavorite
                ? "Removed from favorites"
                : "Added to favorites",
            updatedFavorites: user.userFavorites
        });

    } catch (err) {
        res.status(500).json({ message: "internal server errro" });
    }
}




