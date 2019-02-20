const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  name: "client",
  entry: {
    vendor: ['react', 'react-dom'],
    main: [
      "webpack-hot-middleware/client?reload=true",
      'react-hot-loader/patch',
       "./src/main.js"]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devtool: 'source-map',
  devServer: {
    contentBase: "dist",
    overlay: true,
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
              { loader:  "css-loader"
                 // options: {
                 //  modules: true
                 // }
              },
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
        new ExtractCssChunks({ hot: true }),
     new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        WEBPACK: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
