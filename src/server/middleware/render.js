import React from 'react';
import path from 'path';
import fs from 'fs';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Routes from '../../client/app/Routes';

const clientStats = require('../../../dist/stats.json');
// import Routes from '../../client/components/Routes';
// import Html from './html';
// console.log('ROUTES:::', Routes);
export default (req, res) => {
  console.log('GOT THE REQUEST IN RENDER:::');
  const context = {
    site: req.hostname.split('.')[0]
  };
  const html = renderToString(
    <StaticRouter location={req.originalUrl} context={context}>
      <Routes />
    </StaticRouter>
  );
  const chunkNames = flushChunkNames();
  console.log('CHUNK NAMES::', clientStats.assetsByChunkName);
  const { js, styles } = flushChunks(clientStats, {
    chunkNames
  });
  // const page = <Html content={html} styles={styles} scripts={js} cssHash={cssHash} />;
  res.send(`
      <html>
        <head>
          ${styles}
        </head>
        <body>
          <div id="react-root">${html}</div>
          ${js}
        </body>
      </html>
    `);
  // res.send(`<!doctype html>\n${renderToStaticMarkup(page)}`);

  // res.send(`
  //   <html>
  //     <head>
  //       ${styles}
  //     </head>
  //     <body>
  //       <div id="react-root">${app}</div>
  //       ${js}
  //       ${cssHash}
  //     </body>
  //   </html>
  // `);
};
