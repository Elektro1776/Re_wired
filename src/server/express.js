import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;
const webpack = require("webpack");
const config = require("../../config/webpack.dev.js");
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);
const staticMiddleware = express.static('dist');
app.use(staticMiddleware);
// debugger;
app.listen(port, () => {
  console.log('server is listening on ', port);
})
