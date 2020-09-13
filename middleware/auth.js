const { Admin } = require('../models/admin');
const bcrypt = require('bcryptjs');
const debug = require('debug')('authMiddleware');

module.exports = async function (req, res, next) {
  debug(req.body);
  const admin = await Admin.findOne({ username: req.body.username });
  // If user is not registered!
  if (!admin) {
    return res.write('<h1>Invalid Username</h1>');
  }

  // If user is registered but password is incorrect
  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).write('<h1>Invalid password!</h1>');

  // If password is valid then Create a jwt and store it in the cookies.
  // Generate cookie only after the user has logged in successfully!
  const token = await admin.generateAuthToken();
  if (admin) {
    debug('Logged in SuccessFully');
    res.cookie('jwt-token', token, {
      expires: new Date(Date.now() + 48 * 3600000),
    });
    return next();
  } return res.render('adminLogin');
  // ? THIS FIXED THE BUG
  // ! Where and how does the req.body is having password and username?
};
