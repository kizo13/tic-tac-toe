const webpack = require('webpack');
const path = require('path');
const ReplacePlugin = require('replace-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    filename: "app.js",
    path: __dirname + "/public",
    publicPath: "/"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx"],
    modules: [
      path.resolve(__dirname + '/src'),
      path.resolve(__dirname + '/node_modules')
    ]
  },

  module: {
    loaders: [
      { enforce: 'pre', test: /\.js$/, loader: "source-map-loader" },
      { test: /\.jsx?$/, loader: 'babel-loader', query: {presets: ['react']}, exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({fallback: "style-loader", use: [{loader: "css-loader"}, {loader: "sass-loader"}]}) },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.(jpg|png)$/, loader: 'url-loader?limit=5000&name=images/[name].[ext]' }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 8080,
  },

  watch: true,

  plugins: [
    new ReplacePlugin({
      entry: '/src/index.html',
      output: '/public/index.html'
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.ExtendedAPIPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};