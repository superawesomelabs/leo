module.exports = function configure(config) {

  config.loader('posts', {
    test: /\.post$/,
    exclude: /node_modules/,
    loaders: ['@sa-labs/leo-plugin-blogpost/loader', '@sa-labs/leo-markdown', 'frontmatter']
  });

  config.merge((current) => {
    current.resolve.extensions.push('.post');
    return current;
  })

  return config;
}
