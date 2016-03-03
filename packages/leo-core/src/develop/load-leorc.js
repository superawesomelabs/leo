var loadConfig = require('rc-loader');
var glob = require('glob');
var path = require('path');
var debug = require('debug')('leo:develop:load-leorc');

export default function loadConfig(callback) {
  var conf = loadConfig('leo', {
    rootPath: '/',
    dataPath: './data',
    extensions: ['.post', '.md']
  });

  const exts = conf.extensions.join('|');
  glob(`${conf.dataPath}/**/*`, {
    nodir: true,
    ignore: [
      `${conf.dataPath}/**/*.jpeg`,
      `${conf.dataPath}/**/*.jpg`,
      `${conf.dataPath}/**/*.svg`,
      `${conf.dataPath}/**/*.gif`,
      `${conf.dataPath}/**/*.png`
    ]
  }, (err, files) => {
    conf.files = files || [];
    debug(`globbed ${files.length || 0} files`);
    return callback(null, conf);
  })
}
