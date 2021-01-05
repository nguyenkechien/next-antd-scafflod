import express from 'express';
import bodyParser from 'body-parser';
import routes from './routers';
const cp = require('child_process');

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(routes);

/**
 *
 * @param {Number} PORT
 * @param {Boolean} isDev
 * @type {VoidFunction}
 */
server.startServer = (PORT, isDev) => {
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
};

export default server;
