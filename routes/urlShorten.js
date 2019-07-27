const {Url} = require('../models/urlshorten');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ids = require('short-id');

router.get('/:id', async (req, res) => {
    const url = await Url.findOne({
        ShortId: req.params.id
    });
    res.writeHead(301, {
        Location: url.inputUrl
    });
    res.end();
});

router.post('/transfer', async (req, res) => {
    console.log(req.body);
    const input = req.body.inputUrl;
    const short = ids.store(input);

    let url = await Url.findOne({
        inputUrl: input
    });
    if (url) return res.send(url);

    url = new Url({
        inputUrl: input,
        ShortId: short
    });

    await url.save();
    res.send(url);
    console.log(url);
});

module.exports = router;