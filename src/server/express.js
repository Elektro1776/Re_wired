import express from 'express';
import path from 'path';
import { renderToString } from "react-dom/server"
const expressStaticGzip = require("express-static-gzip")

import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import webpack from "webpack";
import configDevClient from '../../config/webpack.dev-client.js';
import configDevServer from '../../config/webpack.dev-server.js';
import clientConfigProd from '../../config/webpack.prod-client.js';
import serverConfigProd from '../../config/webpack.prod-server.js';

const app = express();
const port = process.env.PORT || 8080;
const isProd = process.env.NODE_ENV === "production"

const isDev = !isProd
let isBuilt = false
const { publicPath } = configDevClient.output
const outputPath = configDevClient.output.path


const done = () => !isBuilt
  && app.listen(8080, () => {
    isBuilt = true
    console.log('BUILD COMPLETE -- Listening @ http://localhost:8080')
  })

if (isDev) {
const compiler = webpack([configDevClient, configDevServer])

  const clientCompiler = compiler.compilers[0]
  const serverCompiler = compiler.compilers[1]
  const webpackDevMiddleware = require("webpack-dev-middleware")(compiler);

  const webpackHotMiddlware = require("webpack-hot-middleware")(clientCompiler);

  app.use(webpackDevMiddleware)
  app.use(webpackHotMiddlware)
  app.use(webpackHotServerMiddleware(compiler))
  webpackDevMiddleware.waitUntilValid(done);

}
else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const serverStats = stats.toJson().children[1];
    const serverRender = require('../../build/prod-server-bundle.js').default
        app.use(
      expressStaticGzip("dist")
    )
    app.use("*", serverRender({ clientStats }))

    done()
  })
}
