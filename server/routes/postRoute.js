// Imports 
const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
const authorizePost = require('../middlewares/authorizePost');
const { body, param } = require('express-validator');

// Create a new post
router.post(
  '/',
  protect,
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
  createPost
);

// Get all posts
router.get('/', protect, getAllPosts);

// Get a single post by ID
router.get(
  '/:id',
  protect,
  param('id').isMongoId().withMessage('Invalid post ID'),
  getPostById
);

// Update a post by ID
router.put(
  '/:id',
  protect,
  authorizePost,
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  updatePost
);

// Delete a post by ID
router.delete(
  '/:id',
  protect,
  authorizePost,
  param('id').isMongoId().withMessage('Invalid post ID'),
  deletePost
);

module.exports = router;