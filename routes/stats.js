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
    let statsObject = {
        inputUrl: url.inputUrl,
        CreatedAt: url.createdAt,
        views: url.views,
        ShortId: 'https://tii.now.sh/' + url.ShortId,
        CompressionRate: compressionRate,
        QRcode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tii.now.sh/${url.ShortId}`
    }
    
    res.render('index',{ statsObject });
});

module.exports = router;