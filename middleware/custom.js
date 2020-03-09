const { Admin, validate } = require("../models/admin");
const jwt = require("jsonwebtoken");
const Cookies = require("js-cookie");
const debug = require("debug")("customMiddleware");
module.exports = function(req, res) {
	// If there are no cookies, ask the user to log in again.
	if (!getCookies(req)) {
		debug("Cookies not present");
		return res.render("adminLogin");
	}
	// If there are cookies validate the jwt-token present in the cookies
	const cookie = getCookies(req).split("=")[1];
	const validateJwt = jwt.verify(cookie, process.env.jwtPrivateKey);
	if (!validateJwt) {
		debug("Invalid jwt token!");
		return res.render("adminLogin");
	}
	res.render("custom");
};

function getCookies(req) {
	return req.headers.cookie;
}
