var webpack = require('webpack');
import findLeorcPath from '../../find-leorc-path';

/**
 * replaces require('.leorc') in application js files with the
 * location of a .leorc
 */
module.exports = function() {
  return new webpack.NormalModuleReplacementPlugin(
    /leorc/,
    findLeorcPath()
  );
}
