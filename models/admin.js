/* eslint-disable no-underscore-dangle */
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
});

// eslint-disable-next-line func-names
adminSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
};
const Admin = mongoose.model('Admin', adminSchema);
function validateAdmin(admin) {
  const schema = {
    username: Joi.string().min(1).required(),
    password: Joi.string().min(3).required(),
  };
  return Joi.validate(admin, schema);
}

exports.Admin = Admin;
exports.validate = validateAdmin;
