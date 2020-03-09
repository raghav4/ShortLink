const { Url } = require("../models/urlshorten");
const login = require("../middleware/login");
const auth = require("../middleware/auth");
const custom = require("../middleware/custom");
const express = require("express");
const router = express.Router();
const debug = require("debug")("customRoute");

// Custom Url
router.get("/auth", (req, res) => {
	if (!req.headers.cookie) return res.render("adminLogin");
	res.render("custom");
});
router.post("/auth", [auth, custom]);
router.post("/custom", async (req, res) => {
	const { ShortId, customId } = req.body;
	let url = await Url.findOne({ ShortId });
	debug(url);
	if (!url) return res.status(404).send(`URL with ShortId ${ShortId} not found`);
	url.ShortId = customId;
	await url.save();
	res.writeHead(301, {
		Location: url.inputUrl
	});
	res.end();
});
router.get("/", login);

module.exports = router;
