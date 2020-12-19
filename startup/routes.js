const device = require('express-device');
const stats = require('../routes/stats.routes');
const custom = require('../routes/custom.routes');
const urlShorten = require('../routes/urlShorten.routes');

module.exports = (app) => {
  app.use(device.capture());
  app.use('/c', custom);
  app.use('/', urlShorten);
  app.use('/stats', stats);
};
