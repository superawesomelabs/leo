# Technical Overview

LEO is an pluggable static site generator backed by a common GraphQL
data pipeline. The technical flow boils down to two processes.

1. Files -> Database
2. SPA -> Static Files

## Files -> Database

The data pipeline is enabled by `graphql-directory-api`. It is a
webpack-based, pluggable function from a folder of files to a GraphQL
schema backed by a JSON store derived from the folder of files.

### Data Plugins

LEO Plugins define:

* A set of mappings from File to JSON Object.
* A data type that we can use to query said JSON

Using these mappings, a directory (conventionally, `data/`) of files
can be consumed as a GraphQL API. This approach enables a high level
of [extensibility](#extensibility). Examples of what is possible
includes generating search indexes and auto-creation of excerpts.

## Templating

Leo eschews template languages in favor of
[React](https://facebook.github.io/react/) Components, which yields a
familiar syntax and retains the full power of the JavaScript
language. JavaScript files are processed with babel and the es2015
preset by default.

[React Router](https://github.com/rackt/react-router) is used to keep
UI in sync with the URL. This enables declarative route configuration
as well as more advanced techniques, such as code-splitting.

## Extensibility

At the core of Leo sits webpack. Through webpack Leo can be extended
to do almost anything.

The primary method of extending Leo's static site functionality is via
[plugins](./docs/plugins.md). Plugins can do many things including
[post processing the JSON database](#todo-search-plugin),
[defining new Content Types](#new-content-types), and
[analyzing files](#css-analysis)
