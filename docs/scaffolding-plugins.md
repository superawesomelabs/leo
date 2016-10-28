# Scaffolding Plugins

Scaffolding plugins are a special case of normal plugins. They usually
provide two files (an `entry-client` and an `entry-static`) which can
be used to enable new frameworks and data-fetching patterns. Consider
the following `leo.config.js` which uses the Relay scaffolding and a
couple plugins to generate data.

```javascript
{
  scaffolding: '@sa-labs/leo-scaffolding-relay',
  plugins: [
    '@sa-labs/leo-plugin-blogpost',
    '@sa-labs/leo-plugin-markdown,
  ]
}
```
