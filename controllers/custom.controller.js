const debug = require('debug')('app:controller//custom');
const { Url } = require('../models/urlshorten');

exports.getAllURLs = async (req, res) => {
  const url = await Url.find({});
  return res.status(200).send(url);
};

exports.customURL = async (req, res) => {
  debug('customURL constroller');
  const { ShortId, customId } = req.body;
  if (customId === 'c' || customId === 'stats' || customId === 'transfer') {
    return res
      .status(403)
      .write('<h1>Not allowed to use the reserved keyword</h1>');
  }

  const url = await Url.findOne({ ShortId });
  if (!url) {
    return res
      .status(404)
      .write(`<h1>URL with ShortId ${ShortId} not found</h1>`);
  }

  const checkCustom = await Url.findOne({ ShortId: customId });
  if (checkCustom) {
    return res
      .status(400)
      .write(
        '<h2>Custom URL is already registered/mapped, try a different one</h2>',
      );
  }

  url.ShortId = customId;
  await url.save();
  res.writeHead(301, {
    Location: url.inputUrl,
  });

  res.end();
};

// exports.
