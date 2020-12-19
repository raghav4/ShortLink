const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.cookie) return res.render('adminLogin');
  const cookie = req.headers.cookie.split('=')[1];
  const validateJwt = jwt.verify(cookie, process.env.jwtPrivateKey);
  if (validateJwt) return res.redirect('/c/update');
  res.render('adminLogin');
  return next();
};
