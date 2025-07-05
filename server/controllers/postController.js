// Imports
const Post = require('../models/Post');
const { validationResult } = require('express-validator');

// Create a new post
exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    try {
        const post = await Post.create({ ...req.body, author: req.user.id });
        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "email");
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "email");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post fetched successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post", error: error.message });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Update only allowed fields
        const updatableFields = ['title', 'content', 'category', 'featuredImage', 'excerpt', 'tags', 'isPublished'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                post[field] = req.body[field];
            }
        });

        await post.save(); // This will trigger the pre-save hook and update the slug if title changed

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Error updating post", error: error.message });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
};
