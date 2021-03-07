const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
  // connect to mongodb
  mongoose
    .connect('mongodb://localhost/vidly', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info('connected to mongodb...'));
};
