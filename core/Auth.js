import { CookieKey } from '../constants/ConstTypes';
import logger from './Logger';
import { getCookies, setCookies, deleteCookies, isEmptyObj } from './util';
import nextFetch from './nextFetch';
import Endpoint from './../constants/ApiUrlForBE';
import { fetchUserProfileSuccess } from '../redux/actions/user';

export class Auth {
  static info = null;
  static redirectTo = '/login';
  static isAuthenticated = false;

  /**
   *
   * @param {String} code token string
   * @param {NextPageContext} ctx get from next's getServerSideProps or getInitialProps : Context
   */
  static saveAuthToken(code, ctx) {
    this.isAuthenticated = true;
    return setCookies(CookieKey.AuthToken, code, 2, ctx);
  }

  /**
   * @returns {String} String Token
   */
  static getAuthToken() {
    return getCookies(CookieKey.AuthToken) || '';
  }

  /**
   * @param {Request} req from next's getServerSideProps or getInitialProps : Context
   * @returns {String} String Token
   */
  static getAuthTokenOnServer(req) {
    try {
      return getCookies(CookieKey.AuthToken, req) || '';
    } catch (error) {
      console.log('GetAuthTokenOnServer error:', error);
      return '';
    }
  }

  /**
   *
   * @param {NextPageContext} ctx
   */
  static async authOnServer(ctx) {
    const { req, store } = ctx;
    const result = {
      role: null,
      token: '',
      isAuthenticated: false,
    };

    try {
      result.token = this.getAuthTokenOnServer(req);
      if (result.token) {
        let profile = store.getState().user.auth;
        result.role = profile.role;
        if (isEmptyObj(profile)) {
          const setting = {
            headers: { Authorization: 'Bearer ' + result.token },
          };
          const res = await nextFetch.get(
            Endpoint.User.getUserProfile,
            setting,
          );
          profile = fetchUserProfileSuccess(res.result);
          store.dispatch(profile);
          result.role = profile.payload.role;
        }
        result.isAuthenticated = true;
        this.isAuthenticated = result.isAuthenticated;
      }
    } catch (error) {
      logger.error(`error`, error);
      this.deleteAuthToken(ctx);
    }
    return result;
  }

  /**
   * @param {NextPageContext} ctx from next's getServerSideProps or getInitialProps : Context
   * @returns {String} String Token
   */
  static deleteAuthToken(ctx) {
    return deleteCookies(CookieKey.AuthToken, ctx);
  }
}
