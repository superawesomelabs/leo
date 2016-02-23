import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer, {
  renderToString, renderToStaticMarkup
} from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { match } from 'react-router';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';
import RelayLocalSchema from 'relay-local-schema';
import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql/type';
const debug = require('debug')('leo:entry-static-watch');

import conf from '.leorc';
import routes from './load-routes';
import HTML from './html';
import getPluginSchemas from './copyof-get-plugin-schemas';
import data from './load-database-files';

console.log('entry-static-watch');

/** gen-schema */
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: getPluginSchemas(conf.plugins, data)
});

console.log('getPluginSchemas result', getPluginSchemas(conf.plugins, data));

console.log('creating Root with Query', Query);
const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    root: {
      type: new GraphQLNonNull(Query),
      resolve: () => ({})
    }
  }
});

console.log('creating schema with Root', Root);
const schema = new GraphQLSchema({
  query: Root
});

console.log('schema', schema);
  console.log('injecting local network layer');
  Relay.injectNetworkLayer(new RelayLocalSchema.NetworkLayer({ schema }));

  RelayStoreData.getDefaultInstance()
                .getChangeEmitter()
                .injectBatchingStrategy(() => {});

// Exported static site renderer:
export default (locals, callback) => {
  //  loadLeorc((err, conf) => {
  console.log(`rendering html for ${locals.path}`)

    const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if(error) {
      console.log('had error', error)
        callback(error);
    } else {

      IsomorphicRouter.prepareData(renderProps).then((data) => {
        try {

          const body = renderToString(<IsomorphicRouter.RouterContext {...renderProps} />);
          const htmlAsString = renderToStaticMarkup(
            <HTML body={body}
            assets={locals.assets}
            bundleAssets={locals.assetsPluginHash} />
          )
            callback(null, htmlAsString);
        } catch (e) {
          console.log(e)
        }
      }, (things) => {
        console.log('things', things)
      }).catch((err) => {
        console.log('caught', err)
      })
    }
  });
};

