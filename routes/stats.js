const {Url} = require('../models/urlshorten');
const express = require('express');
const router = express.Router();

// Stats
router.get('/:id', async (req, res) => {
    const url = await Url.findOne({
        ShortId: req.params.id
    });
    if (!url) return res.status(404).send(`Can't get Stats! As the shortlink with the given id does not exists!!`);
    
    let compressionRate = Math.round(((url.ShortId.length + 19)/(url.inputUrl.length))*100);
    compressionRate = 100 - compressionRate;
    res.render('index',{
        inputUrl: url.inputUrl,
        CreatedAt: url.createdAt,
        ShortId: 'https://tii.now.sh/' + url.ShortId,
        CompressionRate: compressionRate
    });
});

module.exports = router;