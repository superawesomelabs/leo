import path from 'path';
//import webpackRequire from 'utils/webpack-require';
import config from 'leo-graphql/webpack.config.graphql';
import loadLeorc from 'develop/load-leorc';
import evaluate from 'eval';

import fs from 'fs';
import mkdirp from 'mkdirp';
import MemoryFS from 'memory-fs';
import webpack from 'webpack';
import oDebug from 'debug';
const debug = oDebug('leo:graphql:database');

export function genDatabase(callback) {
  loadLeorc((err, conf) => {

    const distFolder = path.resolve(process.cwd(), './dist');
    debug('files', conf.files);
    const compiler = webpack(config(conf.files, conf).resolve());
//    var fs = new MemoryFS();
    mkdirp.sync(distFolder);
//    compiler.outputFileSystem = fs;
    compiler.run((err, stats) => {
      /**
       * Start Error Checking
       */
      if (err) {
        // hard failure
        debug('webpack failed', err);
        return console.error(err);
      }
      const jsonStats = stats.toJson();
      if (jsonStats.errors.length > 0) {
        //soft failure
        debug('webpack stats errors', jsonStats.errors[0])
        return console.warn(jsonStats.errors);
      }
      if (jsonStats.warnings.length > 0) {
        debug('webpack stats warnings', jsonStats.warnings)
        return console.warn(jsonStats.warnings);
      }
      /**
       * End Error Checking
       */
      debug('dist output', fs.readdirSync(distFolder));
      const str = fs.readFileSync(distFolder + '/bundle.js').toString('utf-8');
      callback(null, {
        data: evaluate(str, 'api-database.json', null, true),
        plugins: conf.plugins
      });
    })
  })
}
