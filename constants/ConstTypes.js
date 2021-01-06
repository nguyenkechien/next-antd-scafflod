export const RoleType = {
  1: 'Manager',
  10: 'User',
};

export const PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  PRIVATE_ADMIN = 'PRIVATE_ADMIN',
  SHARE = 'SHARE';

export const RouterType = {
  '/': {
    title: 'Home',
    type: SHARE,
  },
  '/user/list': {
    title: 'User List',
    type: PRIVATE,
  },
  '/user/detail': {
    title: 'User Detail',
    type: PRIVATE_ADMIN,
  },
  '/login': {
    title: 'Login',
    type: PUBLIC,
  },
};

export const CookieKey = {
  AuthToken: 'auth-token',
};

export const errorStatus = {
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required (Experimental)',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  500: 'Server Error',
};
