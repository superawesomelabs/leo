import IsomorphicRelay from 'isomorphic-relay';
import Relay from 'react-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import IsomorphicRelayRouterContext from 'isomorphic-relay-router/lib/IsomorphicRelayRouterContext';
import useRelay from 'react-router-relay';
import {
  applyRouterMiddleware,
  Router,
  Route,
  match,
  browserHistory
} from 'react-router';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import md5 from 'md5';
const debug = require('debug')('leo:entry-client');

import routes from './load-routes';
//import { conf } from './inserted-files';

// Set up Relay Environment
const environment = new Relay.Environment();
environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

// Inject Data from DOM (and network?)
const data = JSON.parse(document.getElementById('preloadedData').textContent);
IsomorphicRelay.injectPreparedData(environment, data);

let cachedData = {};
function onChange(prevState, nextState, replace, cb) {
  /**
   * fetch JSON files before Relay has a chance to know it didn't have the data
   * This allows us to preload Relay's store so it doesn't make requests.
   *
   * We cache the data locally by hash of route. This is adequate for pageviews
   * but not for localstorage since the hashes of routes can change contents.
   */
  const hash = md5(window.location.pathname);
  if(!cachedData[hash]) {
    debug(`requesting ${hash}.json`);
    fetch(`/api/${hash}.json`)
                       .then(response => response.json())
                       .then(result => {
                         if(result.errors) {
                           cb('errors in json');
                         } else {
                           IsomorphicRelay.injectPreparedData(environment, result);
                           cachedData[hash] = true;
                           cb();
                         }
                       })
                       .catch(err => {
                         console.log('new error');
                         cb('error fetching json');
                       })
  } else {
    debug(`${hash}.json has already been loaded`);
    cb();
  }
}

// Client render (optional):
if (typeof document !== 'undefined') {
  debug('using client render');
  const outlet = document.getElementById('react-mount');

  // use the same routes object as on the server
  match({
    routes: <Route onChange={onChange}>{routes}</Route>,
    history: browserHistory
  }, (error, redirectLocation, renderProps) => {
    IsomorphicRouter.prepareInitialRender(environment, renderProps).then(props => {
      debug('prepareInitialRender');
      ReactDOM.render(<Router {...props} />, outlet);
    });
  });
}
