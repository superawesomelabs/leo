# Leo

TODO: Make docs site a Leo site (duh).

[Docs](#TODO) | []

Leo is a bleeding edge static site generator built on React-Router and Relay,
enjoying the benefits of both. It takes a directory of files and turns them into
JSON via webpack loaders. The JSON is then processed and served by a GraphQL
API. This approach enables a high level of [extensibility](#extensibility) and
customization.

Leo eschews template languages in favor of React Components with
[JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), which yields a
familiar syntax and retains the full power of the JavaScript language. JSX is completely optional, but highly suggested and works by default.

Leo can deploy to [surge.sh](http://surge.sh/), [GitHub
Pages](https://pages.github.com/) and anywhere else using [deployment
plugins](#deployment).

# What Makes Leo Different?

TODO: Flesh this out

Relay, React, Fate Integration, Extensibility, hot-loading...

## Clone a Template

```javascript
git clone git@github.com:superawesome/leo-blog-starter.git
```

## Extensibility

Leo is extremely extensible and is capable of anything webpack can do.

The primary method of extending Leo's static site functionality is plugins.
plugins can do many things including [post processing the JSON
database](#todo-search-plugin), [defining new Content
Types](#new-content-types), and

## New Content Types

By default, Leo ships without any content types. Content Types must be enabled
by plugins. The default starter includes a markdown content type which can be
used for arbitrary pages and a blog post type which includes automatic excerpt
generation and featured images.

## Themes

Themes are bundles of Routes and Content Types

## Developing

### Building for Release

```javascript
npm install
make
```
