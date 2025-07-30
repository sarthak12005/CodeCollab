const mongoose = require('mongoose');

const codingQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    timeComplexity: {
        type: String,
        trim: true
    },
    spaceComplexity: {
        type: String,
        trim: true
    },
    acceptanceRate: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
    },
    companies: [{
        type: String,
        trim: true
    }],
    sampleInput: {
        type: String,
        trim: true
    },
    sampleOutput: {
        type: String,
        trim: true
    },
    explanation: {
        type: String,
        trim: true
    },
    constraints: [{
        type: String,
        trim: true
    }],
    testCases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        },
        isHidden: {
            type: Boolean,
            default: false
        }
    }],
    hints: [{
        type: String,
        trim: true
    }],
    solution: {
        approach: {
            type: String,
            trim: true
        },
        code: {
            type: String,
            trim: true
        },
        language: {
            type: String,
            default: 'javascript'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes for better query performance
codingQuestionSchema.index({ difficulty: 1 });
codingQuestionSchema.index({ category: 1 });
codingQuestionSchema.index({ tags: 1 });
codingQuestionSchema.index({ companies: 1 });
codingQuestionSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('CodingQuestion', codingQuestionSchema);
