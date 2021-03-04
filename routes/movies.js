const { Movie, validate } = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movie = await Movie.find().sort('name');
  res.send(movie);
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  } catch {
    return res.status(404).send('movie was not found');
  }
});

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error);

//   let movie = new Movie({
//     name: req.body.name,
//   });

//   movie = await genre.save();
//   res.send(genre);
// });
