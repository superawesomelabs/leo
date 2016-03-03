var RaeStatsPlugin = require('./plugin');

module.exports = function configure(config) {

  config.plugin('rae', RaeStatsPlugin);

  return config;
}
