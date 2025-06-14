const express = require('express');
const userController = require('../controllers/userController');
const authMiddelware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/login', userController.loginUser);
router.post('/register', userController.signUpUser);
router.get('/getUser', authMiddelware, userController.getUser);
router.put('/editProfile', userController.editUser);


module.exports = router;