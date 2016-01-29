var merge = require('lodash/merge');
var slugify = require('slug');
var loaderUtils = require('loader-utils');
var excerpt = require('excerpt-html');
var moment = require('moment');
var sanitizeHTML = require('sanitize-html');

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

  /**
   * What to do about categories?
   */
  var category = json.attributes.category;
  if (category) {
    // slugify the category here?
    category = slugify(category, { mode: 'rfc3986' })
  }

  /**
   * Ensure a slug exists
   */
  var slug = json.attributes.slug;
  var title = json.attributes.title || filename;
  // If there's no slug in the frontmatter
  if (!slug) {
    // use the title to generate one
    if (title) {
      slug = slugify(title, { mode: 'rfc3986' });
    } else {
      slug = slugify(filename, { mode: 'rfc3986' });
    }
  }

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

  /**
   * TODO: this logic is sloppy right now. What date format is
   * accepted should be well-defined.
   */
  var date;
  if(json.attributes.date) {
    // Should be ISO format
    console.log('a date');
    date = new Date(json.attributes.date);
  } else {
    console.log('no date')
//    date = new Date();
  }

  date = moment.utc(date).format('MMM Do, YYYY');

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
        date: date,
        slug: slug,
        url: url,
        excerpt: excerpt(json.body),
        timeToRead: timeToRead
      }
    })

  return 'module.exports =' + JSON.stringify(finalContent);
}
