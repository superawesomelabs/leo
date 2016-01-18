var cssstats = require('cssstats')
var find = require('lodash/find');

function MyPlugin(options) {}

MyPlugin.prototype.apply = function(compiler) {

  compiler.plugin('emit', function(compilation, callback) {
    var webpackStatsJson = compilation.getStats().toJson();

    var cssFilename = find(Object.keys(compilation.assets), function(str) {
      return !!str.match(/\.css$/);
    });

    if (cssFilename) {
      /**
       * `assets[cssFilename]` is a `ConcatSource` of multiple
       * `RawSource`s. Thus we need to call the source() function
       * to get the actual, final stylesheet.
       */
      var asset = compilation.assets[cssFilename].source();
      var cssFileStats = JSON.stringify(cssstats(asset));
      // Add stats file to output
      compilation.assets[cssFilename + '-stats.json'] = {
        source: function() {
          return cssFileStats;
        },
        size: function() {
          return cssFileStats.length;
        }
      }
    }
    callback();
  });
};

module.exports = MyPlugin;
