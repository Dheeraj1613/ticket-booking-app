const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    const { user, cinemaHall, showtime, seats } = req.body;

    try {
        const newBooking = new Booking({ user, cinemaHall, showtime, seats });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.getAllBookings = async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
};

exports.getBookingById = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).send('Booking not found.');
    res.json(booking);
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) return res.status(404).send('Booking not found.');
        res.json({ message: 'Booking deleted successfully.' });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
