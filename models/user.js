const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });
  return schema.validate(user);
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

// if you want to create a function that is a part of an object
// shouldnt use arrow functions
// this method now belongs to the schema and objects beloging to the
// schema can use this method
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id, // this is the payload
      isAdmin: this.isAdmin,
    },
    config.get('jwtPrivateKey') // used to create digital signature
  );
  return token;
};

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;
