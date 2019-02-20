import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router"
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import Routes from "../client/components/Routes.jsx"
export default ({ clientStats }) => (req, res) => {

    const context = {
      site: req.hostname.split(".")[0]
    }
    const app = renderToString(
      <StaticRouter location={req.originalUrl} context={context}>
        <Routes />
      </StaticRouter>
    )
  const chunkNames = flushChunkNames()
  const {
    js, styles, scripts, stylesheets, cssHash
  } = flushChunks(clientStats, {
    chunkNames
  });
  res.send(`
    <html>
      <head>
        ${styles}
      </head>
      <body>
        <div id="react-root">${app}</div>
        ${js}
        ${cssHash}
      </body>
    </html>
  `)
}
