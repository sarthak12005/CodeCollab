const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (userId, secret, expiry) => {
    return jwt.sign({ id: userId, }, secret, { expiresIn: expiry });
}


exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Incorrect password");
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = generateToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRY);
        console.log("User login successfull", token);

        res.status(200).json({ message: "User login successful", token});
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.signUpUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required." });
        }

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
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const {userId} = req.user;

        if (!userId) {
            return res.status(400).json({message: "User id is required."});
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        res.status(200).json({message: "User retrieved successfully.", user});
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({message: "Internal Server Error", err});
    }
}

exports.editUser = async (req, res) => {
    try {
         const {userId} = req.user;
         
         if (!userId) {
             return res.status(401).json({message: "user id does not found "})
         }

     } catch (err) {
         
     }
}


