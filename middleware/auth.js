const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
  // check if a token is sent with request
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    // check token is valid
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    // next middleware function
    next();
  } catch (e) {
    res.status(400).send('Invalid token');
  }
};
