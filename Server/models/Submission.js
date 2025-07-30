const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['javascript', 'python', 'java', 'cpp', 'c'],
    required: true
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded'],
    required: true
  },
  runtime: Number,
  memory: Number,
  testCasesPassed: {
    type: Number,
    required: true
  },
  totalTestCases: {
    type: Number,
    required: true
  },
  executionTime: {
    type: Number,
    default: 0
  },
  errorMessage: String,
  username: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);