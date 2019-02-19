const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: ["core-js/fn/promise", "./src/main.js"]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devtool: 'source-map',
  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        use: [
              { loader:  "style-loader"}, // creates style nodes from JS strings
              { loader:  "css-loader" },
              { loader: "postcss-loader" }, // translates CSS into CommonJS
              { loader: "sass-loader" } // compiles Sass to CSS, using Node Sass by default
            ]
      },
      {
        test: /.html$/,
        use: [
          {
            loader: "html-loader",
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
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
