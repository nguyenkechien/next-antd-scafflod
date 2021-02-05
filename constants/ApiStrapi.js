const isDev = process.env.NODE_ENV !== 'production';

const Strapi_API = isDev ? 'http://localhost:1337' : '';

export const ApiStrapi = {
  auth: Strapi_API + '/auth/local',
};

export const ReaderAccount = {
  identifier: 'reader@strapi.io',
  password: 'strapi',
};
