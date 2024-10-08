import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import largeImage from './large-image.png'; // Replace with your actual image path
import googleLogo from './google-logo.png'; // Replace with your actual Google logo path
import RegistrationForm from './components/RegistrationForm'; // Import the RegistrationForm component
import HomePage from './pages/HomePage'; // Import your home page component

const App = () => {
  const [isUserLoginActive, setIsUserLoginActive] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');


  const handleUserLogin = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setLoginError('');

    try {
      const response = await fetch('http://localhost:5005/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
            const userData = await response.json();
            
            // Store email and user information in localStorage
            localStorage.setItem('email', userData.email);
        // Successful login, redirect to home or another page
        alert('Login successful!');
        // Navigate to the home page or dashboard
        window.location.href = '/home'; 
        
      } else {
        const errorText = await response.text();
        setLoginError(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please try again.');
    }
  };



  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Handle admin login
  };

  return (
    <Router>
      <Routes>
        {/* Route for the Login Page */}
        <Route
          path="/"
          element={
            <div className="app">
              <div className="header">
                <h1>Online Ticket Booking</h1>
              </div>
              <div className="container">
                <div className={`form-container ${isUserLoginActive ? 'active' : 'hidden'}`}>
                  <h2>User Login</h2>
                  <p className="welcome-text">Welcome back!</p>
                  <p className="credential-text">Please enter your credentials</p>
                  <form onSubmit={handleUserLogin}>
                    <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}  required />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  required />
                    <button type="submit">Login</button>
                    {loginError && <p className="error-message">{loginError}</p>}
                  </form>
                  <button className="google-button">
                    <img src={googleLogo} alt="Google" className="google-logo" />
                    Sign in with Google
                  </button>
                  <div className="register-link">
                    <Link to="/register">New User? Register Here</Link> {/* Navigate to register page */}
                  </div>
                  <div className="toggle-button" onClick={() => setIsUserLoginActive(false)}>
                    Admin Login
                  </div>
                </div>

                <div className={`form-container ${isUserLoginActive ? 'hidden' : 'active'}`}>
                  <h2>Admin Login</h2>
                  <p className="welcome-text">Welcome back!</p>
                  <p className="credential-text">Please enter your credentials</p>
                  <form onSubmit={handleAdminLogin}>
                    <input type="text" placeholder="Admin Username" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                  </form>
                  <div className="toggle-button" onClick={() => setIsUserLoginActive(true)}>
                    User Login
                  </div>
                </div>

                <img src={largeImage} alt="Promotional banner" className="large-image" />
              </div>
            </div>
          }
        />

        {/* Route for the Registration Page */}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
