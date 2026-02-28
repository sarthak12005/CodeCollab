const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.patch('/', userController.editUser);
router.get('/stats', userController.getStats);

module.exports = router;