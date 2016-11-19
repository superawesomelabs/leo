'use strict';

module.exports = function configure(config) {

  config.loader('posts', {
    test: /\.post$/,
    exclude: /node_modules/,
    loaders: ['@sa-labs/leo-plugin-blogpost/loader', '@sa-labs/leo-plugin-markdown/loader', 'frontmatter']
  });

  config.merge(function (current) {
    current.resolve.extensions.push('.post');
    return current;
  });

  return config;
};