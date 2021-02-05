import { CookieKey, errorStatus } from '../../constants/ConstTypes';
import { resJson } from './../../core/utilServer';

export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
    next;
  });
};

export const xAuthMiddleware = (req, res, next) => {
  if (!req.headers[CookieKey.xAuth] || !req.headers[CookieKey.xAuth].length) {
    return res.json(resJson({ status: 403, message: errorStatus[403] }));
  }
  next();
};
