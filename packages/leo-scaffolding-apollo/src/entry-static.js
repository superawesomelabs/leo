import React from "react";
import ReactDOM, { renderToStaticMarkup } from "react-dom/server";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { getDataFromTree } from "react-apollo/server";
import { match, RouterContext, createMemoryHistory } from "react-router";
import path from "path";
import "isomorphic-fetch";
import { execute } from "graphql";
import { print } from "graphql";
const debug = require("debug")("leo-scaffolding-apollo:entry-static");
import md5 from "md5";

import routes from "@sa-labs/leo-core/build/load-routes";
import Html from "@sa-labs/leo-core/build/load-html";
import { conf, schema } from "@sa-labs/leo-core/build/inserted-files";

const basePort = process.env.PORT || 3000;
const apiHost = `http://localhost:${basePort + 10}`;
const apiUrl = `${apiHost}/graphql`;

const gqlInterface = {
  query({ query, variables, operationName }) {
    // TODO: static render is failing for some reason?!?!?
    const variablesString = Object
      .entries(variables)
      .reduce((acc, [ key, val ]) => `${acc}:${key}:${val}`, "");
    const queryHash = md5(print(query));
    return execute(
      schema,
      query,
      undefined,
      undefined,
      variables,
      operationName
    ).then(json => {
      _globalJSONAsset({
        name: `/api/${queryHash}--${md5(variablesString)}.json`,
        json: json
      });
      debug(json.length);
      return json;
    });
  }
};

export default (locals, callback) => {
  debug(`${locals.path} rendering`);
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const client = new ApolloClient({
      ssrMode: true,
      networkInterface: gqlInterface
    });

    const component = (
      <ApolloProvider client={client}>
        <RouterContext {...renderProps} />
      </ApolloProvider>
    );

    getDataFromTree(component)
      .then(context => {
        const body = ReactDOM.renderToString(component);
        const html = renderToStaticMarkup(
          <Html
            body={body}
            assets={locals.assets}
            bundleAssets={locals.assetsPluginHash}
            props={renderProps}
            data={context.store.getState().apollo.data}
          />
        );
        callback(null, html);
      })
      .catch(e => {
        debug(`${locals.path} failed`);
        callback(e);
      });
  });
};
