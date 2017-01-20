import React, { Component } from "react";
import { Route, IndexRoute } from "react-router";

class NoMatch extends Component {
  render() {
    return <div>404</div>;
  }
}

class App extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
class Home extends Component {
  render() {
    return (
      <section>
        <h1>Welcome to LEO</h1>
        <p>Write a routes.js file to get started</p>
      </section>
    );
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="*" component={NoMatch} />
  </Route>
)
