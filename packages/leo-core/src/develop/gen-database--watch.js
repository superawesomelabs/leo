import path from 'path';
import mkdirp from 'mkdirp';
import config from 'leo-graphql/webpack.config.graphql';
import letPluginsPostProcessData from 'utils/let-plugins-post-process-data';
import evaluate from 'eval';

import fs from 'fs'
import MemoryFS from 'memory-fs';
import webpack from 'webpack';
import oDebug from 'debug';
const debug = oDebug('leo:graphql:database--watch');

export function genDatabase(conf, callback) {

  const distFolder = path.resolve(process.cwd(), './dist');
  debug('distFolder', distFolder);
  debug('files', conf.files);
  debug('dirs', process.cwd(), __dirname);
  const compiler = webpack(config(conf.files, conf).resolve());
//  var fs = new MemoryFS();
  mkdirp.sync(distFolder);
//  compiler.outputFileSystem = fs;
  compiler.watch({
    aggregateTimeout: 300
  }, (err, stats) => {
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
    const apiJSONAsString = fs.readFileSync(distFolder + '/bundle.js', 'utf-8');
    const apiJSON = evaluate(apiJSONAsString, 'api-database.json', null, true);
    letPluginsPostProcessData(conf.plugins, apiJSON, (err, resultingData) => {
      callback(null, {
        data: resultingData,
        plugins: conf.plugins
      });
    })
  })
}
