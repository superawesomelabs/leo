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
const debug = oDebug('graphql-directory-api:let-plugins-post-process-data');
import waterfall from 'async/waterfall';
type Callback = (err: ?Error, data: ?Array<Object>) => void

export default function letPluginsPostProcessData(plugins: [string], data: Array<Object>, callback: Callback): void {
  let arr = [cb => cb(null, data)];
  plugins.forEach(plugin => {
    try {
      require.resolve(`${plugin}/process`);
      debug(plugin, 'wants to post-process the data');
      arr.push(require(`${plugin}/process`))
    } catch (e) {
      debug('No process for plugin', plugin);
      return;
    }
  });

  /**
   * allow each plugin to process the full data set
   * run order is not guarenteed.
   */
  debug('pre-waterfall count', data.length);
  waterfall(arr, (err, result) => {
    debug('post-waterfall count', result && result.length);
    if(err) {
      debug('a plugin threw an error when processing data');
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
