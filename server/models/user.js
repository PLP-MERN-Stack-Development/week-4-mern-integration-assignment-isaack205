// Import mongoose
const mongoose = require('mongoose');

// User model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Allowed roles
    default: 'user' 
  },
});

module.exports = mongoose.model('User', userSchema);
