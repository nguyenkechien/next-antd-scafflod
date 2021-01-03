import router from 'next/router';
import { CookieKey } from '../constants/ConstTypes';
import logger from './Logger';
import { getCookies, setCookies, deleteCookies } from './util';

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
   *
   * @param {NextPageContext} ctx
   */
  static authOnClient(ctx = {}) {
    const token = this.getAuthToken();
    const isAuthenticated = token && token.length > 0;
    this.isAuthenticated = isAuthenticated;
    const next = ctx.asPath ? `?next=${ctx.asPath}` : '';
    !isAuthenticated && router.push(`${this.redirectTo}${next}`);
    return { isAuthenticated, token };
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
  static authOnServer(ctx) {
    const { req, res } = ctx;
    try {
      const token = this.getAuthTokenOnServer(req);
      const isAuthenticated = token && token.length > 0;
      this.isAuthenticated = isAuthenticated;
      if (!isAuthenticated) {
        res.writeHead(302, { Location: `${this.redirectTo}?next=${req.url}` });
        res.end();
      }
      return { isAuthenticated, token };
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * @param {NextPageContext} ctx from next's getServerSideProps or getInitialProps : Context
   * @returns {String} String Token
   */
  static deleteAuthToken(ctx) {
    return deleteCookies(CookieKey.AuthToken, ctx);
  }
}
