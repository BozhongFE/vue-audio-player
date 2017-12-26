const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');

const exists = fs.existsSync;
const name = process.env.npm_package_name;
const version = process.env.npm_package_version;
let modulePath = process.env.npm_config_bz_mod;

if (typeof modulePath === 'undefined') {
  console.log('请先配置模块所在目录');
  console.log('Example: npm config set bz-mod "D:\\source"');
  throw new Error('没有配置模块路径');
} else if (!exists(modulePath)) {
  throw new Error('模块目录不存在，请检查配置的模块目录是否正确');
} else {
  modulePath = path.join(modulePath, name);
  if (!exists(modulePath)) {
    fs.mkdirSync(modulePath);
  }

  modulePath = path.join(modulePath, version);
  if (!exists(modulePath)) {
    fs.mkdirSync(modulePath);
  }
}

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(modulePath),
    filename: `${name}-debug.js`,
    libraryTarget: 'umd'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
});

module.exports = webpackConfig;