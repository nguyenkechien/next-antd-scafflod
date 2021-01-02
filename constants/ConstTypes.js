export const RoleType = {
  1: 'Manager',
  10: 'User',
};

export const PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
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
    type: PRIVATE,
  },
  '/login': {
    title: 'Login',
    type: PUBLIC,
  },
};

export const CookieKey = {
  AuthToken: 'auth-token',
};
