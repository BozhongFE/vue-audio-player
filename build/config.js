const path = require('path')
const vue = require('rollup-plugin-vue2')
// const css = require('rollup-plugin-css-only')
// const cssPorter = require('rollup-plugin-css-porter')
const postcss = require('rollup-plugin-postcss')
const buble = require('rollup-plugin-buble')
const uglify = require('rollup-plugin-uglify')
const autoprefixer = require('autoprefixer')

const name = process.env.npm_package_name;
const version = process.env.npm_package_version;

const banner =
  '/*!\n' +
  ' * ' + name + ' v' + version + '\n' +
  ' * (c) 2017-' + new Date().getFullYear() + ' Clay\n' +
  ' * Released under the MIT License.\n' +
  ' */';

const util = {
  toUpperCase(name) {
    const arr = name.split('-');
    arr.forEach((item, i) => {
      arr[i] = item.substr(0, 1).toUpperCase() + item.substr(1);
    });
    return arr.join('');
  }
}

const builds = {
  'dev': {
    input: 'index.js',
    file: path.resolve(__dirname, '../dist', name + '.js'),
    format: 'umd',
    moduleName: util.toUpperCase(name),
    banner
  },
  'prod': {
    input: 'index.js',
    file: path.resolve(__dirname, '../dist', name + '.min.js'),
    format: 'umd',
    moduleName: util.toUpperCase(name),
    env: 'production',
    banner,
    plugins: [
      uglify()
    ]
  },
  'esm': {
    input: 'index.js',
    file: path.resolve(__dirname, '../dist', name + '.esm.js'),
    format: 'es',
    moduleName: util.toUpperCase(name),
    banner
  }
}

function getConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.input,
    output: {
      file: opts.file,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    plugins: [
      vue(),
      postcss({
        extensions: ['.css'],
        plugins: [
          autoprefixer({
            browsers: ['iOS >= 8', 'Android >= 4.1']
          }),
        ]
      }),
      buble(),
    ].concat(opts.plugins || []),
  }

  return config
}

exports.getAllBuilds = () => Object.keys(builds).map(getConfig);