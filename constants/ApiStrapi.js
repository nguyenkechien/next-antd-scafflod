const { publicRuntimeConfig } = require('./../next.config');
const { Strapi_API } = publicRuntimeConfig;

export const ApiStrapi = {
  auth: Strapi_API + '/auth/local',
};

export const ReaderAccount = {
  identifier: 'reader@strapi.io',
  password: 'strapi',
};
