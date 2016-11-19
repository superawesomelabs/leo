import evaluate from 'eval';
import path from 'path';
import each from 'async/each';
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import md5 from 'md5';
const debug = require('debug')('static-site-plugin');

import findAsset from './find-asset';
import getAssetsFromCompiler from './get-assets-from-compiler';
import createAssetFromContents from './create-asset-from-contents';

function StaticSiteGeneratorWebpackPlugin(renderSrc, outputPaths=[], locals={}) {
  // the bundle name to use to generate the static site
  this.renderSrc = renderSrc;
  // Alow outputpaths to be specified as a string or array
  this.outputPaths = Array.isArray(outputPaths) ? outputPaths : [outputPaths];
  // local variables to pass to a render()
  this.locals = locals;
}

StaticSiteGeneratorWebpackPlugin.prototype.apply = function(compiler) {
  const {
    locals,
    renderSrc,
    outputPaths,
    options: thisOptions
  } = this;
  const { options } = compiler;

  compiler.plugin('emit', function(compiler, done) {
    let renderPromises;

    const webpackStats = compiler.getStats();
    const webpackStatsJson = webpackStats.toJson();
    /**
     * This section is from assets-webpack-plugin
     * -- https://github.com/sporto/assets-webpack-plugin/blob/5dce5cdd532ea606bf6ed1e9aa285d4912e7bd49/index.js
     * There is another comment below indicating the end of this section
     */

    var getAssetKind = require('assets-webpack-plugin/lib/getAssetKind');
    var isHMRUpdate = require('assets-webpack-plugin/lib/isHMRUpdate');
    var isSourceMap = require('assets-webpack-plugin/lib/isSourceMap');

    var assetPath = (webpackStatsJson.publicPath && thisOptions.fullPath) ? webpackStatsJson.publicPath : '';
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
    debug('assetsPluginHash', assetsPluginHash);

    // catch any render-related errors and add them to the compiler stack
    try {
      const asset = findAsset(renderSrc, compiler, webpackStatsJson);
      if (asset == null) {
        throw new Error(`Source file not found: "${renderSrc}"`);
      }

      const webpackAssetsJSON = findAsset('webpack-static-assets.json', compiler, webpackStatsJson);
      const staticAssets = getAssetsFromCompiler(compiler, webpackStatsJson);
      const source = asset.source();
      /**
       * We need this `self` variable to exists for the fetch polyfill since
       * the fetch polyfill assumes `self` exists by accessing `self.fetch`
       */
      const scopeGlobals = {
        self: {
          XMLHttpRequest: XMLHttpRequest
        },
        XMLHttpRequest: XMLHttpRequest,
        _globalJSONAsset: function writeJSON({ name, json }) {
          debug(`writeJSON ${name}`);
          // the filename here should be the URL of the "current
          // page", because the client-side relay network layer relies
          // on the URL hash to fetch the json file
          compiler.assets[name] = createAssetFromContents(JSON.stringify(json));
        }
      }

      let render = evaluate(source, /* filename: */ renderSrc, /* scope: */ scopeGlobals, /* includeGlobals: */ true);
      // if the exported function is an es6 default export, use it
      if (render.hasOwnProperty('__esModule')) {
        render = render['default'];
      }
      if (typeof render !== 'function') {
        throw new Error(`Export from "${renderSrc}" must be a function that returns an HTML string`);
      }

      each(outputPaths, (outputPath, cb) => {
        var outputFileName = outputPath.replace(/^(\/|\\)/, ''); // Remove leading slashes for webpack-dev-server

        // jsonOutputFileName should be in scaffolding-relay
        var jsonOutputFileName = path.join('api', md5('/' + outputFileName) + '.json');
        if (!/\.(html?)$/i.test(outputFileName)) {
          outputFileName = path.join(outputFileName, 'index.html');
        }

        render({
          path: outputPath,
          assets: staticAssets,
          webpackStats: webpackStats,
          assetsPluginHash: assetsPluginHash.bundle || assetsPluginHash.static && assetsPluginHash,
          jsonOutputFileName: jsonOutputFileName,
          ...locals
        }, (err, html) => {
          if(err) {
            debug(`an error occured when rendering ${outputPath}`);
            compiler.errors.push(err.stack);
          } else {
            debug(`finished rendering ${outputPath}`);
            compiler.assets[outputFileName] = createAssetFromContents(html);
          }
          cb(null);
        });
      }, err => {
        debug('finished rendering pages');
        done();
      });

    } catch (err) {
      debug('caught error while rendering', err);
      compiler.errors.push(err.stack);
      done();
    }
  });
};

module.exports = StaticSiteGeneratorWebpackPlugin;
