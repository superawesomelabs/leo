var loaderUtils = require("loader-utils");

module.exports = function(content) {
  // Signal to webpack this is cacheable
  this.cacheable();
  return "module.exports =" +
    JSON.stringify({ attributes: { slug: "slug" }, rawBody: content });
};
