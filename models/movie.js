const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const validateMovie = (movie) => {
  // validating what the client sends us
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().required,
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });
  return schema.validate(movie);
};

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    // validating what is stored in the database
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, default: 0 },
    dailyRentalRate: { type: Number, default: 0 },
  })
);

exports.Movie = Movie;
exports.validate = validateMovie;
