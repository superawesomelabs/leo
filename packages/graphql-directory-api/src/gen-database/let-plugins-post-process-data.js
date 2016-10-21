/**
 * @flow
 * This file is `noParse` due to dynamic requires.
 *
 * Allow plugins access to the data loaded by webpack so that they can
 * generate, read, and delete content, etc.
 *
 * An example of this is removing blogposts which are `drafts` so they
 * aren't published yet or generating collections (including
 * pagination) for blog categories. (/blog/topic/1, /blog/topic/2)
 *
 */
import oDebug from 'debug';
import path from 'path';
const debug = oDebug('graphql-directory-api:post-process');
import waterfall from 'async/waterfall';
type Callback = (err: ?Error, data: ?Array<Object>) => void

export default function letPluginsPostProcessData(plugins: [string], data: Array<Object>, callback: Callback): void {
  let arr = [cb => cb(null, data)];
  plugins.forEach(plugin => {
    try {
      require.resolve(`${plugin}/process`)
    } catch (e) {
      debug('No process for plugin', plugin);
      return;
    }
    debug(plugin, 'wants to post-process the data');
    arr.push(require(path.resolve(process.cwd(), `${plugin}/process`)))
  });

  /**
   * allow each plugin to process the full data set
   * run order is not guarenteed.
   */
  waterfall(arr, (err, result) => {
    debug('eeee', err, result);
    if(err) {
      debug('a plugin threw an error when processing data');
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
