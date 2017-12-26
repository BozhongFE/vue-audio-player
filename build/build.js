process.env.NODE_ENV = 'production'

var path = require('path')
var shell = require('shelljs')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

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