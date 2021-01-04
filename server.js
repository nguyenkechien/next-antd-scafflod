const cp = require('child_process');
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

  server.listen(PORT, err => {
    if (err) throw err;
    const serverUrl = `http://localhost:${PORT}`;
    console.log(`> Ready on ${serverUrl}`);
    // development auto open browser
    if (isDev) {
      switch (process.platform) {
        // macos
        case 'darwin':
          cp.exec(`open ${serverUrl}`);
          break;
        // windows
        case 'win32':
          cp.exec(`start ${serverUrl}`);
          break;
        default:
          cp.exec(`open ${serverUrl}`);
      }
    }
  });
});
