const mongoose = require('mongoose');
const ids = require('short-id');

const urlSchema = new mongoose.Schema({
    inputUrl: {
        type: String,
        required: true
    },
    ShortId: {
        type: String,
        required: true
    },
    fetch: {
        type: String,
        required: true
    }
});

const Url = mongoose.model('Url',urlSchema);

exports.Url = Url;
