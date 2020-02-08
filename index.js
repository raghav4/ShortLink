const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Builtin Middlewares
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/static', express.static(__dirname + '/static'));

// Templating Engine set
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// routes
require('./startup/routes')(app);

mongoose.connect('mongodb://localhost/url-shortener', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Failed to connect to MongoDB...'))

const PORT = process.env.PORT || 3000;
app.listen((PORT), () => console.log(`Listening on Port ${PORT}...`));