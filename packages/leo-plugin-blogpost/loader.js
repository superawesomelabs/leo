'use strict';
var merge = require('lodash/merge');
var mkSlug = require('slug');
var loaderUtils = require('loader-utils');
var excerpt = require('excerpt-html');
var moment = require('moment');
var sanitizeHTML = require('sanitize-html');
var debug = require('debug')('leo:plugin-blogpost:loader');

function parseDate(str) {
  console.log('str', str);
  if (!str) {
    // If there's no date, use right now
    debug('using now')
    return moment.utc()
  } else {
    return moment.utc(str, ['MMM Do, YYYY'])
  }
}

function slugify(str) {
  return mkSlug(str, { mode: 'rfc3986' });
}

module.exports = function(json) {
  // Signal to webpack this is cacheable
  this.cacheable();

  /**
   * Get the filename for the currently loading content
   * given `/whatever/post-a.post`, will return `post-a`
   */
  var filename = loaderUtils.interpolateName(this, '[name]', {
    content: json
  });

  // Categories are used to generate archival pages
  var category = {
    display: json.attributes.category || 'Uncategorized'
  }
  category.slug = slugify(category.display);

  // Ensure a title exists
  var title = json.attributes.title || filename;

  // Ensure a slug exists
  var slug = json.attributes.slug || slugify(title);

  /**
   * Generate a URL if none exists
   * 
   * In the future, the way this URL gets generated should be likely be
   * configurable so that all blogposts can be put at `/posts/:slug`, etc
   */
  var url = json.attributes.url;
  if (!url) {
    url = '/' + slug;
  }

  // Momentize the publish date
  const publishedAt = parseDate(json.attributes.publishedAt);
  if(!publishedAt.isValid()) {
    throw new Error(title, 'has an invalid `publishedAt` date');
  }
  // If there's no updatedAt value, use publishedAt
  let updatedAt = json.attributes.updatedAt;
  updatedAt = updatedAt ? parseDate(updatedAt) : publishedAt;
  if(!updatedAt.isValid()) {
    throw new Error(title, 'has an invalid `updatedAt` date');
  }

  /**
   * Calculate the time needed to read the post
   * This can be way more advanced in the future. For now, we're just
   * stripping all html tags and calculating the time to read off of
   * an average word per minute reading pace.
   */
  var timeToRead;
  if(json.body) {
    var pureText = sanitizeHTML(json.body, {
      allowTags: []
    });
    var avgWPM = 265;
    var wordCount = pureText.split(' ').length;
    // timeToRead in minutes
    timeToRead = Math.round(wordCount / avgWPM);
    // super hacky way to make sure "0 min read" never happens
    if(timeToRead === 0) {
      timeToRead = 1;
    }
  }

  /**
   * Put it all together for use in the application.
   * Mark it as being of the content type `leo-blogpost` for easier querying
   */
  var finalContent = merge({},
    json, {
      attributes: {
        contentType: 'leo-blogpost',
        category: category,
        publishedAt: publishedAt.format('MMM Do, YYYY'),
        updatedAt: updatedAt.format('MMM Do, YYYY'),
        slug: slug,
        url: url,
        excerpt: excerpt(json.body),
        timeToRead: timeToRead
      }
    })

  return 'module.exports =' + JSON.stringify(finalContent);
}
