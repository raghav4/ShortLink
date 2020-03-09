const { Admin } = require("../models/admin");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = async function(req, res, next) {
	const admin = await Admin.findOne({ username: req.body.username });
	// If user is not registered!
	if (!admin) return res.status(404).send("User Not registered!");
	// If user is registered but password is incorrect
	const validPassword = await bcrypt.compare(req.body.password, admin.password);
	if (!validPassword) return res.status(400).send("Invalid email or password!");

	// If password is valid then
	next();
};
