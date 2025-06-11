const express = require('express');
const userController = require('../controllers/userController');
const authMiddelware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/login', userController.loginUser);
router.post('/register', userController.signUpUser);
router.put('/editProfile', userController.editUser);


module.exports = router;