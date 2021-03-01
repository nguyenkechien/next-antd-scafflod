import { CookieKey } from '../constants/ConstTypes';
import logger from './Logger';
import { getCookies, setCookies, deleteCookies, isEmptyObj } from './util';
import { nextFetch } from './nextFetch';
import Endpoint from './../constants/ApiUrlForBE';
import { fetchUserProfileSuccess } from '../redux/actions/user';
import Router from 'next/router';

export class Auth {
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
   * @param {NextPageContext} ctx from next's getServerSideProps or getInitialProps : Context
   */
  static deleteAuthToken(ctx) {
    this.isAuthenticated = false;
    deleteCookies(CookieKey.AuthToken, ctx);
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
        if (isEmptyObj(profile)) {
          const setting = {
            headers: { Authorization: 'Bearer ' + result.token },
          };
          const res = await nextFetch.get(
            Endpoint.User.getUserProfile,
            setting,
            req,
          );
          const profileRes = fetchUserProfileSuccess(res.result);
          store.dispatch(profileRes);
          profile = profileRes.payload;
        }
        result.role = profile.role;
        result.isAuthenticated = true;
        this.isAuthenticated = true;
      }
    } catch (error) {
      logger.error(`error`, error);
      this.deleteAuthToken(ctx);
    }
    return result;
  }
}

export const redirectToLogin = ctx => {
  const { req, res, asPath } = ctx;
  if (res) {
    res.writeHead(302, { Location: `${Auth.redirectTo}?next=${req.url}` });
    res.end();
  } else {
    const next = asPath ? `?next=${asPath}` : '';
    Router.push(`${Auth.redirectTo}${next}`);
  }
};
