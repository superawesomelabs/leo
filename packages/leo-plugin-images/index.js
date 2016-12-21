module.exports = function configure(config) {

  /**
   * default to handling image requests and optimizing images since these can
   * be some of the heavier assets on a site. In the future, we should implement
   * a gradual loading mechanism that loads a low-res image, then the high-res.
   */
  config.module.loaders.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'url-loader?limit=10000',
      'img-loader?minimize&progressive=true'
    ]
  });

  return config;
}
