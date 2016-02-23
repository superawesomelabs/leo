const debug = require('debug')('leo:develop');
import webpack from 'webpack';
import path from 'path';
import map from 'lodash/map';
import uniq from 'lodash/uniq';

import config from './webpack.config.develop';
import {
  genDatabase
} from 'utils/gen-database';
import enablePlugins from 'utils/enable-plugins';
import loadLeorc from './develop/load-leorc';

export default () => {
  loadLeorc((err, conf) => {
    if(err) {
      throw new Error('error loading .leorc', err);
    }
    genDatabase((err, { data }) => {
      if (err) {
        throw new Error('failed to generate database', err);
      };
      // debug('data urls', map(data, 'attributes.url'));
      /**
       * The following length comparison if intended to determine if we have
       * duplicate urls. That would mean we have two files trying to render
       * themselves at the same location.
       */
      const totalURLs = conf.urls.concat(map(data, 'attributes.url'));
      const uniquedURLs = uniq(totalURLs);
      if(totalURLs.length !== uniquedURLs.length) {
        /**
         * In the future, figure out which url it is to give better error
         * message
         */
        throw new Error('Two documents have the same URL. You should try to fix this')
      }
      const configWithUrls = config(conf.files, uniquedURLs);
      /**
       * Enable third party plugins.
       * This is where we hook in to allow things like `npm i leo-blogpost`
       */
      const configWithUrlsAndPlugins = enablePlugins(conf.plugins, configWithUrls);
      webpack(configWithUrlsAndPlugins.resolve()).run((err, stats) => {
        debug('ran');
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
    })
  });
}
