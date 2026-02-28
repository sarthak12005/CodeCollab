const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.patch('/:userId', userController.editUser);
router.get('/stats', userController.getStats);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUser);

module.exports = router;