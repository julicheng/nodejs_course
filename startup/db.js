const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = () => {
  // connect to mongodb
  mongoose
    .connect(config.get('db'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info('connected to mongodb...'));
};
