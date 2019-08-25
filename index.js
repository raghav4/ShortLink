const custom = require('./routes/custom');
const stats = require('./routes/stats');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlshorten = require('./routes/urlShorten');

// Templating Engine set
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Builtin Middlewares
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/static', express.static(__dirname + '/static'));

// Routes
app.use('/stats', stats);
app.use('/c', custom);
app.use('/register', admin);
app.use('/auth', auth);
app.use('/', urlshorten);
mongoose.connect('mongodb://localhost/url-shortener', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Failed to connect to MongoDB...'))

const PORT = process.env.PORT || 3000;
app.listen((PORT), () => console.log(`Listening on Port ${PORT}...`));