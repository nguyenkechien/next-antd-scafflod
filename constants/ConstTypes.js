export const RoleType = {
  1: 'Manager',
  10: 'User',
};

export const PRIVATE = 'PRIVATE',
  PRIVATE_ADMIN = 'PRIVATE_ADMIN',
  PUBLIC = 'PUBLIC',
  SHARE = 'SHARE',
  StaticFolder = '/static';

export const RouterType = {
  '/': {
    title: 'Home',
    type: SHARE,
  },
  '/user/list': {
    title: 'User List',
    type: PRIVATE_ADMIN,
  },
  '/user/detail': {
    title: 'User Detail',
    type: PRIVATE,
  },
  '/login': {
    title: 'Login',
    type: PUBLIC,
  },
};

export const SystemsData = {
  meta: {
    title: 'Next-Antd-Scaffold-Server',
    keyword: 'Next-Antd-Scaffold',
    description: 'Next-Antd-Scaffold',
  },
  header: {
    logo: {
      src: `${StaticFolder}/logo.png`,
      alt: 'logo',
    },
    menu: RouterType,
  },
  footer: [],
};

export const CookieKey = {
  AuthToken: 'auth-token',
  xAuth: 'x-auth',
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

export const InputFieldType = {
  TEXT: 'text',
  PASSWORD: 'password',
  CHECKBOX: 'checkbox',
  RADIO: 'Radio',
  SWITCH: 'switch',
};

export const FormID = {
  login: 'login',
};
