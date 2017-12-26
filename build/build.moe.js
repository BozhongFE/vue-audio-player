process.env.NODE_ENV = 'production'

var path = require('path')
var shell = require('shelljs')
var webpack = require('webpack')
var webpackConfig = require('./webpack.moe.conf')
var webpackConfigDebug = require('./webpack.moe-debug.conf')

var assetsPath = path.join(__dirname, '../dist')
shell.rm('-rf', assetsPath)

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})

webpack(webpackConfigDebug, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})