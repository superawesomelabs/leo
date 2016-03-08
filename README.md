![header](./assets/header.png)

* [Leo](#leo)
  - [data](#data)
  - [templates](#templates)
  - [routing](#routing)
  - [Quick Start](#quick-started)
  - [plugins](#plugins)
* [More Docs](docs)
  - [Technical Overview](docs/technical-overview)
  - [Developing](docs/developing.md)

> Leo is a highly extensible, declarative static site generator.

<h4 align="center">Data</h4>

Declare the data components need to render a set of pages using an
extensible, product-based API.

```javascript
post(slug: $slug) {
  attributes { title, date, timeToRead }
  body
}
```

<h4 align="center">Templates</h4>

Use [React][react] to build up a declarative, reusable library of
components and share them across projects. Using JavaScript means
never being stuck with a restricted template language.

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

Declarative routing with [React Router][react-router]. Make the URL
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

# Why Leo?

* Declarative Approach
* Extensible (via Plugins)
* Reuse SPA Skills
* Extremely Flexible
* Reuse Component Libraries Across Client Projects
* Write Content in Markdown, Latex, etc
* Automatically Optimize Images
* No Template Languages

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

Leo can deploy to [surge.sh](http://surge.sh/), [GitHub
Pages](https://pages.github.com/) and anywhere else using [deployment
plugins](#deployment).

# Themes

Themes are bundles of React Components and Content Types. For example,
a Theme can provide the Components required to render various forms of
BlogPosts (individual view, generic list view, archive view, etc).

Themes can depend on multiple Content Types. This makes it possible to
scale a theme from a single Blog Post to an entire site (including
aggregate pages, such as a landing page).


[react]: https://facebook.github.io/react/
[react-router]: https://github.com/reactjs/react-router
