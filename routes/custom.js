const {Url} = require('../models/urlshorten');
const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

// Custom Url
router.get('/:custom/:id', login, async(req,res)=>{
    let url = await Url.findOne({
        ShortId: req.params.id
    })
    url.ShortId = req.params.custom;
    await url.save();
    res.writeHead(301, {
        Location: url.inputUrl
    });
    res.end();
});

module.exports = router;