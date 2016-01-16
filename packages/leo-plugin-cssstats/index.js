var CSSStatsPlugin = require('./plugin');

module.exports = function configure(config) {

  config.plugin('cssstats', CSSStatsPlugin);

  return config;
}
