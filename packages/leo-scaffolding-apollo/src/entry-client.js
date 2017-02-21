import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
// Polyfill fetch
import "isomorphic-fetch";

import routes from "@sa-labs/leo-core/build/load-routes";
import hashGQLVars from './hash-gql-vars';

const gqlInterface = {
  query({ query, variables, operationName }) {
    console.log('gint');
    const { queryHash, variablesHash } = hashGQLVars(query, variables);
    return fetch(`/api/${queryHash}--${variablesHash}.json`).then(v => {
      console.log('gql-interface', v);
      return v.json();
    });
  }
};

const client = new ApolloClient({
  networkInterface: gqlInterface,
  initialState: window.__APOLLO_STATE__
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("content")
);
