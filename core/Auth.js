import { CookieKey } from '../constants/ConstTypes';
import { getCookies, setCookies, deleteCookies } from './util';

export class Auth {
  static info = null;

  /**
   *
   * @param {String} code token string
   * @param {*} ctx get from next's getServerSideProps or getInitialProps : Context
   */
  static saveAuthToken(code, ctx) {
    return setCookies(CookieKey.AuthToken, code, 2, ctx);
  }

  /**
   * @returns {String} String Token
   */
  static getAuthToken() {
    return getCookies(CookieKey.AuthToken);
  }
  /**
   * @param {*} ctx from next's getServerSideProps or getInitialProps : Context
   * @returns {String} String Token
   */
  static getAuthTokenOnServer(ctx) {
    const { req } = ctx;
    try {
      return getCookies(CookieKey.AuthToken, req);
    } catch (error) {
      console.log('GetAuthTokenOnServer error:', error);
      return '';
    }
  }

  /**
   * @param {*} ctx from next's getServerSideProps or getInitialProps : Context
   * @returns {String} String Token
   */
  static deleteAuthToken(ctx) {
    return deleteCookies(CookieKey.AuthToken, ctx);
  }
}
