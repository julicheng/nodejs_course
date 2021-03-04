const mongoose = require('mongoose');
const Joi = require('joi');

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });
  return schema.validate(movie);
};

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: { type: String, required: true, minlength: 5, maxlength: 50 },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
    numberInStock: { type: Number, default: 0 },
    dailyRentalRate: { type: Number, default: 0 },
  })
);

exports.Movie = Movie;
exports.validate = validateMovie;
