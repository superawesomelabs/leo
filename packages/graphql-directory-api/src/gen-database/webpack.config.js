/* @flow */
import { resolve } from 'path';
import webpack from 'webpack';

type WebpackOpts = {|
  filepaths: [string],
  plugins: [string]
|};

export default ({ filepaths, plugins }: WebpackOpts,
                { outputPath }: {| outputPath: string |}) => {
  // merge some initial config in
  const config = {
    target: 'node',
    entry: 'database-loader!',//resolve(__dirname, '../runtime-assets/entry-database.js'),
    output: {
      path: outputPath,
      filename: 'database-bundle.js',
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
         * To allow this to work in dev and after build, loaders folder
         * should be at ./loaders from the artifact
         */
        resolve(__dirname, './loaders')
      ]
    },
    module: {
      noParse: [
        /get-plugin-schemas/,
        /enable-plugins/,
      ],
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },{
        test: /load-database-files.js$/,
        loaders: ['database-loader', 'babel']
      }]
    },
    database: {
      files: filepaths
    }
  };

  // Allow plugins to add loaders
  return config;
};
