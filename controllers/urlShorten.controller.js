const debug = require("debug")("app:controller//urlShorten");
const ip = require("ip");
const ids = require("short-id");
const validUrl = require("valid-url");
const dateTime = require("date-time");
const { Url: URL } = require("../models/urlshorten");

ids.configure({
  length: 5,
});

exports.createShortURL = async (req, res) => {
  const input = req.body.inputUrl;
  if (validUrl.isUri(input)) {
    const short = ids.store(input);
    let date = dateTime({ showTimeZone: true });

    date = date.replace(" ", ", ");
    const url = new URL({
      inputUrl: input,
      ShortId: short,
      createdAt: date,
      createdBy: 1,
      views: 0,
    });
    await url.save();

    debug(`Successfully generated a new ShortURL ${url}`);
    res.status(201).send(url);
  } else {
    res.status(400).send("Please Enter a Valid URL");
  }
};

exports.getOriginalUrl = async (req, res) => {
  const url = await URL.findOne({
    ShortId: req.params.id,
  });
  if (!url) {
    return res.render("error", { message: "404 - ShortID not found" }); // render is causing the error.
  }
  URL.findOneAndUpdate(
    { ShortId: req.params.id },
    { $inc: { views: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        debug("Something went wrong while updating the data!");
      }
      debug(doc);
    }
  );
  url.location.push(ip.address());
  if (req.device.type.toUpperCase() === "TABLET") {
    url.device.push("PHONE");
  } else url.device.push(req.device.type.toUpperCase());
  url.save();
  res.writeHead(307, {
    Location: url.inputUrl,
  });
  res.end();
};
