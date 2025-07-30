const express = require('express');
const authMiddelware = require('../middleware/authMiddleware');
const problemController = require('../controllers/problemController');
const submissionController = require('../controllers/submissionController');
const router = express.Router();

router.get('/get-problems',authMiddelware, problemController.getProblems);
router.post('/add-problem', authMiddelware, problemController.addProblem);
router.get('/delete-problem/:id', authMiddelware, problemController.deleteProblem);
router.get('/get-problem/:problemId', authMiddelware, problemController.getProblemById);

// Submission routes
router.post('/submission/submit', authMiddelware, submissionController.submitSolution);
router.get('/submissions/:problemId', authMiddelware, submissionController.getProblemSubmissions);


module.exports  = router;