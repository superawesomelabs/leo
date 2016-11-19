export default function getAssetsFromCompiler(compiler, webpackStatsJson) {

  return Object.entries(webpackStatsJson.assetsByChunkName)
               .reduce((acc, [chunkKey, chunkValue]) => {
                 // Webpack outputs an array for each chunk when using sourcemaps
                 // We assume the main bundle is always the first element. Is it?
                 const chunkName = Array.isArray(chunkValue) ? chunkValue[0] : chunkValue;
                 return {
                   ...acc,
                   [chunkKey]: `${compiler.options.output.publicPath || ''}${chunkName}`,
                 }
               }, {})
};
