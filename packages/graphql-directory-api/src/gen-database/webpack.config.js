/* @flow */
import Config from 'webpack-configurator';
import { resolve } from 'path';
import webpack from 'webpack';

type WebpackOpts = {|
  filepaths: [string],
  plugins: [string]
|};

export default ({ filepaths, plugins }: WebpackOpts,
                { outputPath }: {| outputPath: string |}) => {
  // create a new webpack-configurator instance
  const config = new Config();

  // merge some initial config in
  config.merge({
    target: 'node',
    entry: resolve(__dirname, '../runtime-assets/entry-database.js'),
    output: {
      path: outputPath,
      filename: 'database-bundle',
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
         * Allow custom loaders to be accessed without specifying the full
         * path. ie: database-loader vs './node_modules/database-loader/...'
         */
        resolve(__dirname, 'loaders')
      ]
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },{
        test: /load-database-files$/,
        loaders: ['database-loader', 'babel']
      }]
    },
    leoDatabase: {
      files: filepaths
    }
  });

  // Allow plugins to add loaders
  return config;
};
