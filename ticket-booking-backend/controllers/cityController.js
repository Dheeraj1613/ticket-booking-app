const City = require('../models/City');
const Movie = require('../models/Movie');

exports.createCity = async (req, res) => {
    const { name } = req.body;

    try {
        const newCity = new City({ name });
        await newCity.save();
        res.status(201).json(newCity);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('City name already exists.');
        }
        res.status(500).send('Server error');
    }
};

exports.getAllCities = async (req, res) => {
    const cities = await City.find();
    res.json(cities);
};

exports.getCityById = async (req, res) => {
    const { id } = req.params;
    const city = await City.findById(id);
    if (!city) return res.status(404).send('City not found.');
    res.json(city);
};

exports.updateCity = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCity = await City.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCity) return res.status(404).send('City not found.');
        res.json(updatedCity);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.deleteCity = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCity = await City.findByIdAndDelete(id);
        if (!deletedCity) return res.status(404).send('City not found.');
        res.json({ message: 'City deleted successfully.' });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
exports.addMovieToCity = async (req, res) => {
    const { cityName, movieId, languages } = req.body;
  
    try {
      // Check if the movie exists
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
  
      // Find the city, or create a new one if it doesn't exist
      let city = await City.findOne({ name: cityName });
  
      if (!city) {
        // Create new city if not found
        city = new City({
          name: cityName,
          movies: [],
        });
      }
  
      // Check if the movie is already listed in the city's movies array
      const movieInCity = city.movies.find((movieEntry) => movieEntry.movie.equals(movieId));
  
      if (movieInCity) {
        // If the movie is already listed, update the languages
        movieInCity.languages = [...new Set([...movieInCity.languages, ...languages])]; // Avoid duplicate languages
      } else {
        // Otherwise, add the movie to the city's movie list
        city.movies.push({ movie: movie._id, languages });
      }
  
      // Save the updated city
      await city.save();
      res.status(200).send('Movie added to city successfully');
    } catch (error) {
      console.error('Error adding movie to city:', error);
      res.status(500).send('Server error');
    }
  };
// controllers/cityController.js
exports.getMoviesInCity = async (req, res) => {
    const { cityName } = req.params;
  
    try {
      const city = await City.findOne({ name: cityName }).populate('movies.movie');
      if (!city) return res.status(404).send('City not found');
  
      res.status(200).json(city.movies);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching movies in city');
    }
  };
  