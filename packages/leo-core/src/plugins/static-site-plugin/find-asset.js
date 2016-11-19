export default function findAsset(src, compiler, webpackStatsJson) {

  // return asset if it exists
  if (compiler.assets[src]) {
    return compiler.assets[src];
  }

  let chunkValue = webpackStatsJson.assetsByChunkName[src];

  if (!chunkValue) {
    return null;
  }
  // Webpack outputs an array for each chunk when using sourcemaps
  if (Array.isArray(chunkValue)) {
    // Is the main bundle always the first element?
    chunkValue = chunkValue[0];
  }
  return compiler.assets[chunkValue];
};
