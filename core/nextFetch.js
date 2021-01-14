/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-unfetch';
import qs from 'query-string';
import { Auth } from './Auth';
import logger from './Logger';
import { filterObject } from './util';
import { resType } from './utilServer';

export const configType = {
  data: Object,
  query: Object,
  timeout: Number,
  headers: Object,
};
export const methodsType = {
  /**
   *
   * @param {String} path
   * @param {configType} config
   */
  get: async (path, config) => await Promise.resolve(resType),
  /**
   *
   * @param {String} path
   * @param {configType} config
   */
  post: async (path, config) => await Promise.resolve(resType),
  /**
   *
   * @param {String} path
   * @param {configType} config
   * @returns {resType}
   */
  put: async (path, config) => await Promise.resolve(resType),
  /**
   *
   * @param {String} path
   * @param {configType} config
   * @returns {resType}
   */
  delete: async (path, config) => await Promise.resolve(resType),
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
  nextFetch[method] = async (
    path,
    { data, query, timeout = 10000, headers = {} } = {},
  ) => {
    let url = path;
    const opts = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Auth.getAuthToken(),
        ...headers,
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
    }

    logger.info('Request Url:', url);

    return new Promise((resolve, reject) => {
      fetch(url, opts)
        .then(res => res.json())
        .then(({ code = 200, message, errors, ...res }) => {
          if (code >= 400) {
            if (message && errors === null) {
              reject({ code, error: message });
            } else {
              reject({ code, errors });
            }
          }
          resolve(res);
        });
    });
  };
});

export default nextFetch;
