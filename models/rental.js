const mongoose = require('mongoose');
const Joi = require('joi');

const validateRental = (genre) => {
  const schema = Joi.object({
    // we send these from client side then we read whats in database on the server
    // and pop values
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(genre);
};

const Rental = mongoose.model(
  'Rental',
  new mongoose.Schema({
    // didnt reuse customer schema and created new one because what
    // if customer schema had 50 props and we dont want to use
    // them all
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

exports.Rental = Rental;
exports.validate = validateRental;
