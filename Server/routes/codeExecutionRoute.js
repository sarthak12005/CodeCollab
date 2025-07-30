const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const codeExecutionController = require('../controllers/codeExecutionController');
const router = express.Router();

// Execute code
router.post('/execute', authMiddleware, codeExecutionController.executeCode);

// Test code with multiple test cases
router.post('/test', authMiddleware, codeExecutionController.testCode);

module.exports = router;
