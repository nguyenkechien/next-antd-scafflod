const express = require('express');
const User = require('../controllers/User.controller');
const Systems = require('../controllers/Systems.controller');
const Router = express.Router();
// const { asyncMiddleware } = require('./../../middlewares/server');
import { asyncMiddleware } from './../../middlewares/server';

Router.prefix('/users', router => {
  router.route('/').get(asyncMiddleware(User.GetUsers));
  router.route('/profile').get(asyncMiddleware(User.GetProfile));
  router.route('/login').post(asyncMiddleware(User.SignIn));
});

Router.prefix('/system', router => {
  router.route('/all').get(asyncMiddleware(Systems.GetAll));
});

module.exports = Router;
