// Import mongoose
const mongoose = require('mongoose');

// Category model
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, maxlength: 200 },
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Automatically generate slug from name before saving
categorySchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  next();
});

module.exports = mongoose.model('Category', categorySchema);