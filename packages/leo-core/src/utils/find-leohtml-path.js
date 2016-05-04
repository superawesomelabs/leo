import path from 'path';
const debug = require('debug')('leo:find-leohtml-path')

/**
 * .routes is handled by a special loader which creates routes, etc
 * Unfortunately, webpack can't load a file that doesn't exist, so
 * we check the user's .routes first, then fall back to our default one
 */
export default () => {
  let pathname;
  try {
    debug('trying to use project\'s html wrapper');
    pathname = require.resolve(path.resolve(process.cwd(), 'html'))
  } catch (e) {
    debug('falling back to default html wrapper');
    pathname = require.resolve('html');
  }
  debug(`using ${pathname}`);
  return pathname;
}
