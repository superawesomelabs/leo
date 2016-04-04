/**
 * This file is `noParse` due to dynamic requires.
 *
 * Allow plugins access to the webpack-configurator config object so they can
 * add loaders, etc.
 */
import oDebug from 'debug';
const debug = oDebug('leo:build:enable-plugins');

export default function enablePlugins(leoConf, config) {
  leoConf.plugins.forEach((plugin) => {
    debug('enabling plugin', plugin, 'with config', leoConf[plugin]);
    /**
     * allow each plugin to add itself to the webpack config
     * with it's respective .leorc config, which may or may not exist
     */
    require(plugin)(config, leoConf[plugin]);
  })
    return config;
}
