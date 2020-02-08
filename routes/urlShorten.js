const {Url} = require('../models/urlshorten');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ids = require('short-id');
const validUrl = require('valid-url');
const dateTime = require('date-time');
const ip = require('ip');
const device = require('express-device');

router.use(device.capture());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

ids.configure({
    length: 4
});
// GET
router.get('/:id', async (req, res) => {
    let url = await Url.findOne({
        ShortId: req.params.id
    });
    if(!url) return res.render('error')
    Url.findOneAndUpdate({ShortId: req.params.id}, {$inc: {'views': 1}}, {new: true}, (err,doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
    });
    url.location.push((ip.address()));
    if(req.device.type.toUpperCase()=="TABLET"){
       url.device.push('PHONE');
    }
    else url.device.push(req.device.type.toUpperCase());
    url.save();
    res.writeHead(307, {
        Location: url.inputUrl
    });
    res.end();
});
// POST
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
            views: 0
        });
        
        await url.save();
        res.send(url);
        console.log('Created New : ', url);
    } else {
        res.status(400).send('Please Enter a Valid URL');
    }
});

module.exports = router;
