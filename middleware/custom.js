const jwt = require('jsonwebtoken');
const debug = require('debug')('customMiddleware');

const getCookies = (req) => req.headers.cookie;

module.exports = (req, res, next) => {
  // If there are no cookies, ask the user to log in again.
  if (!getCookies(req)) {
    debug('Cookies not present');
    return res.redirect('/c');
  }
  // If there are cookies validate the jwt-token present in the cookies
  const cookie = getCookies(req).split('=')[1];
  const validateJwt = jwt.verify(cookie, process.env.jwtPrivateKey);
  if (!validateJwt) {
    debug('Invalid jwt token!');
    return res.redirect('/c');
  }
  res.render('custom');
  return next();
};
