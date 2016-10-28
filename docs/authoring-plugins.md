# Authoring Plugins

## Content Types

* Markdown
* BlogPost

## Other Plugins

* leo-plugin-postcss
* leo-plugin-fate
* leo-plugin-feature-flags

## Authoring Plugins

Plugins have full access to the webpack configuration through a
[webpack-configurator](https://github.com/lewie9021/webpack-configurator)
instance. This means that plugins can do anything that is possible through
webpack such as using offline-plugin or adding loaders, etc.

### Introducing New Content Types

A Content Type adds a mapping from `File -> JSON` and an extension to
the GraphQL Schema.

#### File -> JSON

Files are transformed into JSON through [webpack
loaders](https://webpack.github.io/docs/loaders.html). For example, the Content
Type `leo-blogpost` defines a mapping from a markdown file with frontmatter to
JSON as such:

```javascript
  config.loader('posts', {
    test: /\.post$/,
    exclude: /node_modules/,
    loaders: [
      '@sa-labs/leo-plugin-blogpost/loader',
      '@sa-labs/leo-plugin-markdown/loader',
      'frontmatter'
    ]
  });
```

Webpack loaders are executed from the last loader in the array to the first.
This means that the `posts` loader we've defined is first processed by
`frontmatter-loader`, then `leo-markdown-loader` and finally
`leo-plugin-blogpost/loader`.

The file extension we've defined for the `blogpost` Content Type is
`.post`. The following `.post` file:

```
---
title: 'Some Title'
---

# Introduction

* Some
* Markdown
```

roughly turns into this JSON:

```javascript
{
  attributes: {
    title: 'Some Title',
    url: '/some-title'
  },
  body: '<h1>Some Title</h1>'
  rawBody: `# Introduction
* Some
* Markdown
`
}
```

### Extending the GraphQL Schema

Now that we've defined how to translate `.post` files into JSON, we need to
enable querying of our data. This will live in `schema.js` in your plugin's
folder. First we'll import a couple things which will be useful.

```javascript
import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql/type';

import { slugify } from 'lodash-addons';
import find from 'lodash/collection/find';
import oDebug from 'debug';
const debug = oDebug('leo:plugin-blogpost:schema');
```

Then we define a GraphQL type for the `attributes` key:

```javascript
const BlogPostAttributesType = new GraphQLObjectType({
  name: 'BlogPostAttributes',
  fields: {
    title: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    featuredImage: {
      type: GraphQLString
    },
    path: {
      type: GraphQLString
    }
  }
})
```

With `BlogPostAttributesType`, we can construct our `BlogPostType`.

```javascript
const BlogPostType = new GraphQLObjectType({
  name: 'BlogPost',
  fields: {
    attributes: { type: BlogPostAttributesType },
    body: {
      type: GraphQLString,
      description: 'Rendered Markdown in HTML format'
    },
    rawBody: {
      type: GraphQLString,
      description: 'Raw Markdown string'
    }
  }
})
```

The most interesting piece of `schema.js` is the function which we export. It
takes all of the data that exists and returns a fragment of the root GraphQL
`Query` object. We defined `getPost`, which will return a post from the dataset
given a `slug`.

Then we return an object with a key of `post`. This lets us query `BlogPost`s
from our templates using `post($slug)`. An example might be `post(some-title)`,
which would query the `some-title` post. We make sure the resolve function is
set to return the result of `getPost` and we're done.

```javascript
module.exports = function(data) {

  const getPost = (slug) => {

    return find(data, ({ attributes: a }) => {
      if(a) {
        return a.contentType === 'leo-blogpost' && a.slug === slug;
      } else {
        return false;
      }
    })
  }

  return {
    post: {
      type: BlogPostType,
      args: {
        slug: {
          type: GraphQLString,
          description: 'The slugified version of a post title'
        }
      },
      resolve: (root, {
        slug
      }) => getPost(slug)
    }
  }
}
```

In the course of normal development, you should only be operating on
your own content-type. So make sure to tag the data appropriately when
loading and filter appropriately when defining the schema resolvers.

### Post Processing the JSON Database

Example: indexing content for search plugins, etc

Since `schema.js` exports a function whose first argument is the full set of
data, we can post-process the data and provide a Schema for the post-processed
data.

Alternatively, we can use `process.js` to add new data to the full
set. This is useful in the case of blog post archives or other
situations in which we need to generate a series of URLs based on the
content in the database. The following is an example that adds a
static `/about/` URL. Since we don't export a schema for untyped data
we are never at risk of interfering by adding new objects. When
generating URLs, LEO maps over the full set of data and extracts the
`attributes.url` key values. This allows us to simply add a new object
for each URL we want to render.

```javascript
module.exports = function(data, cb) {
  cb(null, data.concat({
    attributes: {
      url: '/about/'
    }
  }));
}
```



## Data Plugins vs Site Plugins

Sometimes you want a plugin to only be applied when the data is
loading in or when the site is rendering. An example of this might be
using Webpack's offline-plugin. It is highly likely that we only want
to run the offline-plugin when rendering the site, while it doesn't
have any beneficial effects in the data-loading phase and may actually
produce negative effects. A plugin's index.js can be altered to accept
two arguments, the webpack configurator config and an options
object. On the options object is a special key named `leo`. This key
contains a `pipeline` key which can be used to apply config based on
the pipeline ('data' or 'site').

```javascript
import OfflinePlugin from 'offline-plugin';

module.exports = function configure(config, { leo }) {
  if(leo.pipeline === 'site') {
    config.plugin('offline-setup', OfflinePlugin, {});
  }
  return config;
}
```
