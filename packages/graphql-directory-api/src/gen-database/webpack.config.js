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
    entry: `database-loader?${JSON.stringify({files: filepaths})}!`,
    output: {
      path: outputPath,
      filename: 'database-bundle.js',
      library: 'LEODatabase',
      libraryTarget: 'commonjs2'
    },

    resolve: {
      extensions: ['.js', '.json']
    },
    resolveLoader: {
      modules: [
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
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0']
          }
        }]
      }]
    }
  };

  // Allow plugins to add loaders
  return config;
};
