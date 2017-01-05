module.exports = function configure(config, opts) {
  config.module.rules.push({
    test: /\.md$/,
    exclude: /node_modules/,
    use: [{
      loader: './__utils__/text/loader'
    }]
  });

  return config;
}
