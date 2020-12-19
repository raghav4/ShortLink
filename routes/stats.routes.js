const express = require('express');
const { statsController } = require('../controllers');

const router = express.Router();

router.get('/:id', statsController.getURLStats);

module.exports = router;
