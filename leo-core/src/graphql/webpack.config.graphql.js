import Config from 'webpack-configurator';
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

export default (filepaths) => {
  console.log('mkrequireArray', mkRequireArray(filepaths))
  // /**
  //  * Create a babel plugin which will replace `__DATA_FILES__` with require
  //  * statements; This allows webpack to execute the require statements so
  //  * loaders process them.
  //  */
  // function replace__DATA_FILES__({ types: t }) {
  //   return {
  //     visitor: {
  //       ReferencedIdentifier(path) {
  //         console.log('babel path', path)
  //         if (path.node.name === "__DATA_FILES__") {
  //           path.replaceWith(t.valueToNode(mkRequireArray(filepaths)));
  //         }
  //       }
  //     }
  //   };
  // }
console.log('__dirname', __dirname)
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
    // plugins: [
    //   new webpack.DefinePlugin({
    //     __DATA_FILES__: mkRequireArray(filepaths)
    //   })
    // ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }, {
        test: /\.post$/,
        exclude: /node_modules/,
        loaders: ['leo-markdown', 'frontmatter-loader']
      }, {
        test: /\.md$/,
        exclude: /node_modules/,
        loaders: ['leo-markdown']
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
   * load javascript and jsx files with babel.
   * Can be configured with a .babelrc
   */
  // config.loader('js', {
  //   test: /\.jsx?$/,
  //   exclude: /node_modules/,
  //   loader: 'babel',
  //   query: {
  //     presets: ['react', 'es2015', 'stage-0']
  //   }
  // });

  /**
   * default to handling image requests and optimizing images since these can
   * be some of the heavier assets on a site. In the future, we should implement
   * a gradual loading mechanism that loads a low-res image, then the high-res.
   */
  config.loader('images', {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'url?limit=10000!img-loader?progressive=true'
  });

  return config;
};
