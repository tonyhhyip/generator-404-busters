'use strict';

module.exports = {
  externals: {},
  entry: {
    app: ['./src/app'],
  },
  output: {
    path: `${__dirname}/../public`,
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'] },
    ]
  }
};
