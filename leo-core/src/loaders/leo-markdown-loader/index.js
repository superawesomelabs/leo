var hljs = require('highlight.js')
var merge = require('lodash/object/merge');
var isString = require('lodash/lang/isString');
var isObject = require('lodash/lang/isObject');

var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
});

module.exports = function(content) {
  // Signal to webpack this is cacheable
  this.cacheable();
  if (isString(content)) {
    console.log('isstring')
    /**
     * If the loader is used as the fist loader in a list, the content it
     * receives will be the raw content, which is string.
     */
    return 'module.exports =' + JSON.stringify({
      body: md.render(content)
    });
  } else if (isObject(content)) {
    console.log('isobject')
    // The loader is operating on JSON; Likely a secondary loader.
    return merge({},
      content, {
        body: md.render(content.body)
      });
  } else {
    throw new Error('content supplied to leo-markdown-loader must be a string or object')
  }

}
