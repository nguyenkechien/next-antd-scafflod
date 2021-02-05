/* eslint-disable no-unused-vars */
import { CookieKey } from '../constants/ConstTypes';
import { Auth } from './Auth';
import { getCookies } from './Cookie';
import { http, ConfigType } from './http';
import { resType } from './utilServer';

export const nextFetchMethodsType = {
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<resType>}
   */
  get: async (path, config) => await Promise.resolve(resType),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<resType>}
   */
  post: async (path, config) => await Promise.resolve(resType),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<resType>}
   */
  put: async (path, config) => await Promise.resolve(resType),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<resType>}
   */
  patch: async (path, config) => await Promise.resolve(resType),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<resType>}
   */
  delete: async (path, config) => await Promise.resolve(resType),
};

// initial fetch
/**
 * @type {nextFetchMethodsType}
 */
const _nextFetch = Object.create(null);

Object.keys(http).forEach(function(method) {
  _nextFetch[method] = (
    path,
    { data, query, timeout = 10000, headers = {} } = {},
    req,
  ) => {
    const _headers = {
      Authorization: 'Bearer ' + Auth.getAuthToken(),
      [CookieKey.xAuth]: getCookies(CookieKey.xAuth, req),
      ...headers,
    };

    return new Promise(async (resolve, reject) => {
      http[method](path, {
        data,
        query,
        timeout,
        headers: _headers,
      }).then(({ code = 200, message, errors, ...res }) => {
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

export const nextFetch = _nextFetch;
