const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const validateGenre = (genre) => {
  const schema = Joi.object({ name: Joi.string().min(5).max(50).required() });
  return schema.validate(genre);
};

const Genre = mongoose.model('Genre', genreSchema);

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
