const debug = require('debug')('leo:develop');
import webpack from 'webpack';
import path from 'path';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import chalk from 'chalk';

import config from './webpack.config.develop';
import {
  genDatabase
} from 'develop/gen-database--watch';
import enablePlugins from 'utils/enable-plugins';
import loadLeorc from 'develop/load-leorc';
import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql/type';
import getPluginSchemas from 'leo-graphql/get-plugin-schemas';

export default () => {
  loadLeorc((err, conf) => {
    if(err) {
      throw new Error('error loading .leorc', err);
    }
    genDatabase(conf, (err, { data }) => {
      if (err) {
        throw new Error('failed to generate database', err);
      };

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
      const configWithUrls = config({ conf, data, urls: uniquedURLs });
      /**
       * Enable third party plugins.
       * This is where we hook in to allow things like `npm i leo-blogpost`
       */
      const configWithUrlsAndPlugins = enablePlugins(conf, configWithUrls);
      webpack(configWithUrlsAndPlugins.resolve()).run((err, stats) => {
        if (err) {
          // hard failure
          return console.error(chalk.red(err));
        }
        const jsonStats = stats.toJson();
        if (jsonStats.errors.length > 0) {
          //soft failure
          jsonStats.errors.forEach(e => console.error(chalk.red(e)))
        }
        if (jsonStats.warnings.length > 0) {
          jsonStats.warnings.forEach(warning => console.warn(chalk.yellow(warning)))
        }
        debug('built');
      });
    })
  });
}
