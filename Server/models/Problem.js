const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  companies: {
    type: [String],
    default: []
  },
  acceptanceRate: {
    type: Number,
    default: 0
  },
  constraints: {
    type: [String],
    default: []
  },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  testCases: [{
    input: String,
    output: String
  }],
  hints: {
    type: [String],
    default: []
  },
  solvedBy: {
    type: [String],
    default: []
  },
  solution: String,
  isDailyProblem: {
    type: Boolean,
    default: false
  },
  dailyProblemDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);