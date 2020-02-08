const custom = require('../routes/custom');
const stats = require('../routes/stats');
const admin = require('../routes/admin');
const auth = require('../routes/auth');
const urlshorten = require('../routes/urlShorten');

module.exports = function (app) {
    // Routes
    app.use('/', urlshorten);
    app.use('/stats', stats);
    app.use('/c', custom);
    app.use('/register', admin);
    app.use('/auth', auth);
}