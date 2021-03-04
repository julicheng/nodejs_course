const { Movie, validate } = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  } catch {
    return res.status(404).send('movie was not found');
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('invalid genre');

  let movie = new Movie({
    title: req.body.name,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRatee: req.body.dailyRentalRatee,
  });

  movie = await movie.save();
  res.send(genre);
});
