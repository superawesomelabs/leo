import Config from 'webpack-configurator';
import enablePlugins from 'utils/enable-plugins';
import {
  resolve
}
from 'path';
import webpack from 'webpack';

/**
 * construct a string which will be interpreted literally as source code in the
 * entry file
 */
function mkRequireArray(paths) {
  return '[' + paths.map((str) => {
    return `require('${resolve(str)}')`
  }).join(',') + ']';
}

export default (filepaths, plugins) => {

  // create a new webpack-configurator instance
  const config = new Config();

  config.merge({
    target: 'node',
    entry: resolve(__dirname, 'entry-database.js'),
    output: {
      path: '/dist',
      library: true,
      libraryTarget: 'commonjs2'
    },

    resolve: {
      extensions: ['', '.js', '.json']
    },
    resolveLoader: {
      modulesDirectories: [
        'node_modules',
        /**
         * Allow leo's custom loaders to be accessed without specifying the full
         * path. ie: leo-markdown-loader vs './node_modules/leo-plugin-blog/...'
         */
        resolve(__dirname, 'loaders')
      ]
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },{
        test: /load-database-files.js$/,
        loaders: ['leo-database-loader', 'babel']
      }]
    },
    leoDatabase: {
      val: mkRequireArray(filepaths)
    }
  });

  /**
   * default to handling image requests and optimizing images since these can
   * be some of the heavier assets on a site. In the future, we should implement
   * a gradual loading mechanism that loads a low-res image, then the high-res.
   */
  config.loader('images', {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'url?limit=10000!img-loader?progressive=true'
  });

  /**
   * Allow plugins to add loaders to the database
   */
  return enablePlugins(plugins, config);
};
