const oDebug = require('debug');
const debug = oDebug('leo:plugin-blogpost:process');
/**
 * Filter drafts out of the dataset by default
 * But keep them if we're told to
 */
function maybeFilterDrafts(obj) {
  const isBlogPost = obj.attributes.contentType === 'leo-blogpost';
  const shouldRenderDrafts = process.env.BLOGPOST_RENDER_DRAFTS;

  if(isBlogPost && !shouldRenderDrafts) {
    debug('filtering out', obj.attributes.title || obj.attributes.slug);
    return obj.attributes.status !== 'draft';
  } else {
    return true
  }
}

module.exports = function(data, cb) {
  cb(null, data.filter(maybeFilterDrafts));
}
