const Category = require('../models/category');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        // Check for duplicate category name (case-insensitive)
        const existing = await Category.findOne({ name: { $regex: `^${req.body.name}$`, $options: 'i' } });
        if (existing) {
            return res.status(400).json({ message: 'Category name already exists' });
        }
        const category = await Category.create(req.body);
        res.status(201).json({ message: 'Category created', category });
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error: error.message });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories || categories.length === 0 ) return res.status(404).json({ message: 'No categories found' });
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        // Update fields if provided
        if (req.body.name) category.name = req.body.name;
        if (req.body.description) category.description = req.body.description;

        await category.save(); // This will trigger the pre-save hook and update the slug if name changed

        res.status(200).json({ message: 'Category updated', category });
    } catch (error) {
        res.status(400).json({ message: 'Error updating category', error: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};