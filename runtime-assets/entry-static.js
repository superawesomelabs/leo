import IsomorphicRouter, {
  prepareData, RoutingContext
} from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer, {
  renderToString, renderToStaticMarkup
} from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { match } from 'react-router';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';
import conf from './load-leorc';
import routes from './load-routes';

// import renderOnServer from './render-on-server';

const debug = require('debug')('leo:entry-static');
console.log('running entry')

import HTML from './html';

const GRAPHQL_URL = `http://localhost:3000/graphql`;

console.log('bootstrapping Relay for node')

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL));

RelayStoreData.getDefaultInstance()
              .getChangeEmitter()
              .injectBatchingStrategy(() => {});

console.log('routes', routes);

// Exported static site renderer:
export default (locals, callback) => {
  console.log(`rendering an html file ${locals.path}`)

  console.log('bootstrapping history');
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if(error) {
      console.log('had error', error)
      callback(error);
    } else {
      console.log('matched route, preparing data', routes);

      prepareData(renderProps).then((data) => {
            console.log('prepared data, rendering site');
            try {
            const body = renderToString(<RoutingContext {...renderProps} />);
            console.log('rendered site; rendering html wrapper')
            const htmlAsString = renderToStaticMarkup(
              <HTML body={body}
                    assets={locals.assets} />
            )
            console.log('htmlAsString', htmlAsString)
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
