const express = require('express');
const Router = express.Router();

/**
 *
 * @param {String} path
 * @param {Router} configure
 */
express.Router.prefix = function(path, configure) {
  const router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};

Router.use('/api', require('./api'));
module.exports = Router;
