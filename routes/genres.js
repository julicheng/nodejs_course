const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = new mongoose.model('Genre', genreSchema);

const validateGenre = (genre) => {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(genre);
};

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  // const genre = Genre.find({ _id: id });
  if (!genre) return res.status(404).send('genre was not found');

  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  // let genre = new Genre({
  //   name: req.body.name,
  // });
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  // genre = await genre.save();
  res.send(genre);
});

router.put('/:id', (req, res) => {
  // lookup the genre
  // if not existing, return 404
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('genre was not found');
  // validate
  // if invalid return 400
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error);

  // update genre
  // return updated genre
  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  //lookup the genre
  //not existing then 404
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('genre was not found');
  //delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  //return the same genre
  res.send(genre);
});

module.exports = router;
