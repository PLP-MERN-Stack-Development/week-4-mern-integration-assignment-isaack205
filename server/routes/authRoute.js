// Imports
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { registerUser, loginUser, getProfile, updateProfile, deleteUser, getAllUsers } = require('../controllers/authController');
const { body } = require('express-validator');

// Register a new user
router.post(
  '/register',
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  registerUser
);

// Login
router.post(
  '/login',
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  loginUser
);

// Get current user profile
router.get('/me',protect, getProfile);

// Update current user profile
router.put('/me',protect, updateProfile);

// Delete current user profile
router.delete('/me',protect, deleteUser);

// (Admin only) Get all users
router.get('/users',protect, authorize(['admin']), getAllUsers);

router.delete('/users/:id',protect, authorize(['admin']), deleteUser);

module.exports = router;