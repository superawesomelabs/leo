var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function configure(config) {

  config.loader('css', {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', `css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader`)
  });

  config.plugin('extract-css',
    ExtractTextPlugin, ["styles.css", {
      allChunks: true
    }]);

  config.merge({
    postcss: [
      require('postcss-import')(),
      require('postcss-cssnext')({
        browsers: 'last 2 versions'
      }),
      require('lost')({
        flexbox: 'flex'
      })
    ]
  });

  return config;
}
