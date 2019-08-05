const mongoose = require('mongoose');
const Joi = require('joi');

const Admin = new mongoose.model('Admin', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024
    }
}));

function validateAdmin(admin){
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    };
    return Joi.validate(admin, schema);
}

exports.Admin = Admin;
exports.validate = validateAdmin;