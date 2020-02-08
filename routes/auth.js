const {Admin} = require('../models/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let admin = await Admin.findOne({
        username: req.body.username
    });
    
    if(!admin) return res.status(400).send('Invalid Email or Password!');

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if(!validPassword) return res.status(400).send('Invalid Email or Password!');

    const token = jwt.sign({ _id: admin._id }, 'jwtPrivateKey');
    res.send(token);
});

function validate(admin){
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    };
    return Joi.validate(admin, schema);
}

module.exports = router;