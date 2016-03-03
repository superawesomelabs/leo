/**
 * This file is `noParse` due to dynamic requires.
 *
 * Allow plugins access to the webpack-configurator config object so they can
 * add loaders, etc.
 */
import oDebug from 'debug';
const debug = oDebug('leo:build:enable-plugins');

export default function enablePlugins(plugins, config) {
  plugins.forEach((plugin) => {
    debug('enabling plugin', plugin);
    // allow each plugin to add itself to the webpack config
    require(plugin)(config);
  })
    return config;
}
