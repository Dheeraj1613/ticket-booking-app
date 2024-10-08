const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Routes for user registration, login, OTP
router.post('/send-email-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/get-user', userController.getUser);

module.exports = router;
