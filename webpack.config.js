/* eslint-env node */
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

var banner = fs.readFileSync(path.resolve('src/greasemonkey.txt'), {encoding: 'utf8'});

module.exports = {
  entry: [
    './src/main.js',
  ],
  output: {
    path: __dirname,
    filename: 'kittenautomator.user.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    // Put React into dev mode.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      }
    }),
    new webpack.BannerPlugin(banner, {raw: true}),
  ]
};
