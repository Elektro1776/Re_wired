import React from 'react';
import PropTypes from 'prop-types';
// import serialize from 'serialize-javascript';
// import clientModules from '../../client/src/modules';

const Html = ({ content, state, assetMap, css, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent(); // react-helmet html document tags
  const bodyAttrs = helmet.bodyAttributes.toComponent(); // react-helmet body document tags
  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="google-site-verification" content="3klRri1NqeZ12bXfOqZ66F5mzFx4xoZb-BFPr-aMpsc" />
        <meta name="google-site-verification" content="D17UY4YnYJMzKC5TFHUhCuhi3t7lGlgnVGxwVkU2fiQ" />
        <link rel="apple-touch-icon" sizes="180x180" href={`${assetMap['apple-touch-icon.png']}`} />
        <link rel="icon" type="image/png" href={`${assetMap['favicon-32x32.png']}`} sizes="32x32" />
        <link rel="icon" type="image/png" href={`${assetMap['favicon-16x16.png']}`} sizes="16x16" />
        <link rel="manifest" href={`${assetMap['manifest.xjson']}`} />
        <link rel="mask-icon" href={`${assetMap['safari-pinned-tab.svg']}`} color="#5bbad5" />
        <link rel="shortcut icon" href={`${assetMap['favicon.ico']}`} />
        {/* <link rel="pre-connect" href="https://s3-us-west-2.amazonaws.com" /> */}
        {/* <link rel="pre-connect" href="https://cdn.shopify.com" /> */}
        <meta name="msapplication-config" content={`${assetMap['browserconfig.xml']}`} />
        <meta name="theme-color" content="#ffffff" />

        {/* {!__DEV__ && <link rel="stylesheet" type="text/css" href={`${assetMap['index.css']}`} />} */}
        {/* {!!__DEV__ && (
          <style
            dangerouslySetInnerHTML={{
              __html: styles._getCss() + clientModules.stylesInserts.map(style => style._getCss()).join('')
            }}
          />
        )} */}
        {/* {!!css && css}
        {clientModules.scriptsInserts.map((script, i) => {
          if (script) {
            return <script key={i} src={script} />;
          }
        })} */}
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCb-6kBhsPsodgVOuaG6AubbqcmFx3sJiA&v=3.exp&libraries=geometry,drawing,places" /> */}
      </head>
      <body {...bodyAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: content || '' }} />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${serialize(state, {
              isJSON: true
            })};`
          }}
          charSet="UTF-8"
        /> */}
        {assetMap['vendor.js'] && <script src={`${assetMap['vendor.js']}`} charSet="utf-8" />}
        <script src={`${assetMap['index.js']}`} charSet="utf-8" />
        {/* <script src={`${assetMap['home.js']}`} charSet="utf-8" /> */}
      </body>
    </html>
  );
};

Html.propTypes = {
  content: PropTypes.string,
  state: PropTypes.object.isRequired,
  assetMap: PropTypes.object.isRequired,
  css: PropTypes.array,
  helmet: PropTypes.object
};
