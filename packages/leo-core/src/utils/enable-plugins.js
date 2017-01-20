/**
 * This file is `noParse` due to dynamic requires.
 *
 * Allow plugins access to the webpack-configurator config object so they can
 * add loaders, etc.
 */
import oDebug from "debug";
const debug = oDebug("leo:utils:enable-plugins");
import { resolve } from "path";

export default function enablePlugins(
  { bundleType, conf: leoConf, config: webpackConfig }
) {
  leoConf.plugins.forEach(plugin => {
    debug(
      "enabling plugin",
      plugin,
      "with config keys",
      Object.keys(leoConf[plugin] || {})
    );
    /**
     * allow each plugin to add itself to the webpack config
     * with it's respective .leorc config, which may or may not exist
     */
    let p = plugin;
    try {
      // try to resolve plugin as node_module
      p = require.resolve(plugin);
    } catch (e) {
      try {
        p = require.resolve(resolve(process.cwd(), plugin));
      } catch (e) {
        throw new Error(`${plugin} has no index.js! Create one.`);
      }
    }

    /**
     * 1. require the plugin
     * 2. execute the resulting function with the webpack config and
     *    the leo plugin config. The plugin config will have additional
     *    housekeeping properties added to it so that plugins can
     *    selectively apply themselves to different pipelines.
     */
    return require(p)(webpackConfig, {
      ...(leoConf[plugin] || {}),
      leo: {
        // pipeline: site or data
        pipeline: "site",
        // bundleType: client or static
        bundle: bundleType
      }
    });
  });
  return webpackConfig;
}
