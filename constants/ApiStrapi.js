const isDev = process.env.NODE_ENV !== 'production';

const Strapi_API = isDev ? 'http://localhost:1337' : '';

export const ApiStrapi = {
  auth: {
    login: Strapi_API + '/auth/local',
    me: Strapi_API + '/users/me',
    users: Strapi_API + '/users',
  },
};

export const ReaderAccount = {
  identifier: 'reader@strapi.io',
  password: 'strapi',
};
