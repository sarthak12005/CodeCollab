const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "User",
        enum: ["User", "Admin"]
    },
    status: {
        type: String,
        default: "INACTIVE",
        enum: ["ACTIVE", "INACTIVE"]
    },
    userImage: {
        type: String,
        default: ""
    },
    provider: {
        type: String,
        enum: ["google", "github", "local"],
        default: "local",
    },
    userActivity: {
        type: [String],
        default: [],
    },
    solveProblems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Problem',
        default: [],
    },
    userFavorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Problem',
        default: [],
    },
    rank: {
        points: { type: Number, default: 0 },
        badge: {
            type: String,
            default: "Bronze",
        }
    },
    Verified: {
        type: Boolean,
        default: false,
    },
    premium: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    lastLoginAt: {
        type: Date,
        default: null,
    },
    resetPasswordToken: {
        type: String,
        default: ""
    },
    resetPasswordExpiry: {
        type: Date,
        default: new Date()
    }

}, {
    timestamps: true
});

userSchema.index(
    { email: 1, isDeleted: 1 },
    {
        unique: true,
        partialFilterExpression: { isDeleted: false }
    }
);


const User = mongoose.model('User', userSchema);

module.exports = User;