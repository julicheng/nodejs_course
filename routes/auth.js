const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('invalid email or password');

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send('invalid email or password');

  // generate a token
  const token = user.generateAuthToken();

  res.send(token);
});

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });
  return schema.validate(req);
};

module.exports = router;
