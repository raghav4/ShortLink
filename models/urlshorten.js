const mongoose = require('mongoose');
const ids = require('short-id');

const urlSchema = new mongoose.Schema({
    inputUrl: {
        type: String,
        required: true
    },
    ShortId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Number
    }
});

const Url = mongoose.model('Url',urlSchema);

exports.Url = Url;
