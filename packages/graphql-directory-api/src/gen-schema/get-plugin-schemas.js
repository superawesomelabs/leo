/* @flow */
import oDebug from 'debug';
const debug = oDebug('graphql-directory-api:get-plugin-schemas');
import path, { resolve } from 'path';
import type { PluginSpec } from './types';

export default function({
  plugins=[],
  data=[]
}: PluginSpec) {
  debug('reducing plugin schema');
  return plugins.reduce((acc, pluginString) => {
    const pluginSchemaPath = `${pluginString}/schema`;
    let pluginPath;
    try {
      pluginPath = require.resolve(pluginSchemaPath);
      debug('pluginSchemaPath', pluginSchemaPath);
    } catch (e) {
      try {
        pluginPath = require.resolve(resolve(process.cwd(), pluginSchemaPath));
      } catch (e) {
        debug('No schema for plugin', pluginString);
        return acc;
      }
    }
    const mkPluginSchema = require(pluginPath);
    /**
     * If plugin/schema is not a function, maybe we should allow it to not be
     * in the future?
     */
    if (typeof mkPluginSchema !== 'function') {
      throw new Error(`plugin ${pluginString}/schema must export a function`);
    }
    const deepClonedData = JSON.parse(JSON.stringify(data));
    // TODO: how do we handle conflicting keys? maybe just throw for now?
    return Object.assign({}, acc, mkPluginSchema(deepClonedData));
  }, {})
}
