import path from 'path';
const debug = require('debug')('leo:find-leorc-path')

/**
 * .leorc is handled by a special loader which creates routes, etc
 * Unfortunately, webpack can't load a file that doesn't exist, so
 * we check the user's .leorc first, then fall back to our default one
 */
export default () => {
  let leorc;
  debug('cwd', process.cwd());
  try {
    debug('trying to use project\'s .leorc');
    leorc = require.resolve(path.resolve(process.cwd(), '.leorc'))
  } catch (e) {
    debug('falling back to default .leorc');
    leorc = require.resolve(__dirname, '.leorc');
  }
  debug(`using ${leorc}`);
  return leorc;
}
