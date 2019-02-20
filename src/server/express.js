import express from 'express';

import webpack from 'webpack';
import expressStaticGzip from 'express-static-gzip';

import configDevClient from '../../config/webpack.dev-client';
import configDevServer from '../../config/webpack.dev-server';
import clientConfigProd from '../../config/webpack.prod-client';
import serverConfigProd from '../../config/webpack.prod-server';

const app = express();
const port = process.env.PORT || 8080;
const isProd = process.env.NODE_ENV === 'production';

const isDev = !isProd;
let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(port, () => {
    isBuilt = true;
    console.log('BUILD COMPLETE -- Listening @ http://localhost:8080');
  });

if (isDev) {
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

  const compiler = webpack([configDevClient, configDevServer]);

  const clientCompiler = compiler.compilers[0];
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler);

  const webpackHotMiddlware = require('webpack-hot-middleware')(clientCompiler);

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  app.use(webpackHotServerMiddleware(compiler));
  webpackDevMiddleware.waitUntilValid(done);
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const serverRender = require('../../build/prod-server-bundle.js').default;
    app.use(expressStaticGzip('dist'));
    app.use('*', serverRender({ clientStats }));

    done();
  });
}
