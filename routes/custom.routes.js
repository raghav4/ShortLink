const debug = require('debug')('customRoute');
const express = require('express');
const { Url } = require('../models/urlshorten');
const login = require('../middleware/login');
const auth = require('../middleware/auth');
const custom = require('../middleware/custom');

const router = express.Router();

// Custom Url
router.get('/getall', async (req, res) => {
  const url = await Url.find({});
  res.send(url);
});

router.get('/auth', (req, res) => {
  if (!req.headers.cookie) return res.render('adminLogin');
  res.render('custom');
});
router.post('/auth', [auth, custom]);

router.post('/custom', async (req, res) => {
  const { ShortId, customId } = req.body;
  if (customId === 'c' || customId === 'stats' || customId === 'transfer') {
    return res.status(403).write('<h1>Not allowed to use the reserved keyword</h1>');
  }
  const url = await Url.findOne({ ShortId });
  debug(url);
  if (!url) {
    return res.status(404).write(`<h1>URL with ShortId ${ShortId} not found</h1>`);
  }
  const checkCustom = await Url.findOne({ ShortId: customId });
  if (checkCustom) {
    return res
      .status(400)
      .write('<h2>Custom URL is already registered/mapped, try a different one</h2>');
  }
  url.ShortId = customId;
  await url.save();
  res.writeHead(301, {
    Location: url.inputUrl,
  });
  res.end();
});

router.get('/', login);

module.exports = router;
