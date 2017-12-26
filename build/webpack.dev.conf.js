var merge = require('webpack-merge')
var webpack = require('webpack')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf')

// // add hot-reload related code to entry chunks
// var polyfill = 'eventsource-polyfill'
// var hotClient = 'webpack-hot-middleware/client?path=./__webpack_hmr&noInfo=true&reload=true'
// Object.keys(baseWebpackConfig.entry).forEach(function (name, i) {
//   var extras = i === 0 ? [polyfill, hotClient] : [hotClient]
//   extras = [hotClient]
//   baseWebpackConfig.entry[name] = extras.concat(baseWebpackConfig.entry[name])
// })

module.exports = merge(baseWebpackConfig, {
  // plugin: [
  //   // new webpack.NoEmitOnErrorsPlugin(),
  //   // new webpack.HotModuleReplacementPlugin()
  //   // new webpack.HotModuleReplacementPlugin({ multiStep: true, fullBuildTimeout: 200 })
  // ],
  // devServer: {
  // }
});
