var loaderUtils = require('loader-utils');
var debug = require('debug')('leo:database-loader');

/**
 * Load
 */
module.exports = function leoDatabaseLoader(content, map) {
  // Signal to webpack this is cacheable
  this.cacheable && this.cacheable();
  var newContent = content.replace('__DATA_FILES__', this.options.leoDatabase.val);
  return newContent
}
