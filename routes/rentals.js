const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.get('/:id', async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    res.send(rental);
  } catch {
    return res.status(404).send('rental was not found');
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findById(req.body.customerId);
    const movie = await Movie.findById(req.body.movieId);

    if (movie.numberInStock === 0)
      return res.status(400).send('movie not in stock');

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();

    // TRANSASCTION
    new Fawn.Task()
      // working directly with collection so pass in 'rentals'
      .save('rentals', rental)
      .update(
        'movies',
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    // ojinttaskcollections collection is created for Fawn temp data

    res.send(rental);
  } catch (e) {
    console.log(e);
    return (
      res
        // 500 if server error
        .status(400)
        .send('customer or movie not found or somthing failed')
    );
  }
});

module.exports = router;
