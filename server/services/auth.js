import { ApiStrapi, ReaderAccount } from '../../constants/ApiStrapi';
import { CookieKey } from '../../constants/ConstTypes';
import { http } from '../../core/http';
import { getCookies, setCookies } from '../../core/util';

/**
 *
 * @param {ReaderAccount} user
 * @returns {Promise<{jwt: String, user: Object}>}
 */
export const AuthenUser = async user => {
  try {
    const userRes = await http.post(ApiStrapi.auth.login, { data: user });
    return userRes.statusCode && userRes.statusCode >= 400
      ? { jwt: '', user: {} }
      : userRes;
  } catch (error) {
    console.log(`error`, error);
    return {
      jwt: '',
      user: {},
    };
  }
};

export const getTokenReader = async ctx => {
  const jwtToken = getCookies(CookieKey.jwtToken, ctx.req);
  if (!jwtToken) {
    const reader = await AuthenUser(ReaderAccount);
    setCookies(CookieKey.jwtToken, reader.jwt, 30, ctx);
    return reader.jwt;
  }
  return jwtToken;
};
