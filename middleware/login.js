const admin = require('../models/admin');
const path = require('path');

module.exports = function(req, res, next){
    res.type('html');
    res.sendFile(path.join(__dirname + '/../client/adminLogIn.html'))
}