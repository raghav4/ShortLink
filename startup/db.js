#!/usr/bin/env node

require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')('app:db.js');

// eslint-disable-next-line func-names
module.exports = function () {
  const dbURI = process.env.DB_URI;
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => debug(`Connected to MongoDB, URL = ${dbURI}...`))
    .catch((err) => debug('Failed to connect to MongoDB...', err));
};
