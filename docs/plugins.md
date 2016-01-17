# Plugins

Leo plugins are the primary way to extend the site generation functionality with
new features such as Content Types, Search and ...

## Using a Plugin

The following steps enable the `BlogPost` Content Type.

1. `npm install leo-plugin-blogpost`
2. Add the plugin to `.leorc`. If `.leorc` does not exist in the root of your
   project, create it.
```javascript
{
  plugins: [
    'leo-plugin-blogpost'
  ]
}
```

That's it. You can now use the `BlogPost` plugin to author blogposts!

Find out more about the `BlogPost` plugin in the respective [README](/packages/leo-plugin-blogpost)
