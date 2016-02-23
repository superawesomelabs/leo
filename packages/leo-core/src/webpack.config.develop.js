import StaticSiteGeneratorPlugin from './plugins/static-site-plugin';
import Config from 'webpack-configurator';
import path, { resolve } from 'path';
import webpack from 'webpack';
import findLeorcPath from 'utils/find-leorc-path';
import findLeoRoutesPath from 'utils/find-leoroutes-path';
import AssetsPlugin from 'assets-webpack-plugin';

/**
 * construct a string which will be interpreted literally as source code in the
 * entry file
 */
function mkRequireArray(paths) {
  return '[' + paths.map((str) => {
    console.log('mkRequireArray', str);
    return `require('${resolve(str)}')`
  }).join(',') + ']';
}

export default (filepaths, urls) => {

  // create a new webpack-configurator instance
  const config = new Config();

  config.merge({
    entry: {
      'static': path.resolve(__dirname, 'entry-static-watch.js')
    },

    target: 'node',
    node: {
      // do not include poly fills...
      console: true,
      process: false,
      global: false,
      buffer: false,
      __filename: false,
      __dirname: false
    },
    output: {
      // chunkhash can't be used in hmr
      filename: 'js/[name]-[chunkhash].js',
      path: 'dist',
      libraryTarget: 'commonjs2'
    },

    resolve: {
      extensions: ['', '.js', '.json', '.leorc']
    },
    resolveLoader: {
      modulesDirectories: [
        'node_modules',
        /**
         * Allow leo's custom loaders to be accessed without specifying the full
         * path. ie: leo-markdown-loader vs './node_modules/leo-plugin-blog/...'
         */
        path.resolve(__dirname, 'loaders')
      ]
    },
    plugins: [
      // new AssetsPlugin({
      //   path: path.resolve(process.cwd(), 'dist/js'),
      //   prettyPrint: true
      // }),
      new StaticSiteGeneratorPlugin('static', urls),
      /**
       * replaces require('.leorc') in application js files with the
       * location of a .leorc
       */
      new webpack.NormalModuleReplacementPlugin(
        /leorc/,
        findLeorcPath()
      ),
      /**
       * replaces require('leoroutes') in application js files with the
       * location of a routes.js
       */
      new webpack.NormalModuleReplacementPlugin(
        /leoroutes/,
        findLeoRoutesPath()
      )
    ],
    module: {
      noParse: [
        /node_modules\/rc/,
        /node_modules\/eval/,
        /copyof-get-plugin-schemas/,
      ],
      loaders: [{
        test: /.leorc/,
        loader: 'leo-config-loader'
      }, {
        test: /load-database-files.js$/,
        loaders: ['leo-database-loader', 'babel']
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            '@sa-labs/leo-core/build/babelRelayPlugin.js'
          ]
        }
      }, {
        test: /\.json/,
        loader: 'json'
      }]
    },
    leoDatabase: {
      val: mkRequireArray(filepaths)
    }
  });

  return config;
};
