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
  config.module.loaders.push({
    test: /\.md$/,
    exclude: /node_modules/,
    loaders: ['@sa-labs/leo-plugin-markdown/loader']
  });

  config.resolve.extensions.push('.md');
  config['@saLabs/leoPluginMarkdown/loader'] = {
    instance: opts && opts.instance || getMDInstance()
  }

  return config;
}
