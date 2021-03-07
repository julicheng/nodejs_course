const asyncMiddleware = require('../middleware/async');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // by using express-async-errors
  throw new Error('could not get the genres');
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    // by using asyncMiddleware function direct
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
    // return res.status(404).send('genre was not found');
  })
);

// second param is middleware function
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const genre = new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
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

// these middleware gets executed in sequence
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    res.send(genre);
  } catch {
    return res.status(404).send('genre was not found');
  }
});

module.exports = router;
