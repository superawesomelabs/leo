import webpackRequire from '../webpack-require';
import findLeorcPath from '../find-leorc-path';
import oDebug from 'debug';
const debug = oDebug('leo:graphql:database')

export function genDatabase(callback) {
  webpackRequire(findLeorcPath(), (err, factory, stats, fs) => {
    // leorc conf object
    const conf = factory();

    debug('files', conf.files);

    const data = {};
//    conf.files.map((str) => {
//  return require(str)
//})
    callback(null, {
      data,
      plugins: conf.plugins
    });
  })
}
