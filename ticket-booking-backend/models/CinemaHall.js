const mongoose = require('mongoose');

const cinemaHallSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  showtimes: [{ 
    date: { type: Date, required: true },
    time: { type: String, required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  }],
});

module.exports = mongoose.model('CinemaHall', cinemaHallSchema);
