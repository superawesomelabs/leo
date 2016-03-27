import StaticSiteGeneratorPlugin from './plugins/static-site-plugin';
import Config from 'webpack-configurator';
import path, { resolve } from 'path';
import webpack from 'webpack';
import findLeoRoutesPath from 'utils/find-leoroutes-path';
import AssetsPlugin from 'assets-webpack-plugin';
import serialize from 'serialize-javascript';

export default ({ conf, data, urls }) => {

  // create a new webpack-configurator instance
  const config = new Config();

  config.merge({
    entry: {
      'static': path.resolve(__dirname, 'entry-static-watch.js'),
//      'client': path.resolve(__dirname, 'entry-client.js')
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

    externals: [/^graphql/],
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
       new AssetsPlugin({
         path: path.resolve(process.cwd(), 'dist/js'),
         prettyPrint: true
       }),
      new StaticSiteGeneratorPlugin('static', urls),
      /**
       * replaces require('.leorc') in application js files with the
       * location of a .leorc
       */
      new webpack.NormalModuleReplacementPlugin(
        /leorc/,
        resolve(__dirname + 'leo.js') // A file we know exists but won't actually use
      ),
      /**
       * replaces require('leoroutes') in application js files with the
       * location of a routes.js
       */
      new webpack.NormalModuleReplacementPlugin(
        /leoroutes/,
        findLeoRoutesPath()
      ),
      // definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
      new webpack.DefinePlugin({
        __LEORC__: JSON.stringify(conf),
        __DATA__: JSON.stringify(data)
      })
      
    ],
    module: {
      noParse: [
        /node_modules\/rc/,
        /node_modules\/eval/,
        /copyof-get-plugin-schemas/,
      ],
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(graphql|node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            '@sa-labs/leo-core/build/babelRelayPlugin.js'
          ],
          cacheDirectory: path.resolve(process.cwd(), '.babelcache')
        }
      }, {
        test: /\.json/,
        loader: 'json'
      }]
    }
  });

  return config;
};
