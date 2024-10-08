const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/', bookingController.createBooking); // Add a new booking
router.get('/', bookingController.getAllBookings); // Get all bookings
router.get('/:id', bookingController.getBookingById); // Get a booking by ID
router.delete('/:id', bookingController.deleteBooking); // Delete a booking

module.exports = router;
