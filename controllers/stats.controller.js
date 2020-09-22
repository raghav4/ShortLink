const { Url: URL } = require('../models/urlshorten');

exports.getURLStats = async (req, res) => {
  const url = await URL.findOne({ ShortId: req.params.id });

  if (!url) {
    return res.status(404).render('error', {
      message: `404 - Can't get stats as ShortID '${req.params.id}' doesn't exist`,
    });
  }

  const uniqueUsers = [...new Set(url.location)];
  let mobileUsers = 0;
  let desktopUsers = 0;
  for (let i = 0; i < url.device.length; i++) {
    if (url.device[i] === 'DESKTOP') desktopUsers++;
    else mobileUsers++;
  }

  let compressionRate = Math.round(
    ((url.ShortId.length + 19) / url.inputUrl.length) * 100,
  );
  compressionRate = 100 - compressionRate;

  const statsObject = {
    inputUrl: url.inputUrl,
    CreatedAt: url.createdAt,
    views: url.views,
    ShortId: `https://tii.now.sh/${url.ShortId}`,
    CompressionRate: compressionRate,
    distinctUsers: uniqueUsers.length,
    mobileUsers,
    desktopUsers,
    QRcode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tii.now.sh/${url.ShortId}`,
  };

  res.status(200).render('index', { statsObject });
};
