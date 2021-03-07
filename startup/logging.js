const winston = require('winston'); // logger
require('express-async-errors');
require('winston-mongodb');

module.exports = () => {
  // handling uncaught exceptions so not things going wrong in express
  // e.g. during startup
  process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  // handling rejections (promises) so ones missing the catch block
  process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  const infoLogger = winston.createLogger({
    level: 'info',
    transports: [new winston.transports.Console()],
  });

  winston.add(logger);
  winston.add(infoLogger);

  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/vidly',
      level: 'error', // only log messages that are of level error
    })
  );

  //   throw new Error('Something failed during startup'); // uncaught exception

  // const p = Promise.reject(new Error('something has failed'));
  // p.then(() => console.log('done')); // unhandled rejection
};
