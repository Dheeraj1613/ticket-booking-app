const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  languages: [{ type: String }],
  genre: [{ type: String }],
  poster: { type: String },
  runtime: { type: String },
  releaseDate: { type: Date },
  rating: { type: Number },
  cast: [{ type: String }],
  endDate: { type: Date },
  about: { type: String },
});

module.exports = mongoose.model('Movie', movieSchema);
