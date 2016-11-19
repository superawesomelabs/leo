import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import md5 from 'md5';
import { print } from 'graphql';
// Polyfill fetch
import 'isomorphic-fetch';

import routes from '@sa-labs/leo-core/build/load-routes';

const gqlInterface = {
  query({
    query,
    variables,
    operationName,
  }) {

    const variablesHash = md5(Object.entries(variables)
                                    .reduce((acc, [key, val]) => `${acc}:${key}:${val}`, ''));
    const queryHash = md5(print(query));
    return fetch(`/api/${queryHash}--${variablesHash}.json`).then(v => {
      return v.json();
    });
  }
}

const client = new ApolloClient({
  networkInterface: gqlInterface,
  initialState: window.__APOLLO_STATE__,
});

render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </ApolloProvider>
), document.getElementById('content'));
