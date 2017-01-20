# GraphQL Data Layer

LEO boasts a composable GraphQL data layer which can be reused with
any scaffolding. That is to say, switching from React to Preact or
Inferno won't make you rewrite that nice medium-style Blog Post
content type with computed time-to-read metrics. The data layer
consists of [Content Types](#content-types),
[post processing](#post-processing) and [querying](#querying).

It can be queried with any valid
GraphQL client (such as
[Apollo](https://github.com/apollostack/apollo-client) or
[GraphiQL]() for development).
## Content Types

Content Types are the fundamental units of data when working with LEO
based sites. They are exposed through GraphQL schemas which yield
introspection capabilities.

## Post Processing

Local data can be post-processed to enable archives, category pages,
and RSS Feeds.

## Querying

<h4 align="center">Data</h4>

Data in LEO is exposed through a composable, extensible GraphQL
Schema defining Content Types.

```javascript
query BlogPostPage {
  post(slug: $slug) {
    attributes { title, date, timeToRead }
    body
  }
}
```
