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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Problem',
        default: [],
    },
    userFavorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Problem',
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