require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Import routes
const movieRoutes = require('./routes/movieRoutes');
const cityRoutes = require('./routes/cityRoutes');



const app = express();
app.use(express.json());

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from the React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/users', userRoutes);
app.use('/movies',movieRoutes);

app.use('/city',cityRoutes);

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
