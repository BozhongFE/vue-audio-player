var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './demo'),
    publicPath: '/demo/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: 'style-loader!css-loader?-autoprefixer!less-loader'
          },
          postcss: [autoprefixer({
            // browsers: ['> 3%', 'last 3 versions', 'ie >= 9', 'iOS >= 7', 'Android >= 4.0'],
            browsers: ['iOS >= 8', 'Android >= 4.1'],
          })],
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|mp3)$/,
        loader: 'file-loader?limit=1024',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
}