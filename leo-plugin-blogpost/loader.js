var hljs = require('highlight.js')
var merge = require('lodash/object/merge');
var isString = require('lodash/lang/isString');
var isObject = require('lodash/lang/isObject');

module.exports = function(json) {
  // Signal to webpack this is cacheable
  this.cacheable();
  var category = json.attributes.category;
  if(category) {
    category = category.toLowerCase();
  }
  var finalContent = merge({},
  { category: category })
  return 'module.exports =' + JSON.stringify(finalContent);

}
