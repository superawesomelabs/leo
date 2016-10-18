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
const debug = oDebug('graphql-directory-api:post-process');
import waterfall from 'async/waterfall';
type Callback = (err: ?Error, data: ?[Object]) => void

export default function letPluginsPostProcessData(plugins: [string], data: [Object]): Promise<Array<Object>> {
  return new Promise((reject, resolve) => {
    let arr = [cb => cb(null, data)];
    plugins.forEach(plugin => {
      try {
        require.resolve(`${plugin}/process`)
      } catch (e) {
        return debug('No process for plugin', plugin);
      }
      debug(plugin, 'wants to post-process the data');
      arr.push(require(`${plugin}/process`))
    });

    /**
     * allow each plugin to process the full data set
     * run order is not guarenteed.
     */
    waterfall(arr, (err, result) => {
      if(err) {
        debug('a plugin threw an error when processing data');
        throw new Error(err);
      } else {
        resolve(result);
      }
    });
  })
}
