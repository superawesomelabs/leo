'use strict';
var loadConfig = require('rc');
var glob = require('glob');
var path = require('path');
var debug = require('debug')('leo:config-loader');

module.exports = function leoConfigLoader(content, map) {
  // Signal to webpack this is cacheable
  this.cacheable && this.cacheable();
  var callback = this.async();

  var conf = loadConfig('leo', {
    rootPath: '/',
    dataPath: './data',
    extensions: ['.post', '.md']
  });

  const exts = conf.extensions.join('|');
  glob(`${conf.dataPath}/**/*`, null, (err, files) => {
    conf.files = files || [];
    debug(`globbed ${files.length || 0} files`);
    return callback(null, 'module.exports = ' + JSON.stringify(conf));
  })
}
