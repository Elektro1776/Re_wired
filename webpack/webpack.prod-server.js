const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const res = p => path.resolve(__dirname, p);

const nodeModules = res('../node_modules');
const externals = fs
  .readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = {
  name: 'server',
  target: 'node',
  externals: externals,
  entry: './src/server/render.js',
  mode: 'production',
  output: {
    filename: 'prod-server-bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2'
  },
  stats: 'verbose',
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx']
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
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }, // translates CSS into CommonJS
          {
            loader: 'sass-loader'
          } // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[ext]',
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
    // new webpack.HashedModuleIdsPlugin()
  ]
};
