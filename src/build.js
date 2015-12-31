const debug = require('debug')('leo:build');
import webpack from 'webpack';
import config from './webpack.config';
import path from 'path';
import webpackRequire from './webpack-require';
import findLeorcPath from './find-leorc-path';

const postPlugin = (config) => {
  config.loader('posts', {
    test: /\.post$/,
    exclude: /node_modules/,
    loaders: ['leo-markdown', 'frontmatter']
  });
  config.merge((current) => {
    current.resolve.extensions.push('.post');
    return current;
  })
  return config;
}

const enablePlugins = (config) => {
  const newconfig = postPlugin(config);
  return newconfig;
}

export default (program) => {
  return () => {
    const urls = ['/']; // TODO: should be some sort of "getRoutes()"

    const configWithUrls = config(urls);
    /**
     * Enable third party plugins.
     * This is where we hook in to allow things like `npm i leo-blogpost`
     */
    const configWithUrlsAndPlugins = enablePlugins(configWithUrls);
    webpackRequire(findLeorcPath(), (err, factory, stats, fs) => {
      debug('webpackRequire Error', err)
      debug('factory', factory())
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
