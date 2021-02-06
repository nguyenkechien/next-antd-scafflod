const path = require('path');
const server = require('./server/index').default;

const next = require('next');
const { publicRuntimeConfig, serverRuntimeConfig } = require('./next.config');
const { isDev } = publicRuntimeConfig;
const { PORT } = serverRuntimeConfig;

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.get('/user/detail/:username', (req, res) => {
    const { username } = req.params;
    return app.render(req, res, '/user/detail', { username });
  });
  server.get('/favicon.ico', (req, res) =>
    res.sendFile(path.join(__dirname, 'static', 'favicon.ico')),
  );

  server.get('*', (req, res) => handle(req, res));

  server.startServer(PORT, isDev);
});
