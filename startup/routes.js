const custom = require("../routes/custom");
const stats = require("../routes/stats");
const urlShorten = require("../routes/urlShorten");

module.exports = function(app) {
	// Routes
	app.use("/c", custom);
	app.use("/", urlShorten);
	app.use("/stats", stats);
};
