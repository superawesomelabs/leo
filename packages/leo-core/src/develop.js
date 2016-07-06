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

const webpackDevServerOptions = {
  contentBase: "/dist",
  // or: contentBase: "http://localhost/",
  hot: true,
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,

  // Set this if you want to enable gzip compression for assets
  compress: true,
  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: true,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: "/assets/",
  stats: { colors: true }
}

export default () => {
  loadLeorc((err, conf) => {
    if(err) {
      throw new Error('error loading .leorc', err);
    }
    let server;
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
      if(server) {
        server.close();
        server = null;
      }
      server = new WebpackDevServer(configWithUrlsAndPlugins.resolve(),
                                    webpackDevServerOptions);
      server.listen(8080, "localhost", function() {});
    })
  });
}
