var masterConfig = require('./rollup.config.js');
var rollup = require('rollup');
var path = require('path');
rollup.rollup(masterConfig).then(function(bundle){
  bundle.write({
    format: 'amd',
    dest: path.resolve(__dirname, '../dest/audio-player.js')
  });
});