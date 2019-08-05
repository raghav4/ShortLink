const {Url} = require('../models/urlshorten');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ids = require('short-id');
const validUrl = require('valid-url');
const dateTime = require('date-time');

ids.configure({
    length: 4
});

router.get('/:id', async (req, res) => {
    let url = await Url.findOne({
        ShortId: req.params.id
    });
    if(!url) return res.status(404).send('ShortLink not found!!');
    
    res.writeHead(301, {
        Location: url.inputUrl
    });
    res.end();
});

router.post('/transfer', async (req, res) => {
    const input = req.body.inputUrl;
    if ((validUrl.isUri(input))) {
        const short = ids.store(input);
        let date = dateTime({
            showTimeZone: true
        });
        date = date.replace(" ", ", ");
        url = new Url({
            inputUrl: input,
            ShortId: short,
            createdAt: date,
            createdBy: 1,
            views: 1
        });

        await url.save();
        res.send(url);
        console.log('Created New : ', url);
    } else {
        res.status(400).send('Please Enter a Valid URL');
    }
});

module.exports = router;