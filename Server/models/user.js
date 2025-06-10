const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
        default: ""
    },
    userActivity: {
        type: [String],
        default: [],
    },
    solveProblems: {
        type: [String],
        default: [],
    },
    userFavorites: {
        type: [String],
        default: [],
    },
    Verified: {
        type: Boolean,
        default: false,
    },
    premium: {
        type: Boolean,
        default: false,
    }

});


const User = mongoose.model('User', userSchema);

module.exports = User;