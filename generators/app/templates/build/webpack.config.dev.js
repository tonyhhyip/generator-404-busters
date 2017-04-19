'use strict';

const merge = require('webpack-merge');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = merge.smart({
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
  entry: {
    app: ['webpack-dev-server/client?http://localhost:8080/'],
  },
  devtool: 'source-map',
}, require('./webpack.config.base'));
