const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = mongoose.model('Genre', genreSchema);

const validateGenre = (genre) => {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(genre);
};

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('genre was not found');

  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  // validate
  // if invalid return 400
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  // find and update
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  // if not existing, return 404
  if (!genre) return res.status(404).send('genre was not found');

  // update genre
  // return updated genre
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  //lookup the genre
  const genre = await Genre.findByIdAndRemove(req.params.id);
  //not existing then 404
  if (!genre) return res.status(404).send('genre was not found');

  //return the same genre
  res.send(genre);
});

module.exports = router;
