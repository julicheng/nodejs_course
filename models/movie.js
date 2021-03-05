const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
const Joi = require('joi');

const validateMovie = (movie) => {
  // validating what the client sends us
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(50),
    dailyRentalRate: Joi.number().min(0).max(50),
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
    numberInStock: { type: Number, default: 0, min: 0, max: 255 },
    dailyRentalRate: { type: Number, default: 0, min: 0, max: 255 },
  })
);

exports.Movie = Movie;
exports.validate = validateMovie;
