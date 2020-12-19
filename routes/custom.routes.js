/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:custom.routes.js');
const auth = require('../middleware/auth');
const login = require('../middleware/login');
const custom = require('../middleware/custom');
const { Admin } = require('../models/admin');
const { customURLController } = require('../controllers');

const router = express.Router();

router.get('/getall', customURLController.getAllURLs);

router.get('/update', async (req, res) => {
  if (req.headers.cookie) {
    try {
      const decoded = jwt.verify(req.cookies['jwt-token'], process.env.jwtPrivateKey);
      const admin = await Admin.findById(decoded._id);
      if (admin) return res.status(200).render('custom');
    } catch (ex) {
      debug(ex.message);
      res.cookie('jwt-token', {}, { maxAge: -1 });
      return res.status(400).render('adminLogin');
    }
  }
  return res.status(200).render('adminLogin');
});

router.post('/auth', [auth, custom]);

router.post('/custom', customURLController.customURL);

router.get('/', login);

module.exports = router;
