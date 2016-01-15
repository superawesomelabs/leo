import webpackRequire from 'webpack-require';
import path from 'path';
import EnsureLeorcPlugin from 'plugins/ensure-leorc-plugin';
import oDebug from 'debug';
const debug = oDebug('leo:webpack-require');

debug('__dirname', __dirname);
debug(path.resolve(__dirname, 'loaders'))

/**
 * A special require module made for sucking up files that may not exist in the
 * consumer's project, such as .leorc
 */
export default function(filepath, callback) {
  webpackRequire({
      resolveLoader: {
        modulesDirectories: [
          'node_modules',
          // leo's custom loaders
          path.resolve(__dirname, 'loaders')
        ]
      },
      module: {
        loaders: [{
          test: /.leorc/,
          loader: 'leo-config-loader'
        }]
      }
    },
    filepath,
    callback
  );
}

/**
 * Callback should look like the function below
 */

// function(err, factory, stats, fs) {
//   if (err) {
//     console.error(err);
//   }
//
//   // Invoke factory() to actually get an instance of your module.
//   // You can call it multiple times to get multiple independent copies
//   // of your module (useful for multiple requests in a single process).
//   // Note that this is fairly performant, since the file is only parsed
//   // once even if you call factory() multiple times.
//   var yourmodule = factory();
//
//   // You can inspect the build process by looking at the stats object
//
//   // fs can be used to read static assets from the bundle. They are mounted
//   // in the root directory. This is useful for extracting a static CSS
//   // stylesheet with ExtractTextPlugin by doing: fs.readFileSync('/style.css')
// }
