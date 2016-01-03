const debug = require('debug')('leo:build');
import webpack from 'webpack';
import config from './webpack.config';
import path from 'path';
import webpackRequire from './webpack-require';
import findLeorcPath from './find-leorc-path';
import enablePlugins from './enable-plugins';

export default (program) => {
  return () => {
    webpackRequire(findLeorcPath(), (err, factory, stats, fs) => {

      debug('webpackRequire Error', err)
      const conf = factory();
      const configWithUrls = config(conf.urls);
      /**
       * Enable third party plugins.
       * This is where we hook in to allow things like `npm i leo-blogpost`
       */
      const configWithUrlsAndPlugins = enablePlugins(conf.plugins, configWithUrls);
      webpack(configWithUrlsAndPlugins.resolve()).run((err, stats) => {
        debug('ran')
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
        debug('built');
      });
    });
  }
}
