import http from 'http';
import { Logger } from '../common/loggers';

let app = require('./express').default;

const logger = new Logger({ name: 'server' });
let server = http.createServer();
server.on('request', app);
// addGraphQLSubscriptions(server);

server.listen(8080, () => {
  logger.info(`Server Listening @ localhost:8080`);
  // resolve(server);
});
// const serverPromise = new Promise(resolve => {
// });

server.on('close', () => {
  logger.info('SERVER CLOSED');
  server = undefined;
});
if (module.hot) {
  // console.log('TOP SERVER MODULE IS HOT:::', module.hot);
  module.hot.dispose(() => {
    // console.log('DISPOSE:::');
    try {
      if (server) {
        logger.info('CLOSING SERVER');
        server.close();
      }
    } catch (error) {
      logger.error(error.stack);
    }
  });
  module.hot.accept('./express', () => {
    console.log('ACCEPT EXPRESSS::');
    server.removeAllListeners('request');
    app = require('./express').default;
    server.on('request', app);
  });

  module.hot.accept();
}
// export default serverPromise;
