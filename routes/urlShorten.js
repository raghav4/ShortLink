const { Url } = require('../models/urlshorten');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ids = require('short-id');

router.post('/', async(req, res) => {
    const input = req.body.inputUrl;
    const url = new Url({
        inputUrl: input,
        ShortId: ids.store(input)
    });
    
    await url.save();
    res.send(url);
});

module.exports = router;

// ShortId: not working..?