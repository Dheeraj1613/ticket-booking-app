const express = require('express');
const cityController = require('../controllers/cityController');
const { addMovieToCity } = require('../controllers/cityController');

const router = express.Router();

router.post('/', cityController.createCity); // Add a new city
router.get('/', cityController.getAllCities); // Get all cities
router.get('/:id', cityController.getCityById); // Get a city by ID
router.put('/:id', cityController.updateCity); // Update a city
router.delete('/:id', cityController.deleteCity); // Delete a city
router.post('/addmovie', cityController.addMovieToCity);
router.get('/:cityName/movies', cityController.getMoviesInCity);

module.exports = router;
