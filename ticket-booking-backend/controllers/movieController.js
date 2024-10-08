const Movie = require('../models/Movie');

exports.createMovie = async (req, res) => {
    const { name, languages, genre, poster, runtime, releaseDate, rating, cast, endDate, about } = req.body;

    try {
        const newMovie = new Movie({ name, languages, genre, poster, runtime, releaseDate, rating, cast, endDate, about });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('Movie name already exists.');
        }
        
        res.status(500).send('Server error');
    }
};

exports.getAllMovies = async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).send('Movie not found.');
    res.json(movie);
};

exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).send('Movie not found.');
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) return res.status(404).send('Movie not found.');
        res.json({ message: 'Movie deleted successfully.' });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
