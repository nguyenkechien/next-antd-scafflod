import getConfig from 'next/config';
const {
  publicRuntimeConfig: { isDev },
} = getConfig();
let logger = {
  log: function() {},
  error: function() {},
  info: function() {},
};

isDev && (logger = console);

const window = window || {};
window.logger = logger;

export default logger;
