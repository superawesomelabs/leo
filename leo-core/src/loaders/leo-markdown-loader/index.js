var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
});

module.exports = function(json) {
  // Signal to webpack this is cacheable
  this.cacheable();

  return 'module.exports =' + JSON.stringify({
    ...json,
    body: md(json.body)
  });
}
