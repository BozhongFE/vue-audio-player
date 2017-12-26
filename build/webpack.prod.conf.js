const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});

module.exports = webpackConfig;