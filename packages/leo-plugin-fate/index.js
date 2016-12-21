var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var constants = require('@sa-labs/fate-core/manual')();

module.exports = function configure(config, opts) {
  opts = opts || {};

  // Project's CSS. Run CSS in modules mode with postcss
  config.module.loaders.push({
    test: /\.css$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
  });

  // Project's global css. Run PostCSS but not modules mode.
  config.module.loaders.push({
    test: /\.global\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
  });

  // Third Party CSS. From node_modules. Don't process, just load.
  config.module.loaders.push({
    test: /\.css$/,
    include: /node_modules/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
  });

  const extract = new ExtractTextPlugin('styles.[contenthash].css', {
    allChunks: true
  });
  if(config.plugins) {
    config.plugins.push(extract);
  } else {
    config.plugins = [extract];
  }

  config.postcss = opts.postcss || [
      require('postcss-import'),
      require('postcss-brand-colors'),
      require('postcss-constants')({
        defaults: constants
      }),
      require('postcss-modular-scale')({
        bases: 1,
        ratios: 1.5
      }),
      require('postcss-responsive-type'),
      require('postcss-cssnext')({
        browsers: 'last 2 versions'
      }),
      require('lost')({
        flexbox: 'flex'
      }),
      require('postcss-font-magician')({
        hosted: './static/fonts'
      }),
      // require('list-selectors').plugin(function(selectorList) {
      //   console.log(selectorList)
      // }),
//      require('immutable-css'),
      require('postcss-browser-reporter')
    ]

  return config;
}
