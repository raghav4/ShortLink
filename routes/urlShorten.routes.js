const express = require('express');
const { urlShortenerController } = require('../controllers');

const router = express.Router();

router.get('/:id', urlShortenerController.getOriginalUrl);

router.post('/transfer', urlShortenerController.createShortURL);

module.exports = router;
