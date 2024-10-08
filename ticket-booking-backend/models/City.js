const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure city name is unique
  },
  movies: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Movie
        ref: 'Movie',
        required: true, // Ensure this field is required
      },
      languages: {
        type: [String], // Array of languages in which the movie is available
        required: true,
      },
    },
  ],
});

const City = mongoose.model('City', citySchema);
module.exports = City;
