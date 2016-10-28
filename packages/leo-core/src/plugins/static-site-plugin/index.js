var evaluate = require('eval');
var path = require('path');
var Promise = require('bluebird');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var md5 = require('md5');
var debug = require('debug')('static-site-plugin');

function StaticSiteGeneratorWebpackPlugin(renderSrc, outputPaths, locals) {
  this.renderSrc = renderSrc;
  this.outputPaths = Array.isArray(outputPaths) ? outputPaths : [outputPaths];
  this.locals = locals;
}

StaticSiteGeneratorWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;
  var options = compiler.options;


  compiler.plugin('emit', function(compiler, done) {
    var renderPromises;

    var webpackStats = compiler.getStats();
    var webpackStatsJson = webpackStats.toJson();
    /**
     * This section is from assets-webpack-plugin
     * -- https://github.com/sporto/assets-webpack-plugin/blob/5dce5cdd532ea606bf6ed1e9aa285d4912e7bd49/index.js
     * There is another comment below indicating the end of this section
     */

    var getAssetKind = require('assets-webpack-plugin/lib/getAssetKind');
    var isHMRUpdate = require('assets-webpack-plugin/lib/isHMRUpdate');
    var isSourceMap = require('assets-webpack-plugin/lib/isSourceMap');

    var assetPath = (webpackStatsJson.publicPath && self.options.fullPath) ? webpackStatsJson.publicPath : '';
    // assetsByChunkName contains a hash with the bundle names and the produced files
    // e.g. { one: 'one-bundle.js', two: 'two-bundle.js' }
    // in some cases (when using a plugin or source maps) it might contain an array of produced files
    // e.g. {
    // main:
    //   [ 'index-bundle-42b6e1ec4fa8c5f0303e.js',
    //     'index-bundle-42b6e1ec4fa8c5f0303e.js.map' ]
    // }
    var assetsByChunkName = webpackStatsJson.assetsByChunkName;

    var assetsPluginHash = Object.keys(assetsByChunkName).reduce(function(chunkMap, chunkName) {
      var assets = assetsByChunkName[chunkName];
      if (!Array.isArray(assets)) {
        assets = [assets];
      }
      chunkMap[chunkName] = assets.reduce(function(typeMap, asset) {
        if (isHMRUpdate(options, asset) || isSourceMap(options, asset)) {
          return typeMap;
        }

        var typeName = getAssetKind(options, asset);
        typeMap[typeName] = assetPath + asset;

        return typeMap;
      }, {});

      return chunkMap;
    }, {});
    /**
     * End assets-webpack-plugin section
     */
    debug('assetsPluginHash', assetsPluginHash)
    try {
      var asset = findAsset(self.renderSrc, compiler, webpackStatsJson);

      if (asset == null) {
        throw new Error('Source file not found: "' + self.renderSrc + '"');
      }
      var webpackAssetsJSON = findAsset('webpack-static-assets.json', compiler, webpackStatsJson);
      console.log('webpackAssetsJSON', webpackAssetsJSON)

      var assets = getAssetsFromCompiler(compiler, webpackStatsJson);

      var source = asset.source();
      /**
       * We need this `self` variable to exists for the fetch polyfill since
       * the fetch polyfill assumes `self` exists by accessing `self.fetch`
       */
      const scopeGlobals = {
        self: {
          XMLHttpRequest: XMLHttpRequest
        },
        XMLHttpRequest: XMLHttpRequest,
        _globalJSONAsset: function writeJSON(obj) {
          // the filename here should be the URL of the "current
          // page", because the client-side relay network layer relies
          // on the URL hash to fetch the json file
          compiler.assets[obj.name] = createAssetFromContents(JSON.stringify(obj.json));
        }
      }
      var render = evaluate(source, /* filename: */ self.renderSrc, /* scope: */ scopeGlobals, /* includeGlobals: */ true);

      if (render.hasOwnProperty('__esModule')) {
        render = render['default'];
      }

      if (typeof render !== 'function') {
        throw new Error('Export from "' + self.renderSrc + '" must be a function that returns an HTML string');
      }

      renderPromises = self.outputPaths.map(function(outputPath) {
        var outputFileName = outputPath.replace(/^(\/|\\)/, ''); // Remove leading slashes for webpack-dev-server

        var jsonOutputFileName = path.join('api', md5('/' + outputFileName) + '.json');
        if (!/\.(html?)$/i.test(outputFileName)) {
          outputFileName = path.join(outputFileName, 'index.html');
        }

        var locals = {
          path: outputPath,
          assets: assets,
          webpackStats: webpackStats,
          assetsPluginHash: assetsPluginHash.bundle || assetsPluginHash.static && assetsPluginHash,
          jsonOutputFileName: jsonOutputFileName
        };

        for (var prop in self.locals) {
          if (self.locals.hasOwnProperty(prop)) {
            locals[prop] = self.locals[prop];
          }
        }

        return Promise
          .fromNode(render.bind(null, locals))
          .then(function(output) {
            compiler.assets[outputFileName] = createAssetFromContents(output);
          })
          .catch(function(err) {
            compiler.errors.push(err.stack);
          });
      });

      Promise.all(renderPromises).nodeify(done);
    } catch (err) {
      compiler.errors.push(err.stack);
      done();
    }
  });
};

var findAsset = function(src, compiler, webpackStatsJson) {
  var asset = compiler.assets[src];

  if (asset) {
    return asset;
  }

  var chunkValue = webpackStatsJson.assetsByChunkName[src];

  if (!chunkValue) {
    return null;
  }
  // Webpack outputs an array for each chunk when using sourcemaps
  if (chunkValue instanceof Array) {
    // Is the main bundle always the first element?
    chunkValue = chunkValue[0];
  }
  return compiler.assets[chunkValue];
};

// Shamelessly stolen from html-webpack-plugin - Thanks @ampedandwired :)
var getAssetsFromCompiler = function(compiler, webpackStatsJson) {
  var assets = {};
  for (var chunk in webpackStatsJson.assetsByChunkName) {
    var chunkValue = webpackStatsJson.assetsByChunkName[chunk];

    // Webpack outputs an array for each chunk when using sourcemaps
    if (chunkValue instanceof Array) {
      // Is the main bundle always the first element?
      chunkValue = chunkValue[0];
    }

    if (compiler.options.output.publicPath) {
      chunkValue = compiler.options.output.publicPath + chunkValue;
    }
    assets[chunk] = chunkValue;
  }

  return assets;
};

var createAssetFromContents = function(contents) {
  return {
    source: function() {
      return contents;
    },
    size: function() {
      return contents.length;
    }
  };
};

module.exports = StaticSiteGeneratorWebpackPlugin;
