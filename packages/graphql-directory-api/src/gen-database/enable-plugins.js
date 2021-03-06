/**
 * This file is `noParse` due to dynamic requires.
 *
 * Allow plugins access to the webpack-configurator config object so they can
 * add loaders, etc.
 */
import oDebug from "debug";
const debug = oDebug("graphql-directory-api:enable-plugins");
import { resolve } from "path";

export default function enablePlugins(plugins = [], opts, config) {
  plugins.forEach(plugin => {
    debug("enabling plugin", plugin, "with config", opts[plugin]);
    /**
     * allow each plugin to add itself to the webpack config
     * with it's respective config, which may or may not exist
     *
     * plugins are expected to have an `index.js` which
     */
    let addPluginConfig;
    try {
      addPluginConfig = require(plugin);
    } catch (e) {
      try {
        addPluginConfig = require(resolve(process.cwd(), plugin));
      } catch (e) {
        throw new Error(`Can not resolve plugin ${plugin}`);
      }
    }
    if (typeof addPluginConfig === "function") {
      addPluginConfig(config, {
        ...(opts[plugin] || {}),
        leo: { pipeline: "data" }
      });
    } else {
      debug(`plugin ${plugin} does not have an index.js`);
    }
  });
  return config;
}
