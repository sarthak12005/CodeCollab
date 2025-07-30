const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Behavioral', 'Technical', 'System Design', 'HR', 'Case Study'],
        default: 'Behavioral'
    },
    year: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    answer: {
        type: String,
        trim: true
    },
    tips: [{
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
interviewQuestionSchema.index({ company: 1 });
interviewQuestionSchema.index({ category: 1 });
interviewQuestionSchema.index({ year: 1 });
interviewQuestionSchema.index({ difficulty: 1 });
interviewQuestionSchema.index({ tags: 1 });

module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);
