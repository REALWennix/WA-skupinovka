const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/authMiddleware');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/profile', isAuthenticated, authController.profile);

router.post('/logout', authController.logout);

module.exports = router;
