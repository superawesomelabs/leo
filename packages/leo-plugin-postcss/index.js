var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = function configure(config) {

  config.loader('css', {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
  });


  // Project's global css. Run PostCSS but not modules mode.
  config.loader('global-css', {
    test: /\.global\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
  });

  // Third Party CSS. From node_modules. Don't process, just load.
  config.loader('third-party-css', {
    test: /\.css$/,
    include: /node_modules/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
  });

  config.plugin('extract-css',
    ExtractTextPlugin, ['styles.[contenthash].css', {
      allChunks: true
    }]);

  config.merge({
    postcss: [
      require('postcss-brand-colors'),
      require('postcss-modular-scale'),
      require('postcss-responsive-type'),
      require('postcss-cssnext')({
        browsers: 'last 2 versions'
      }),
      require('lost')({
        flexbox: 'flex'
      }),
      require('postcss-font-magician')({
        hosted: path.resolve(process.cwd(), './fonts')
      }),
      // require('list-selectors').plugin(function(selectorList) {
      //   console.log(selectorList)
      // }),
      require('immutable-css'),
      require('postcss-browser-reporter')
    ]
  });

  return config;
}
