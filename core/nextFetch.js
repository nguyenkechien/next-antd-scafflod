/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-unfetch';
import qs from 'query-string';
import { Auth } from './Auth';
import logger from './Logger';
import { filterObject } from './util';
const { resType } = require('./utilServer');
export const configType = { data: Object, query: Object, timeout: Number };
export const methodsType = {
  /**
   *
   * @param {String} path
   * @param {configType} config
   * @returns {resType}
   */
  get: async (path, config) => {},
  /**
   *
   * @param {String} path
   * @param {configType} config
   */
  post: async (path, config) => {},
  /**
   *
   * @param {String} path
   * @param {configType} config
   * @returns {resType}
   */
  put: async (path, config) => {},
  /**
   *
   * @param {String} path
   * @param {configType} config
   * @returns {resType}
   */
  delete: async (path, config) => {},
};
// initial fetch
/**
 * @type {methodsType}
 */
const nextFetch = Object.create(null);
// browser support methods
// ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PATCH', 'PUT']
const HTTP_METHOD = ['get', 'post', 'put', 'patch', 'delete'];
// can send data method
const CAN_SEND_METHOD = ['post', 'put', 'delete', 'patch'];

HTTP_METHOD.forEach(method => {
  // is can send data in opt.body
  const canSend = CAN_SEND_METHOD.includes(method);
  nextFetch[method] = (path, { data, query, timeout = 10000 } = {}) => {
    let url = path;
    const opts = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      credentials: 'include',
      timeout,
      mode: 'cors',
      cache: 'no-cache',
    };

    if (query) {
      const queryString = qs.stringify(filterObject(query, Boolean));
      url += `${url.includes('?') ? '&' : '?'}${queryString}`;
    }

    if (canSend && data) {
      opts.body = qs.stringify(filterObject(data, Boolean));
      opts.headers.Authorization = `bearer ${Auth.getAuthToken()}`;
    }

    logger.info('Request Url:', url);

    return new Promise((resolve, reject) => resolve(fetch(url, opts)))
      .then(res => res.json())
      .then(({ status = 200, message, errors, ...res }) => {
        if (status >= 400 && message && errors === null) {
          const err = new Error(message);
          err.message = message;
          err.code = status;
          err.data = data;
          throw err;
        }
        return { ...res };
      });
  };
});

export default nextFetch;
