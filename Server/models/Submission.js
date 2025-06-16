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
    enum: ['JavaScript', 'Python', 'Java', 'C++'],
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
  errorMessage: String
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);