![header](./assets/header.png)

# LEO

LEO is a library for creating Content Based Site Generators with a
common GraphQL data layer. Typically, one would use a LEO generator to
build static sites from Single Page Applications. This is a different
approach to generators such as Jekyll and Hugo which use template
languages. See the
[Comparison to Other Generators](docs/comparison-to-other-generators.md).

You may want to choose a pre-built generator such as React/Apollo from the
[Quick Start](#quick-start) section.

* [Why](#why-leo)
  - [GraphQL Data Layer](docs/graphql-data-layer.md)
  - Use any UI tech (React, Glamor, Inferno, etc)
  - Highly Extensible
  - Structured Content Types (Markdown, Blogpost, Contentful)
  - Reuse Component Libraries Across Client Projects
* [More Docs](docs)
  - [Technical Overview](docs/technical-overview.md)
  - [Plugins](docs/plugins.md)
  - [Developing](docs/developing.md)

# Why Leo?

LEO can turn a Universal application into a Progressive Web App. This
means you can reuse your Single Page Application skills to build
advanced static sites. LEO's data processing is coordinated by webpack
and exposed via GraphQL, which offers rich introspection
capability. An example of this is using Apollo Dev Tools or GraphiQL
to explore the data used to build a static site, then copying queries
out into application code when satisfied. Finally, LEO doesn't
restrict your ability to use the latest and greatest UI tooling. From
Babel to TypeScript, React to Inferno, PostCSS to Glamor, and Apollo
to Relay, LEO lets you use the tooling that makes you most productive
through reusable plugins.

## Optional Modern Client-Side JS

Leo builds a client-side bundle using Relay which you can optionally
include when rendering .html files. Once the inital JS is downloaded,
every page can be rendered by fetching a JSON file from the same
static server. The JSON files contain the minimal set of content
required to render each URL. It is also cached, which means each
request happens only once.

![header](./assets/leo-network-cache.gif)

# Quick Start

Leo has a number of starter projects designed to get you started
quickly.

```javascript
git clone git@github.com:superawesome/leo-blog-starter.git
cd leo-blog-starter && npm i
```

## List of Starters

* [leo-blog-starter](https://github.com/superawesomelabs/leo-blog-starter)
* leo-documentation-starter
* leo-filepath-starter
  - Shows how Leo can be used to emulate the url-from-location-on-disk
    feature of other generators

## Deployment

LEO renders to a static folder of files and can be deployed to GitHub
Pages, [Netlify](https://www.netlify.com/), or any other hosting
service.

[react]: https://facebook.github.io/react/
[react-router]: https://github.com/ReactTraining/react-router
