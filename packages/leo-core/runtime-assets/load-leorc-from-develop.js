import cosmiconfig from 'cosmiconfig';
var glob = require('glob');
var path = require('path');
var debug = require('debug')('leo:develop:load-leorc-from-develop');

export default function loadConfig(callback) {
  cosmiconfig('leo', {})
    .then(({ config, filepath }) => {

      debug('using config found at', filepath);

      // overwrite default values if set in userconfig
      const conf = Object.assign({}, {
        rootPath: '/',
        dataPath: './data',
        extensions: ['.post', '.md']
      }, config);

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
    })
    .catch(parsingError => {
      debug('parsing error', parsingError);
      callback(parsingError);
    });
}
