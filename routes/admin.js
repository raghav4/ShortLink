const {Admin, validate} = require('../models/admin_model');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let admin = await Admin.findOne({
        username: req.body.username
    });

    if (admin) return res.status(400).send('User is already registered!!');

    admin = new Admin(_.pick(req.body, ['username', 'password']));
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    await admin.save();

    const token = jwt.sign({
        _id: admin._id
    }, 'jwtPrivateKey');

    res.header('x-auth-token', token).send(_.pick(admin, ['username', '_id']));
});

module.exports = router;
// Route to Register a New User