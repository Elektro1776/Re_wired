import express from 'express';

import webpack from 'webpack';
import expressStaticGzip from 'express-static-gzip';
import configDevClient from '../../webpack/webpack.dev-client';
import configDevServer from '../../webpack/webpack.dev-server';
import clientConfigProd from '../../webpack/webpack.prod-client';
import serverConfigProd from '../../webpack/webpack.prod-server';

// import createApolloServer from './apolloServer';

// const app = express();
// const port = process.env.PORT || 8080;
// const isProd = process.env.NODE_ENV === 'production';
//
// const isDev = !isProd;
// let isBuilt = false;

const initServer = () => {
  const app = express();
  const port = process.env.PORT || 8080;
  const isProd = process.env.NODE_ENV === 'production';

  const isDev = !isProd;
  let isBuilt = false;
  // const graphServer = await createApolloServer();
  // graphServer.applyMiddleWare({ app });
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
};

initServer();
