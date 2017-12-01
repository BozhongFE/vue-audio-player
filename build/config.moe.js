const fs = require('fs')
const path = require('path')
const vue = require('rollup-plugin-vue2')
// const css = require('rollup-plugin-css-only')
// const cssPorter = require('rollup-plugin-css-porter')
const postcss = require('rollup-plugin-postcss')
const buble = require('rollup-plugin-buble')
const uglify = require('rollup-plugin-uglify')
const autoprefixer = require('autoprefixer')

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
    file: path.resolve(modulePath, name + '-debug.js'),
    format: 'umd',
    moduleName: util.toUpperCase(name),
  },
  'prod': {
    input: 'index.js',
    file: path.resolve(modulePath, name + '.js'),
    format: 'umd',
    moduleName: util.toUpperCase(name),
    env: 'production',
    plugins: [
      uglify()
    ]
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