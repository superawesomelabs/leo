const debug = require('debug')('leo-plugin-makdown');
const webpack = require('webpack');

var hljs = require('hljs-modules');
function getMDInstance() {
  const md = require('markdown-it')({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                     hljs.highlight(lang, str, true).value +
                     '</code></pre>';
            } catch (__) {}
          }

          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
  })
  return md;
}
module.exports = function configure(config, opts) {

  if(opts && opts.instance) {
    debug('instance style: custom');
  } else {
    debug('instance style: default');
  }
  config.module.rules.push({
    test: /\.md$/,
    exclude: /node_modules/,
    use: [{
      loader: '@sa-labs/leo-plugin-markdown/loader'
    }]
  });
  const optsPlugin = new webpack.LoaderOptionsPlugin({
    options: {
      // TODO: context here is a hack because we can't use multiple loaderOptionPlugins.
      context: process.cwd(),
      '@saLabs/leoPluginMarkdown/loader': {
        instance: opts && opts.instance || getMDInstance()
      },
    },
  });

  if(config.plugins) {
    config.plugins.push(optsPlugin);
  } else {
    config.plugins = [optsPlugin];
  }

  return config;
}
