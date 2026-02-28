const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        // Accept both username and email for login
        const user = await User.findOne({ 
            $or: [{ username }, { email: username }] 
        }).select('+password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = generateToken(user._id, user.username, process.env.JWT_SECRET, process.env.JWT_EXPIRY);
        // console.log("User login successfull", token);

        const userResponse = {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            userImage: user.userImage,
            Verified: user.Verified,
            premium: user.premium
        };

        res.status(200).json({ message: "User login successful", token, user: userResponse });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.getUsers = async (req, res) => {
  try {
    // -----------------------------
    // 1. Extract & sanitize query params
    // -----------------------------
    let {
      page = 1,
      limit = 5,
      username,
      email,
      role,
      status,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1) page = 1;
    if (limit < 1 || limit > 100) limit = 10;

    const skip = (page - 1) * limit;

    // -----------------------------
    // 2. Base filter (soft delete)
    // -----------------------------
    const filter = {
    //   isDeleted: false,
    };

    // -----------------------------
    // 3. Apply allowed filters ONLY
    // -----------------------------
    if (username) {
      filter.username = { $regex: username, $options: "i" };
    }

    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }

    if (role && role !== "All") {
      filter.role = role;
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    // -----------------------------
    // 4. Fetch users + count
    // -----------------------------
    const [users, totalUsers] = await Promise.all([
      User.find(filter)
        .select("username email role status createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      User.countDocuments(filter),
    ]);

    // -----------------------------
    // 5. Send response
    // -----------------------------
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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
            password: hashPassword,
            role: "User"
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
    const { username, email,provider, userImage } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        provider,
        userImage: userImage,
        role: "User"
      });

      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "login successful",
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




