const express = require('express')
const Booking = require('../models/bookingModel');
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler')
const router = express.Router()

router.post('/', protect, asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const placeData = {
      user: userId,
      place: req.body.place,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      numberOfGuests: req.body.numberOfGuests,
      name: req.body.name,
      phone: req.body.phone,
      price: req.body.price,
    };

    const booking = new Booking(placeData);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json(error);
  }
}));



router.get('/', protect, async (req, res) => {
  try {
    const products = await Booking.find({ user: req.user.id }).populate('place')
    res.json(products)
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
}
});

module.exports = router