const express = require('express');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const authMiddelware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/login', userController.loginUser);
router.post('/register', userController.signUpUser);
router.get('/getUser', authMiddelware, userController.getUser);
router.put('/editProfile', userController.editUser);
router.put('/change-picture/:userId',uploadController.uploadProfilePicture);
router.post('/addUser', userController.addUser);



module.exports = router;