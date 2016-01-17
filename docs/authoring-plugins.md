# Authoring Plugins

## Content Types

* Leo-Markdown
* Leo-BlogPost

## Other Plugins

* leo-plugin-postcss
* leo-plugin-fate
* leo-plugin-feature-flags

## Authoring Plugins

Plugins have full access to the webpack configuration through a
[webpack-configurator](https://github.com/lewie9021/webpack-configurator)
instance. This means that plugins can do anything that is possible through
webpack.

### Introducing New Content Types

A Content Type adds a mapping from `File -> JSON` and an extension to the
GraphQL Schema.

#### File -> JSON

Files are transformed into JSON through [webpack
loaders](https://webpack.github.io/docs/loaders.html). For example, the Content
Type leo-blogpost defines a mapping from a markdown file with frontmatter to
JSON as such:

```javascript
config.loader('posts', {
  test: /\.post$/,
  loaders: [
    'leo-plugin-blogpost/loader',
    'leo-markdown',
    'frontmatter']
});
```

Webpack loaders are executed from the last loader in the array to the first.
This means that the `posts` loader we've defined is first processed by
`frontmatter-loader`, then `leo-markdown-loader` and finally
`leo-plugin-blogpost/loader`.

The file extension we've defined for the `blogpost` Content Type is `.post`. The
following `.post` file:

```
---
title: 'Some Title'
---

# Introduction

* Some
* Markdown
```

turns into this JSON:

```javascript
{
  attributes: {
    title: 'Some Title',
    url: '/some-title'
  },
  body: '<h1>Some Title</h1>'
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
      type: GraphQLString
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


### Post Processing the JSON Database

Example: indexing content for search plugins, etc
