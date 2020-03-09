const custom = require("../routes/custom");
const stats = require("../routes/stats");
const urlshorten = require("../routes/urlShorten");

module.exports = function(app) {
	// Routes
	app.use("/c", custom);
	app.use("/", urlshorten);
	app.use("/stats", stats);
};
