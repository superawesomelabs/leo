/* @flow */
import path from 'path';
import mkdirp from 'mkdirp';
import config from './webpack.config.js';
import letPluginsPostProcessData from './let-plugins-post-process-data';
import evaluate from 'eval';
import enablePlugins from './enable-plugins';
import fs from 'fs'
//import MemoryFS from 'memory-fs';
import webpack from 'webpack';
import oDebug from 'debug';
const debug = oDebug('graphql-directory-api:gen-database');

type DatabaseInterface = {
  files: Array<string>;
  plugins: Array<string>;
  pluginOpts: { [key: string]: number };
  outputDir: string;
}
type Callback = (err: ?Error, data: ?Array<Object>) => void
export default function genDatabase({
  files=[],
  plugins=[],
  pluginOpts={},
  outputDir='./dist'
}: DatabaseInterface = {
  files: [],
  plugins: [],
  pluginOpts: {},
  outputDir: './dist'
}, callback: Callback) {

  // Skip everything if there are no files to glob
  if(files && files.length === 0) {
    debug('No files in folder');
    return callback(null, []);
  }

  const distFolder = path.resolve(process.cwd(), outputDir);
  debug('distFolder', distFolder);
  debug('files', files);
  debug('dirs', process.cwd(), __dirname);
  const createdConfig = enablePlugins(plugins, pluginOpts, config({
    filepaths: files,
    plugins
  }, {
    outputPath: outputDir
  }));
  const compiler = webpack(createdConfig.resolve());

  mkdirp.sync(distFolder);

  compiler.watch({
    aggregateTimeout: 300
  }, (err, stats) => {
    // Start Error Checking
    if (err) {
      // hard failure
      debug('webpack failed', err);
      callback(err);
      return;
    }
    const jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0) {
      //soft failure
      debug('webpack stats errors', jsonStats.errors[0]);
      callback(jsonStats.errors);
      return;
    }
    if (jsonStats.warnings.length > 0) {
      debug('webpack stats warnings', jsonStats.warnings);
      callback(jsonStats.warnings);
      return;
    }
    // End Error Checking
    debug('dist output', fs.readdirSync(distFolder));
    const apiJSONAsString = fs.readFileSync(distFolder + '/database-bundle.js', 'utf-8');
    const apiJSON = evaluate(apiJSONAsString, 'api-database.json', null, true);
    letPluginsPostProcessData(plugins, apiJSON, (err, resultingData) => {
      if(err) {
        return callback(err);
      }
      return callback(null, resultingData);
    })
  })
}
