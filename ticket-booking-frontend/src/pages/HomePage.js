import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'; // Add your styles in this file for better management
import axios from 'axios';

import defaultProfileImage from '../default-profile.png';


const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    city: '',
    name: '',
    profilePhoto: null,
  });
  const [movies, setMovies] = useState([]);

  // Fetch user data after login


  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      axios.post('http://localhost:5005/users/get-user', { email })
        .then(res => {
          const { name, city, profilePhoto } = res.data;
          setUser({
            city,
            name,
            profilePhoto: profilePhoto ,
          });
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
        });
    }
}, []);


  // Fetch movies from the database
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5005/movies');
        setMovies(res.data); // Assuming the data is an array of movies
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };
    fetchMovies();
  }, []);

  // Handle clicking on a movie tile
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigates to the movie details page
  };

  return (
    <div className="home-page">
      {/* Top Section: Search Bar, City, Profile */}
      <header className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
            className="search-input"
          />
        </div>
        <div className="user-info">
          <span>{user.city}</span>
          <div className="profile-section">
            <img
              src={user.profilePhoto || defaultProfileImage}
              alt="Profile"
              className="profile-photo"
            />
            <Link to="/profile" className="profile-name">
              {user.name}
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/events">Events</Link>
        <Link to="/sports">Sports</Link>
        <Link to="/plays">Plays</Link>
      </nav>

      {/* Main Content: Movies */}
      <main className="main-content">
        <section className="section movies">
          <h2>Movies</h2>
          <div className="movie-tiles">
            {movies.slice(0, 7).map((movie) => (
              <div key={movie._id} className="movie-tile" onClick={() => handleMovieClick(movie._id)}>
                <img src={movie.poster} alt={movie.name} className="movie-poster" />
                <h3>{movie.name}</h3>
                <p>{movie.genre.join(', ')}</p>
              </div>
            ))}
          </div>
          <Link to="/movies" className="see-more">See More</Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
