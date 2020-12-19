const bcrypt = require('bcryptjs');
const debug = require('debug')('app:authMiddleware');
const { Admin } = require('../models/admin');

module.exports = async (req, res, next) => {
  debug('Authenticating Admin...');
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).render('adminLogin', { msg: 'Invalid Username or Password' });

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    return res.status(401).render('adminLogin', { msg: 'Invalid Username or Password' });
  }

  const token = await admin.generateAuthToken();

  debug('User Logged in SuccessFully');
  res.cookie('jwt-token', token, {
    expires: new Date(Date.now() + 48 * 3600000),
  });
  return next();
};
