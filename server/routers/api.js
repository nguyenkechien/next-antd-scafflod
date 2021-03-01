import express from 'express';
import User from '../controllers/User.controller';
import Systems from '../controllers/Systems.controller';
import { asyncMiddleware, jwtTokenMiddleware } from './../../middlewares/server';

const Router = express.Router();
Router.use(jwtTokenMiddleware);
Router.prefix('/users', router => {
  router.route('/').get(asyncMiddleware(User.GetUsers));
  router.route('/profile').get(asyncMiddleware(User.GetProfile));
  router.route('/login').post(asyncMiddleware(User.SignIn));
});

Router.prefix('/system', router => {
  router.route('/all').get(asyncMiddleware(Systems.GetAll));
});

module.exports = Router;
