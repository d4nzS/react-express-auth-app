const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Number, required: true },
  lastLoginDate: { type: Number, required: true },
  isBlocked: { type: Boolean, required: true }
});

module.exports = model('User', UserSchema);