![header](./assets/header.png)

# Leo

Leo is a declarative static site generator.

<h4 align="center">Data</h4>

Declare the data you need to render a set of pages, such as blog
posts.

```javascript
post(slug: $slug) {
  attributes { title, date, timeToRead }
  body
}
```

<h4 align="center">Templates</h4>

Use [React][react] to build up a declarative, reusable library of
components that make up your site. The following example shows a
component used to render blog posts when showing a list view.

```javascript
class Post extends Component {
  static propTypes = {
    title: string,
    date: string,
    exerpt: string,
    timetoRead: number,
    url: string
  };

  render() {
    const {
      title, date, excerpt, timeToRead, url
    } = this.props.post.attributes;
    return (
      <div className="post">
        <div className="image"></div>
        <Link to={url}><h4 className="heading">{title}</h4></Link>
        <span className="meta">{date} &bull; {timeToRead} min read</span>
        <p className="excerpt">{excerpt}</p>
        <Link to={url} className="readMore">Read more...</Link>
      </div>
    )
  }
}
```

<h4 align="center">Routing</h4>

Declarative routing with [react-router][react-router]. Make the URL
your first thought, not an after-thought.

```javascript
export default (
  <Route path='/' component={App}>
    <Route path='/posts/'
           queries={RootQuery}
           component={Posts} />
    <Route path=':slug'
           component={Post}
           queries={RootQuery} />
    <Route path='/:year/:month/:day/:slug/'
           component={Post}
           queries={RootQuery} />
    <IndexRoute component={Home} 
           queries={RootQuery}/>
    <Route path='*' component={NoMatch} />
  </Route>
)
```

# Quick Start

Leo has a number of starter projects designed to get you started
quickly.

```javascript
git clone git@github.com:superawesome/leo-blog-starter.git
cd leo-blog-starter && npm i
```

## Starters

* [leo-blog-starter](https://github.com/superawesomelabs/leo-blog-starter)
* leo-documentation-starter
* leo-filepath-starter
  - Shows how Leo can be used to emulate the url-from-location-on-disk
    feature of other generators

# Why Leo

Leo is a bleeding edge static site generator built on React, Webpack and
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

# Dependencies

Development dependencies are located in the root package.

## Run All Tests

```
npm i
npm test
```

[react-router]: https://github.com/reactjs/react-router