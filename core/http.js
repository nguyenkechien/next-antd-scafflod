/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-unfetch';
import qs from 'query-string';
import { filterObject } from './util';

export const ConfigType = {
  data: Object,
  query: Object,
  timeout: Number,
  headers: Object,
};

export const httpMethodsType = {
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  get: async (path, config) => await Promise.resolve(),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  post: async (path, config) => await Promise.resolve(),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  put: async (path, config) => await Promise.resolve(),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  patch: async (path, config) => await Promise.resolve(),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  delete: async (path, config) => await Promise.resolve(),
};

/**
 * @type {httpMethodsType}
 */
const _http = Object.create(null);

// browser support methods
// ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PATCH', 'PUT']
const HTTP_METHOD = ['get', 'post', 'put', 'patch', 'delete'];
// can send data method
const CAN_SEND_METHOD = ['post', 'put', 'delete', 'patch'];

HTTP_METHOD.forEach(method => {
  // is can send data in opt.body
  const canSend = CAN_SEND_METHOD.includes(method);
  _http[method] = async (
    path,
    { data, query, timeout = 10000, headers = {} } = {},
  ) => {
    let url = path;
    const opts = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        ...headers,
      },
      credentials: 'include',
      timeout,
      mode: 'cors',
      cache: 'no-cache',
    };
    console.log('path', path, `\nheaders`, opts.headers);
    if (query) {
      const queryString = qs.stringify(filterObject(query, Boolean));
      url += `${url.includes('?') ? '&' : '?'}${queryString}`;
    }

    if (canSend && data) {
      opts.body = qs.stringify(filterObject(data, Boolean));
    }

    console.info('Request Url:', url);

    const res = await fetch(url, opts);
    return await res.json();
  };
});

export const http = _http;
