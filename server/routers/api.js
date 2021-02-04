import express from 'express';
import User from '../controllers/User.controller';
import Systems from '../controllers/Systems.controller';
import { asyncMiddleware } from './../../middlewares/server';
import { Reader } from '../services/auth.js';
import { getCookies, setCookies } from '../../core/util';
import { CookieKey } from '../../constants/ConstTypes';

const Router = express.Router();
Router.use(async function(req, res, next) {
  if (!getCookies(CookieKey.xAuth, req)) {
    const user = await Reader();
    console.log(`user`, user);
    if (user.statusCode && user.statusCode > 200) return res.json(user);
    setCookies(CookieKey.xAuth, user.jwt, 30, { req, res });
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
