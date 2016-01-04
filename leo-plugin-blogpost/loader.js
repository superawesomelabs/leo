var hljs = require('highlight.js')
var merge = require('lodash/object/merge');
var _ = require('lodash-addons');

module.exports = function(json) {
  // Signal to webpack this is cacheable
  this.cacheable();
  console.log(json);
  var category = json.attributes.category;
  if (category) {
    // slugify the category here?
    category = _.slugify(category)
  }
  var slug = json.attributes.slug;
  var title = json.attributes.title;
  // If there's no slug in the frontmatter
  if (!slug) {
    // use the title to generate one
    if (title) {
      slug = _.slugify(title);
    }
  }
  var url = json.attributes.url;
  if (!url) {
    url = '/' + slug + '/';
  }
  // if there's no url
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
