const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/auth.controller');
const uploadController = require('../controllers/uploadController');
const authMiddelware = require('../middleware/authMiddleware');
const User = require('../models/user');
const router = express.Router();


router.post('/login', authController.loginUser);
router.post('/register', authController.signUpUser);
router.post('/reset-password', authController.resetPassword);
router.get('/getUser', authMiddelware, userController.getUser);
router.put('/editProfile', authMiddelware, userController.editProfile);
router.put('/change-picture/:userId',uploadController.uploadProfilePicture);
router.post('/upload-image', uploadController.uploadImage)
router.post('/addUser', userController.addUser);
router.post('/favorite/:problemId', authMiddelware, userController.toogleFavorite);

// GET /api/codecollab/user/stats - Get user statistics
router.get('/user/stats', authMiddelware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('solveProblems');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const solvedProblems = user.solveProblems || [];
        const totalSolved = solvedProblems.length;

        // Count by difficulty
        const easyCount = solvedProblems.filter(p => p.difficulty === 'Easy').length;
        const mediumCount = solvedProblems.filter(p => p.difficulty === 'Medium').length;
        const hardCount = solvedProblems.filter(p => p.difficulty === 'Hard').length;

        // Calculate acceptance rate (rough estimate)
        const totalSubmissions = totalSolved * 1.5;
        const acceptanceRate = totalSolved > 0 ? Math.round((totalSolved / totalSubmissions) * 100) : 0;

        const stats = {
            problemsSolved: totalSolved,
            totalSubmissions: Math.round(totalSubmissions),
            acceptanceRate,
            currentStreak: user.currentStreak || 0,
            maxStreak: user.maxStreak || 0,
            ranking: user.ranking || Math.floor(Math.random() * 10000) + 1000,
            contestsParticipated: user.contestsParticipated || 0,
            badges: user.badges || 0,
            easyProblems: easyCount,
            mediumProblems: mediumCount,
            hardProblems: hardCount,
            recentActivity: solvedProblems.slice(-5).reverse().map(problem => ({
                id: problem._id,
                title: problem.title,
                difficulty: problem.difficulty,
                solvedAt: problem.solvedAt || new Date()
            }))
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user statistics',
            error: error.message
        });
    }
});

module.exports = router;