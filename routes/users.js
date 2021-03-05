const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  // we get this from json web token
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('user already registered');

  // only pick name email and password from req.body to send
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  // change password to bcrypt one
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // only pick id, name and email from the object and
  // dont return pw
  // res.send(_.pick(user, ['_id', 'name', 'email']));

  const token = user.generateAuthToken();

  // should prefix custom header with x-
  // send header with token when registered
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
