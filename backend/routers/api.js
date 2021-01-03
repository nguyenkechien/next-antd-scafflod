const express = require('express');
const User = require('../controllers/User.controller');
const Router = express.Router();
const { asyncMiddleware } = require('./../../middlewares/server');

Router.prefix('/users', router => {
  router.route('/').get(asyncMiddleware(User.GetUsers));
  router.route('/login').post(asyncMiddleware(User.SignIn));
});

module.exports = Router;
