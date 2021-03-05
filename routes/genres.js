const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
  } catch {
    return res.status(404).send('genre was not found');
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const genre = new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  // validate
  // if invalid return 400
  const { error } = validate(req.body);
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
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    res.send(genre);
  } catch {
    return res.status(404).send('genre was not found');
  }
});

module.exports = router;
