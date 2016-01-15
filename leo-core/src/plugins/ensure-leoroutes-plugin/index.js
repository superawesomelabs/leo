var webpack = require('webpack');
import findLeoRoutesPath from 'utils/find-leoroutes-path';

/**
 * replaces require('.leo-routes') in application js files with the
 * location of a routes.js
 */
module.exports = function() {
  return new webpack.NormalModuleReplacementPlugin(
    /leoroutes/,
    findLeoRoutesPath()
  );
}
