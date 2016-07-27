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

export default (filepaths, leoConf) => {

  // create a new webpack-configurator instance
  const config = new Config();

  config.merge({
    target: 'node',
    entry: resolve(__dirname, 'entry-database.js'),
    output: {
      path: 'dist',
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
   * Allow plugins to add loaders to the database
   */
  return enablePlugins(leoConf, config);
};
