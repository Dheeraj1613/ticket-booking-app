const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.post('/', movieController.createMovie); // Add a new movie
router.get('/', movieController.getAllMovies); // Get all movies
router.get('/:id', movieController.getMovieById); // Get a movie by ID
router.put('/:id', movieController.updateMovie); // Update a movie
router.delete('/:id', movieController.deleteMovie); // Delete a movie

module.exports = router;
