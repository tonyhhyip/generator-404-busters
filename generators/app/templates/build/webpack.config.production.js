'use strict';

const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const UglifyPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');

module.exports = merge.smart({
  plugins: [
    new UglifyPlugin({
      minimize: true,
      sourceMap: true,
    }),
    new AggressiveMergingPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  devtool: 'source-map',
}, require('./webpack.config.base'));
