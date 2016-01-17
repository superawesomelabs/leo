var merge = require('lodash/merge');
var _ = require('lodash-addons');
var loaderUtils = require('loader-utils');

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
    category = _.slugify(category)
  }

  /**
   * Ensure a slug exists
   */
  var slug = json.attributes.slug;
  var title = json.attributes.title;
  // If there's no slug in the frontmatter
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
  var url = json.attributes.url;
  if (!url) {
    url = '/' + slug + '/';
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
        slug: slug,
        url: url
      }
    })
  return 'module.exports =' + JSON.stringify(finalContent);
}
