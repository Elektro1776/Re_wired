import express from 'express';
//
// import webpack from 'webpack';
import expressStaticGzip from 'express-static-gzip';
// import configDevClient from '../../webpack/webpack.dev-client';
// import configDevServer from '../../webpack/webpack.dev-server';
// import clientConfigProd from '../../webpack/webpack.prod-client';
// import serverConfigProd from '../../webpack/webpack.prod-server';
import expressPlayground from 'graphql-playground-middleware-express';
import createApolloServer from './apolloServer';
import renderMiddleWare from './middleware/render';

// const app = express();
// const port = process.env.PORT || 8080;
// const isProd = process.env.NODE_ENV === 'production';
//
// const isDev = !isProd;
// let isBuilt = false;
// const init = () => {
const app = express();
// const port = process.env.PORT || 8080;
// const isProd = process.env.NODE_ENV === 'production';

// let isBuilt = false;
const graphServer = createApolloServer();

graphServer.applyMiddleware({ app });
app.use(expressStaticGzip('dist'));
//   !isBuilt &&
//   app.listen(port, () => {
//     isBuilt = true;
//     console.log('BUILD COMPLETE -- Listening @ http://localhost:8080');
//   });
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
app.use((...args) => renderMiddleWare(...args));

if (module.hot) {
  console.log('MODULE: HOT::');
  // module.hot.dispose(() => {});
  module.hot.accept(['../../dist/stats.json', './middleware/render', './apolloServer'], () => {
    // console.log('ACCEPTED HOT MODULE::');
  });
  module.hot.accept();
}
export default app;
