const mongoose = require('mongoose');

const aptitudeQuestionSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        enum: ['Quantitative', 'Logical', 'Verbal', 'General Knowledge'],
        trim: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: [{
        type: String,
        required: true,
        trim: true
    }],
    correctAnswer: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    explanation: {
        type: String,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    company: {
        type: String,
        trim: true
    },
    year: {
        type: String
    },
    timeLimit: {
        type: Number,
        default: 60
    },
    tags: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes for better query performance
aptitudeQuestionSchema.index({ topic: 1 });
aptitudeQuestionSchema.index({ difficulty: 1 });
aptitudeQuestionSchema.index({ company: 1 });
aptitudeQuestionSchema.index({ tags: 1 });

module.exports = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
