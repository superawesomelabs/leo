module.exports = function configure(config, opts) {
  config.loader('text', {
    test: /\.md$/,
    exclude: /node_modules/,
    loaders: ['text/loader']
  });
  config.merge((current) => {
    current.resolve.extensions.push('.md');
    current['text/loader'] = {
    }
    return current;
  })

  return config;
}
