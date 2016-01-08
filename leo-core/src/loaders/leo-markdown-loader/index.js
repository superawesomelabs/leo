var hljs = require('highlight.js')
var merge = require('lodash/object/merge');
var isString = require('lodash/lang/isString');
var isObject = require('lodash/lang/isObject');
var _ = require('lodash-addons');
var loaderUtils = require('loader-utils');
var debug = require('debug')('leo:markdown-loader');

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

/**
 * only requires the filename argument
 */
function mkSlugAndURL(obj) {
  var slug = obj.slug;
  var title = obj.title;
  var filename = obj.filename;
  var url = obj.url;

  /**
   * Ensure a slug exists
   */
  if (!slug) {
    // use the title to generate one
    if (title) {
      slug = _.slugify(title);
    } else {
      slug = _.slugify(filename);
    }
  }

  /**
   * Generate a URL if none exists
   */
  if (!url) {
    url = '/' + slug + '/';
  }
  return {
    slug: slug,
    url: url
  }
}

console.log('markdown loader');
module.exports = function(content) {
  // Signal to webpack this is cacheable
  this.cacheable();

  /**
   * renderer that stores the relative src of images and requires them so that
   * they are processed by loaders (img-loader, etc)
   */
  var defaultImageRender = md.renderer.rules.image;
  md.renderer.rules.image = function(tokens, idx, options, env, renderer) {

    var token = tokens[idx];
    debug('token', tokens[idx]);
    // "alt" attr MUST be set, even if empty. Because it's mandatory and
    // should be placed on proper position for tests.
    //
    // Replace content with actual value
    token.attrs[token.attrIndex('alt')][1] =
      renderer.renderInlineAsText(token.children, options, env);

    return defaultImageRenderer(tokens, idx, options, env, renderer);
  };
  /**
   * Get the filename for the currently loading content
   * given `/whatever/post-a.post`, will return `post-a`
   */
  var filename = loaderUtils.interpolateName(this, '[name]', {
    content: content
  });

  /**
   * If the loader is used as the fist loader in a list, the content it
   * receives will be the raw content, which is string.
   */
  if (isString(content)) {
    debug('content isString');
    var obj = mkSlugAndURL({
      filename: filename
    });
    return 'module.exports =' + JSON.stringify({
      attributes: {
        slug: obj.slug,
        url: obj.url
      },
      body: md.render(content)
    });
  } else if (isObject(content)) {
    debug('content isObject');
    // The loader is operating on JSON; Likely a secondary loader.
    var newObj = mkSlugAndURL(merge({}, content.attributes, {
      filename: filename
    }));
    var obj = content.attributes;
    obj.slug = newObj.slug;
    obj.url = newObj.url;
    obj.contentType = 'leo-markdown';

    return merge({},
      content, {
        attributes: obj,
        body: md.render(content.body)
      });
  } else {
    throw new Error('content supplied to leo-markdown-loader must be a string or object')
  }

}
