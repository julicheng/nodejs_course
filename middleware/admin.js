module.exports = function (req, res, next) {
  // 401 unauthorized
  // 403 forbidden

  // req.user
  if (!req.user.isAdmin) return res.status(403).send('access denied');
  next();
};
