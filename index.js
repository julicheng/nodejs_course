const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')(); // function so we call it
require('./startup/routes')(app); // function so we call it
require('./startup/config')(); // function so we call it
require('./startup/db')(); // function so we call it
require('./startup/validation')(); // function so we call it

const port = process.env.PORT || 3000;
const server = app.listen(3000, () =>
  winston.info(`Listening on port ${port}....`)
);

module.exports = server;
