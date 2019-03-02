const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var StatsPlugin = require('stats-webpack-plugin');

var customExtension = function() {
  return ['.web.', '.'].map(prefix => {
    console.log('prefix', prefix);
    return ['js', 'jsx'].map(ext => {
      console.log('PREFIX + EXT', prefix, ext);
      return prefix + ext
    })
  })
  .reduce((acc, val) => acc.concat(val))
  .concat(['.json'])

}
// console.log('CUSTOM EXTENSION::', customExtension());
module.exports = {
  name: 'client',
  entry: {
    vendor: ['react', 'react-dom', 'ramda'],
    main: ['webpack/hot/dev-server', `webpack-dev-server/client`,  'react-hot-loader/patch', './src/client/index.jsx']
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: '/',
    overlay: true,
    hot: true,
    stats: {
      colors: true
    },
    proxy: {
      '/': 'http://localhost:8080',
      // '/playground': {
      //   target: 'http://localhost:3000',
      //   bypass: function(req, res, proxyOptions) {
      //     console.log('REQ IN PROXY:', req.url);
      //
      //     console.log('PROXY OPTIONS:', proxyOptions);
      //     return true;
      //   }
      // }
    },
    port: 3000,
    publicPath: '/',
    open: true

  },
  resolve: {
    extensions: ['.web.jsx', '.web.js', '.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.graphql?$/,
        use: [
          {
            loader: 'webpack-graphql-loader'
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          // { loader:  "style-loader"}, // creates style nodes from JS strings
          ExtractCssChunks.loader,
          {
            loader: 'css-loader'
            // options: {
            //  modules: true
            // }
          },
          { loader: 'postcss-loader' }, // translates CSS into CommonJS
          { loader: 'sass-loader' } // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          }
        ]
      },
      {
        test: /.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({ hot: true,
          filename: "[name].css",
          chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true
      },
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
    new webpack.NamedModulesPlugin(),
    new StatsPlugin('stats.json',{

    }),
    new ManifestPlugin({
      fileName: 'assets.json'
    }),
    // new webpack.optimize.LimitChunkCountPlugin({
    //   maxChunks: 5
    // }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
