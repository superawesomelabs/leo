import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer, {
  renderToString, renderToStaticMarkup
} from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { match } from 'react-router';
import Relay from 'react-relay';
import RelayLocalSchema from 'relay-local-schema';
const debug = require('debug')('leo:entry-static-watch');

import { conf, schema } from './inserted-files';
import routes from './load-routes';
import HTML from './html';

console.log('injecting local network layer');
Relay.injectNetworkLayer(new RelayLocalSchema.NetworkLayer({
  schema,
  onError: (errors, request) => console.error(errors, request)
}));

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

      IsomorphicRouter.prepareData(renderProps).then(({ data, props }) => {
        try {
          const body = renderToString(<IsomorphicRouter.RouterContext {...props} />);
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

