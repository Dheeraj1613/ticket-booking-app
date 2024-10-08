const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  otp: { type: String, required: true },
  generated_at: { type: Date, default: Date.now, expires: 300 }, // OTP expires after 5 minutes
  is_verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('OTP', otpSchema);
