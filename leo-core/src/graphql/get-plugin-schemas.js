import isFunction from 'lodash/lang/isFunction';
import cloneDeep from 'lodash/lang/cloneDeep';
import oDebug from 'debug';
const debug = oDebug('leo:graphql:get-plugin-schemas');

export default function(plugins, data) {
  return plugins.reduce((acc, pluginString) => {
    debug('reducing plugin schema', pluginString);
    const mkPluginSchema = require(`${pluginString}/schema`);
    /**
     * If plugin/schema is not a function, maybe we should allow it to not be
     * in the future?
     */
    if (!isFunction(mkPluginSchema)) {
      throw new Error(`plugin ${pluginString}/schema must export a function`);
    }
    // TODO: how do we handle conflicting keys? maybe just throw for now?
    return Object.assign({}, acc, mkPluginSchema(cloneDeep(data)));
  }, {})
}
