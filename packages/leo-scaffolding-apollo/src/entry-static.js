import React from "react";
import ReactDOM, { renderToStaticMarkup } from "react-dom/server";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { StaticRouter as Router } from "react-router";
import path from "path";
//import "isomorphic-fetch";
import { execute } from "graphql";
const debug = require("debug")("leo-scaffolding-apollo:entry-static");

import routes from "@sa-labs/leo-core/build/load-routes";
import Html from "@sa-labs/leo-core/build/load-html";
import { conf, schema } from "@sa-labs/leo-core/build/inserted-files";
import hashGQLVars from "./hash-gql-vars";

const gqlInterface = {
  query({ query, variables, operationName }) {
    debug("gqlInterface.query", operationName);

    return execute(
      schema,
      query,
      undefined,
      undefined,
      variables,
      operationName
    ).then(json => {
      const { queryHash, variablesHash } = hashGQLVars(query, variables);
      debug(`hash ${queryHash}`);

      _globalJSONAsset({
        name: `/api/${queryHash}--${variablesHash}.json`,
        json: json
      });
      debug(json.length);
      return json;
    });
  }
};

export default (locals, callback) => {
  debug(`${locals.path} rendering`);

  const client = new ApolloClient({
    ssrMode: true,
    networkInterface: gqlInterface
  });

  let ctx = {};
  const component = (
    <ApolloProvider client={client}>
      <Router location={locals.path} context={ctx}>
        {routes}
      </Router>
    </ApolloProvider>
  );

  debug(`${locals.path} getDataFromTree`);
  getDataFromTree(component)
    .then(context => {
      debug(`${locals.path} rendering body`);
      const body = ReactDOM.renderToString(component);
      const initialState = { [client.reduxRootKey]: client.getInitialState() };
      const html = renderToStaticMarkup(
        <Html
          body={body}
          assets={locals.assets}
          bundleAssets={locals.assetsPluginHash}
          data={initialState}
        />
      );
      debug("callback");
      callback(null, html);
    })
    .catch(e => {
      debug(`${locals.path} failed`);
      callback(e);
    });
};
