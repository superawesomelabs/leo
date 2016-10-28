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
  config.loader('markdown', {
    test: /\.md$/,
    exclude: /node_modules/,
    loaders: ['@sa-labs/leo-plugin-markdown/loader']
  });

  config.merge(current => {
    current.resolve.extensions.push('.md');
    current['@saLabs/leoPluginMarkdown/loader'] = {
      instance: opts && opts.instance || getMDInstance()
    }
    return current;
  })

  return config;
}
