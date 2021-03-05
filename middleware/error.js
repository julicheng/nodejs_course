module.exports = (err, req, res, next) => {
  // Log the exception
  res.status(500).send('Something failed');
};
