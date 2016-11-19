const oDebug = require('debug');
const debug = oDebug('leo:plugin-blogpost:process');
/**
 * Filter drafts out of the dataset by default
 * But keep them if we're told to
 */
function maybeFilterDrafts(obj) {
  const isBlogPost = obj.attributes.contentType === 'leo-blogpost';
  const shouldRenderDrafts = Boolean(process.env.BLOGPOST_RENDER_DRAFTS);

  if(isBlogPost && !shouldRenderDrafts) {
    // Filter out any drafts if we shouldn't renderDrafts
    if(obj.attributes.status === 'draft') {
      debug('filtering out draft: ', obj.attributes.title || obj.attributes.slug);
    }

    return obj.attributes.status !== 'draft';
  } else {
    // passthrough for any non-blogposts since we shouldn't be handling them
    return true
  }
}

module.exports = function(data, cb) {
  cb(null, data.filter(maybeFilterDrafts));
}
