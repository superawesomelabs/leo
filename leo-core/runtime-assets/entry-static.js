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

import HTML from './html';

const GRAPHQL_URL = `http://localhost:3000/graphql`;

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL));

RelayStoreData.getDefaultInstance()
              .getChangeEmitter()
              .injectBatchingStrategy(() => {});

// Exported static site renderer:
export default (locals, callback) => {
  console.log(`rendering html for ${locals.path}`)

  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if(error) {
      console.log('had error', error)
      callback(error);
    } else {

      prepareData(renderProps).then((data) => {
            try {
            const body = renderToString(<RoutingContext {...renderProps} />);
            const htmlAsString = renderToStaticMarkup(
              <HTML body={body}
                    assets={locals.assets} />
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
