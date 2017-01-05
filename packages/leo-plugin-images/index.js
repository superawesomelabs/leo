module.exports = function configure(config) {

  /**
   * default to handling image requests and optimizing images since these can
   * be some of the heavier assets on a site. In the future, we should implement
   * a gradual loading mechanism that loads a low-res image, then the high-res.
   */
  config.module.rules.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [{
      loader: 'url-loader?limit=10000'
    }, {
      loader: 'img-loader?minimize&progressive=true'
    }]
  });

  return config;
}
