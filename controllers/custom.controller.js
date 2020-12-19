const debug = require('debug')('app:controller::custom');
const { Url } = require('../models/urlshorten');

exports.getAllURLs = async (req, res) => {
  const url = await Url.find({});
  return res.status(200).send(url);
};

exports.customURL = async (req, res) => {
  const { ShortId, customId } = req.body;
  debug(`customController -> customURL(), ShortID: ${ShortId}, customID: ${customId}`);
  if (customId === 'c' || customId === 'stats' || customId === 'transfer') {
    return res
      .status(403)
      .render('custom', { msg: "You're not allowed to use the reserve keyword" });
  }

  const url = await Url.findOne({ ShortId });

  if (!url) {
    return res
      .status(404)
      .render('custom', { msg: `URL with the given ShortID ${ShortId} doesn't exist.` });
  }

  const checkCustom = await Url.findOne({ ShortId: customId });
  if (checkCustom) {
    return res
      .status(400)
      .render('custom', { msg: 'Request ShortID URL is not available, try a different one!' });
  }

  url.ShortId = customId;
  await url.save();

  res.writeHead(301, {
    Location: url.inputUrl,
  });

  return res.end();
};
