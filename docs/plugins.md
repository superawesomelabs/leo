# Plugins

Leo plugins are the primary way to extend the site generation functionality with
new features such as Content Types, Search Indexes, and support for
new frameworks such as Preact or PureScript's Pux.

## Using a Plugin

The following steps enable the `BlogPost` Content Type. We also need to
enable the `Markdown` Content Type since `BlogPost` builds on top of
it.

1. `npm install --save leo-plugin-blogpost leo-plugin-markdown`
2. Add the plugin to `leo.config.js`. If `leo.config.js` does not
   exist in the root of your project, create it.
```javascript
{
  plugins: [
    'leo-plugin-blogpost',
    'leo-plugin-markdown,
  ]
}
```

That's it. You can now use the `BlogPost` plugin to author blogposts!

Find out more about the `BlogPost` plugin in the respective
[README](/packages/leo-plugin-blogpost)

## New Content Types

By default, Leo ships without any content types. Content Types must be enabled
by plugins. The default starter includes a markdown content type which can be
used for arbitrary pages and a blog post type which includes automatic excerpt
generation and featured images.

To build a new Content Type, checkout the
[Authoring Plugins](./authoring-plugins) documentation.
