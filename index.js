const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ids = require('short-id');
const mongoose = require('mongoose');
const urlshorten = require('./routes/urlShorten');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('client'));
app.use('/', urlshorten);

mongoose.connect('mongodb://localhost/url-shortener',{ useNewUrlParser: true})
    .then(() => console.log('Connected to mongodb...'))
    .catch(err => console.error('Cant connect to mongodb..'))


const PORT = process.env.PORT || 3000;
app.listen((PORT), () => console.log(`Listening on Port ${PORT}...`));