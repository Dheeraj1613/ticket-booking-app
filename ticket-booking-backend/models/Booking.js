const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cinemaHall: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaHall', required: true },
  showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaHall.showtimes', required: true },
  seats: [{ seatNumber: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
