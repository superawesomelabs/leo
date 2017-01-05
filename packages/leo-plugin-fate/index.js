var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var constants = require('@sa-labs/fate-core/manual')();
var webpack = require('webpack');

module.exports = function configure(config, opts) {
  opts = opts || {};

  // Project's CSS. Run CSS in modules mode with postcss
  config.module.rules.push({
    test: /\.css$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    })
  });

  // Project's global css. Run PostCSS but not modules mode.
  config.module.rules.push({
    test: /\.global\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    })
  });

  // Third Party CSS. From node_modules. Don't process, just load.
  config.module.rules.push({
    test: /\.css$/,
    include: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader'
    })
  });

  const extract = new ExtractTextPlugin({
    filename: 'styles.[contenthash].css',
    allChunks: true
  });
  if(config.plugins) {
    config.plugins.push(extract);
  } else {
    config.plugins = [extract];
  }

  /* config.plugins.push(new webpack.LoaderOptionsPlugin({
     options: {
     context: __dirname
     }
     })); */

  return config;
}
