module.exports = function configure(config) {

  config.loader('markdown', {
    test: /\.md$/,
    exclude: /node_modules/,
    loaders: ['leo-plugin-markdown/loader']
  });

  config.merge((current) => {
    current.resolve.extensions.push('.md');
    return current;
  })

  return config;
}
