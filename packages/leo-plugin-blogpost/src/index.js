module.exports = function configure(config) {

  config.module.rules.push({
    test: /\.post$/,
    exclude: /node_modules/,
    use: [{
      loader: '@sa-labs/leo-plugin-blogpost/loader'
    },{
      loader: '@sa-labs/leo-plugin-markdown/loader'
    }, {
      loader: 'frontmatter-loader'
    }]
  });

  return config;
}
