# Leo

Leo is alpha quality software. Expect bugs. Documentation needs
work. Contributions welcome.

A list of `TODO`s can be found in [TODO.md][./TODO.md]

# Get Started

```javascript
git clone git@github.com:superawesome/leo-blog-starter.git
cd leo-blog-starter && npm i
```

# Why Leo?

Leo is a bleeding edge static site generator built on React, React-Router and
Relay. The output of a Leo site includes all static files as well as
an optional client-side bundle which enables a high level of
progressive enhancement. Leo can be thought of as a Universal
Application where the server responses are pre-rendered and
distributed as .html files.

## Data Processing

Leo Plugins define a set of mappings from Content Type to JSON. Using these
mappings, a directory (conventionally, `data/`) of files can be
consumed as a GraphQL API. This approach enables a high level of
[extensibility](#extensibility). Examples of what is possible includes
generating search indexes and auto-creation of excerpts.

## Templating

Leo eschews template languages in favor of
[React](https://facebook.github.io/react/) Components, which yields a
familiar syntax and retains the full power of the JavaScript
language. JavaScript files are processed with babel and the es2015
preset by default.

[React Router](https://github.com/rackt/react-router) is used to keep
UI in sync with the URL. This enables declarative route configuration
as well as more advanced techniques, such as code-splitting.

## Deployment

Leo can deploy to [surge.sh](http://surge.sh/), [GitHub
Pages](https://pages.github.com/) and anywhere else using [deployment
plugins](#deployment).

## Extensibility

At the core of Leo sits webpack. Through webpack Leo can be extended
to do almost anything.

The primary method of extending Leo's static site functionality is via
[plugins](./docs/plugins.md). Plugins can do many things including
[post processing the JSON database](#todo-search-plugin),
[defining new Content Types](#new-content-types), and
[analyzing files](#css-analysis)

# Themes

Themes are bundles of React Components and Content Types. For example,
a Theme can provide the Components required to render various forms of
BlogPosts (individual view, generic list view, archive view, etc).

Themes can depend on multiple Content Types. This makes it possible to
scale a theme from a single Blog Post to an entire site (including
aggregate pages, such as a landing page).

# Developing

Leo is developed as a mono-repo. The root package contains all of the
dependencies required to develop any of the packages in `packages/*`.

## Run All Tests

```
npm i
npm test
```
