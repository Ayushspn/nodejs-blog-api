const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user' },
  comments: [
  {
    user: { type: String, required: true }, // or ObjectId if you have users
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }
],
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);