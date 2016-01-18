import StaticSiteGeneratorPlugin from './plugins/static-site-plugin';
import Config from 'webpack-configurator';
import path from 'path';
import EnsureLeorcPlugin from './plugins/ensure-leorc-plugin';
import webpack from 'webpack';
import findLeoRoutesPath from 'utils/find-leoroutes-path';
import findLeorcPath from 'utils/find-leorc-path';
import AssetsPlugin from 'assets-webpack-plugin';


export default (urls) => {

  // create a new webpack-configurator instance
  const config = new Config();

  config.merge({
    entry: {
      'static': path.resolve(__dirname, 'entry-static.js'),
      'bundle': path.resolve(__dirname, 'entry-client.js')
    },

    output: {
      // chunkhash can't be used in hmr
      filename: 'js/[name]-[chunkhash].js',
      path: 'dist',
      libraryTarget: 'umd'
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
      /**
       * .leorc loader shouldn't be modified by consumers, so we merge it in
       * early without using `.loader()`
       */
      loaders: [{
        test: /.leorc/,
        loader: 'leo-config-loader'
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
      }]
    }
  });

  return config;
};
