import express from 'express';
import User from '../controllers/User.controller';
import Systems from '../controllers/Systems.controller';
import { asyncMiddleware } from './../../middlewares/server';
import { Reader } from '../services/auth.js';
import { setCookies } from '../../core/util';

const Router = express.Router();
Router.use(async function(req, res, next) {
  if (!req.headers['x-auth']) {
    const user = await Reader();
    if (user.statusCode > 200) return res.json(user);
    setCookies();
  }
  next();
});
Router.prefix('/users', router => {
  router.route('/').get(asyncMiddleware(User.GetUsers));
  router.route('/profile').get(asyncMiddleware(User.GetProfile));
  router.route('/login').post(asyncMiddleware(User.SignIn));
});

Router.prefix('/system', router => {
  router.route('/all').get(asyncMiddleware(Systems.GetAll));
});

module.exports = Router;
