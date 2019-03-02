/* eslint-disable import/no-extraneous-dependencies*/
const dotenv = require('dotenv');
require('babel-register');
require('babel-polyfill');

dotenv.config();

require('./server');

const { Logger } = require('../common/loggers');

const logger = new Logger({ name: 'indexLogger' });
// logger.info(process.env);
process.on('uncaughtException', ex => {
  logger.error(ex);
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error(reason);
});

if (module.hot) {
  module.hot.status(event => {
    if (event === 'abort' || event === 'fail') {
      console.log('SENDING 250 CODE FROM HMR');
      // log('HMR error status: ' + event);
      // Signal webpack.run.js to do full-reload of the back-end
      process.exit(250);
    }
  });

  module.hot.accept();
}
