const express = require('express');
const router = express.Router();
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { body, param } = require('express-validator');

// Create a new category (admin only)
router.post(
  '/',
  protect,
  authorize(['admin']),
  body('name').notEmpty().withMessage('Name is required'),
  createCategory
);

// Get all categories
router.get('/', getCategories);

// Get a single category by ID
router.get('/:id', param('id').isMongoId().withMessage('Invalid category ID'), getCategoryById);

// Update a category (admin only)
router.put('/:id', protect, authorize(['admin']), updateCategory);

// Delete a category (admin only)
router.delete('/:id', protect, authorize(['admin']), deleteCategory);

module.exports = router;