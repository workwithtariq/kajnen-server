const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  district: String,
  upazila: String,
  union: String,
  village: String
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  picture: { type: String },
  address: addressSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
