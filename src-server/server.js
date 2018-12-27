import http from 'http';
import path from 'path';

import express from 'express';
import cors from 'cors';

import config from './config/config';
import Socket from './socket';

export default new class Server {

  constructor() {
    this.server();
  }

  /**
   * Start up auth server
   * @return {Promise.<void>}
   */
  async server() {

    // create express app
    this.app = express();

    this.server = http.createServer(this.app);

    this.app.use((req, res, next) => {
      const regExp = /(radek-side-scroller)/;
      if (regExp.test(req.url)) {
        req.url = req.url.replace(regExp, '');
      }
      next();
    });

    this.app.use(express.static(path.resolve(process.cwd())));
    new Socket(this.server);

    this.app.use(cors({
      origin: config.socket.origin,
      credentials: false,
    }));

    // start server
    this.listen();
  }

  listen() {
    this.server.listen(process.env.PORT || config.port, () => {
      console.info('port', process.env.PORT || config.port);
    });
  }
};
