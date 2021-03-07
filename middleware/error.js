const winston = require('winston');

module.exports = (err, req, res, next) => {
  // Log the exception
  //   winston.log('error', err.message);
  winston.error(err.message, err); // same as above, can also pass err object so that will also be stored
  res.status(500).send('Something failed');
};
