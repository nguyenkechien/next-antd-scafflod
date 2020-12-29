import * as cookie from 'cookie';

/**
 *
 * @param {String} key name of the cookie
 * @param {any} value value of the cookie
 * @param {Number} duration duration of the cookie (in days), cookie will be expired after this duration
 * @param {*} ctx get from next's getServerSideProps or getInitialProps : Context
 */
export const setCookies = (key, value, duration, ctx) => {
  if (ctx && ctx.req && ctx.res) {
    let cookies = ctx.req.headers.cookie || [];
    if (typeof cookies === 'string') cookies = [cookies];
    if (typeof cookies === 'number') cookies = [];

    if (duration !== 0) {
      let d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * duration);
      const serializedCookie = cookie.serialize(key, value, {
        expire: d.toGMTString(),
      });
      cookies.push(serializedCookie);
    }
    ctx.res.setHeader('Set-Cookie', cookies);
  }

  if (process.browser) {
    let d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * duration);
    document.cookie = key + '=' + value + ';path=/;expire=' + d.toGMTString();
  }
};

/**
 *
 * @param {String} key cookie's key
 * @param {Request} req get from next's getServerSideProps or getInitialProps : Context
 */
export const getCookies = (key, req) => {
  if (process.browser) return getCookiesFromClient(key);
  return req ? getCookiesFromServer(key, req) : '';
};

/**
 *
 * @param {String} key
 */
export const getCookiesFromClient = key => {
  const name = key + '=';
  const decodedCookies = decodeURIComponent(document.cookie);
  const ca = decodedCookies.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
};
/**
 *
 * @param {String} key cookie's key
 * @param {Request} req get from next's getServerSideProps or getInitialProps : Context
 */
export const getCookiesFromServer = (key, req) => {
  if (req.headers.cookie) {
    const rawCookie = req.headers.cookie
      .split(';')
      .find(c => c.trim().startsWith(`${key}=`));

    if (rawCookie) return rawCookie.split('=')[1];
  }
  return '';
};

/**
 *
 * @param {String} key cookie's key
 * @param {*} ctx get from next's getServerSideProps or getInitialProps : Context
 */
export const deleteCookies = (key, ctx) => {
  setCookies(key, '', -1, ctx);
};
