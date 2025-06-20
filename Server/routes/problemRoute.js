const express = require('express');
const authMiddelware = require('../middleware/authMiddleware');
const problemController = require('../controllers/problemController');
const router = express.Router();

router.get('/get-problems',authMiddelware, problemController.getProblems);
router.post('/add-problem',authMiddelware,problemController.addProblem);

module.exports  = router;