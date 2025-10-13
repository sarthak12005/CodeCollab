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
  points: {
    type: Number,
    default: 0
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
  functionTemplates: {
    python: {
      type: String,
      default: ''
    },
    javascript: {
      type: String,
      default: ''
    },
    java: {
      type: String,
      default: ''
    },
    cpp: {
      type: String,
      default: ''
    },
    c: {
      type: String,
      default: ''
    }
  },
  isDailyProblem: {
    type: Boolean,
    default: false
  },
  dailyProblemDate: Date,
  solvedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);