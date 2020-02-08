const mongoose = require('mongoose');
const Joi = require('joi');

const Admin = new mongoose.model('Admin', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 1024
    }
}));

function validateAdmin(admin){
    const schema = {
        username: Joi.string().min(1).required(),
        password: Joi.string().min(3).required()
    };
    return Joi.validate(admin, schema);
}

exports.Admin = Admin;
exports.validate = validateAdmin;