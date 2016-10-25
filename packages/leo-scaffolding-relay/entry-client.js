'use strict';

var _isomorphicRelay = require('isomorphic-relay');

var _isomorphicRelay2 = _interopRequireDefault(_isomorphicRelay);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _isomorphicRelayRouter = require('isomorphic-relay-router');

var _isomorphicRelayRouter2 = _interopRequireDefault(_isomorphicRelayRouter);

var _IsomorphicRelayRouterContext = require('isomorphic-relay-router/lib/IsomorphicRelayRouterContext');

var _IsomorphicRelayRouterContext2 = _interopRequireDefault(_IsomorphicRelayRouterContext);

var _reactRouterRelay = require('react-router-relay');

var _reactRouterRelay2 = _interopRequireDefault(_reactRouterRelay);

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _loadRoutes = require('@sa-labs/leo-core/build/load-routes');

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('leo:entry-client');

//import { conf } from './inserted-files';

// Set up Relay Environment
var environment = new _reactRelay2.default.Environment();
environment.injectNetworkLayer(new _reactRelay2.default.DefaultNetworkLayer('/graphql'));

// Inject Data from DOM (and network?)
var data = JSON.parse(document.getElementById('preloadedData').textContent);
_isomorphicRelay2.default.injectPreparedData(environment, data);

var cachedData = {};
function onChange(prevState, nextState, replace, cb) {
  /**
   * fetch JSON files before Relay has a chance to know it didn't have the data
   * This allows us to preload Relay's store so it doesn't make requests.
   *
   * We cache the data locally by hash of route. This is adequate for pageviews
   * but not for localstorage since the hashes of routes can change contents.
   */
  var hash = (0, _md2.default)(window.location.pathname);
  if (!cachedData[hash]) {
    debug('requesting ' + hash + '.json');
    fetch('/api/' + hash + '.json').then(function (response) {
      return response.json();
    }).then(function (result) {
      if (result.errors) {
        cb('errors in json');
      } else {
        _isomorphicRelay2.default.injectPreparedData(environment, result);
        cachedData[hash] = true;
        cb();
      }
    }).catch(function (err) {
      console.log('new error');
      cb('error fetching json');
    });
  } else {
    debug(hash + '.json has already been loaded');
    cb();
  }
}

// Client render (optional):
if (typeof document !== 'undefined') {
  (function () {
    debug('using client render');
    var outlet = document.getElementById('react-mount');

    // use the same routes object as on the server
    (0, _reactRouter.match)({
      routes: _react2.default.createElement(
        _reactRouter.Route,
        { onChange: onChange },
        _loadRoutes2.default
      ),
      history: _reactRouter.browserHistory
    }, function (error, redirectLocation, renderProps) {
      _isomorphicRelayRouter2.default.prepareInitialRender(environment, renderProps).then(function (props) {
        debug('prepareInitialRender');
        _reactDom2.default.render(_react2.default.createElement(_reactRouter.Router, props), outlet);
      });
    });
  })();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9lbnRyeS1jbGllbnQuanMiXSwibmFtZXMiOlsiZGVidWciLCJyZXF1aXJlIiwiZW52aXJvbm1lbnQiLCJFbnZpcm9ubWVudCIsImluamVjdE5ldHdvcmtMYXllciIsIkRlZmF1bHROZXR3b3JrTGF5ZXIiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRleHRDb250ZW50IiwiaW5qZWN0UHJlcGFyZWREYXRhIiwiY2FjaGVkRGF0YSIsIm9uQ2hhbmdlIiwicHJldlN0YXRlIiwibmV4dFN0YXRlIiwicmVwbGFjZSIsImNiIiwiaGFzaCIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJyZXN1bHQiLCJlcnJvcnMiLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJvdXRsZXQiLCJyb3V0ZXMiLCJoaXN0b3J5IiwiZXJyb3IiLCJyZWRpcmVjdExvY2F0aW9uIiwicmVuZGVyUHJvcHMiLCJwcmVwYXJlSW5pdGlhbFJlbmRlciIsInJlbmRlciIsInByb3BzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFPQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7Ozs7O0FBRkEsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLEVBQWlCLGtCQUFqQixDQUFkOztBQUdBOztBQUVBO0FBQ0EsSUFBTUMsY0FBYyxJQUFJLHFCQUFNQyxXQUFWLEVBQXBCO0FBQ0FELFlBQVlFLGtCQUFaLENBQStCLElBQUkscUJBQU1DLG1CQUFWLENBQThCLFVBQTlCLENBQS9COztBQUVBO0FBQ0EsSUFBTUMsT0FBT0MsS0FBS0MsS0FBTCxDQUFXQyxTQUFTQyxjQUFULENBQXdCLGVBQXhCLEVBQXlDQyxXQUFwRCxDQUFiO0FBQ0EsMEJBQWdCQyxrQkFBaEIsQ0FBbUNWLFdBQW5DLEVBQWdESSxJQUFoRDs7QUFFQSxJQUFJTyxhQUFhLEVBQWpCO0FBQ0EsU0FBU0MsUUFBVCxDQUFrQkMsU0FBbEIsRUFBNkJDLFNBQTdCLEVBQXdDQyxPQUF4QyxFQUFpREMsRUFBakQsRUFBcUQ7QUFDbkQ7Ozs7Ozs7QUFPQSxNQUFNQyxPQUFPLGtCQUFJQyxPQUFPQyxRQUFQLENBQWdCQyxRQUFwQixDQUFiO0FBQ0EsTUFBRyxDQUFDVCxXQUFXTSxJQUFYLENBQUosRUFBc0I7QUFDcEJuQiwwQkFBb0JtQixJQUFwQjtBQUNBSSxvQkFBY0osSUFBZCxZQUNvQkssSUFEcEIsQ0FDeUI7QUFBQSxhQUFZQyxTQUFTQyxJQUFULEVBQVo7QUFBQSxLQUR6QixFQUVvQkYsSUFGcEIsQ0FFeUIsa0JBQVU7QUFDZCxVQUFHRyxPQUFPQyxNQUFWLEVBQWtCO0FBQ2hCVixXQUFHLGdCQUFIO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsa0NBQWdCTixrQkFBaEIsQ0FBbUNWLFdBQW5DLEVBQWdEeUIsTUFBaEQ7QUFDQWQsbUJBQVdNLElBQVgsSUFBbUIsSUFBbkI7QUFDQUQ7QUFDRDtBQUNGLEtBVnBCLEVBV29CVyxLQVhwQixDQVcwQixlQUFPO0FBQ1pDLGNBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0FiLFNBQUcscUJBQUg7QUFDRCxLQWRwQjtBQWVELEdBakJELE1BaUJPO0FBQ0xsQixVQUFTbUIsSUFBVDtBQUNBRDtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQSxJQUFJLE9BQU9ULFFBQVAsS0FBb0IsV0FBeEIsRUFBcUM7QUFBQTtBQUNuQ1QsVUFBTSxxQkFBTjtBQUNBLFFBQU1nQyxTQUFTdkIsU0FBU0MsY0FBVCxDQUF3QixhQUF4QixDQUFmOztBQUVBO0FBQ0EsNEJBQU07QUFDSnVCLGNBQVE7QUFBQTtBQUFBLFVBQU8sVUFBVW5CLFFBQWpCO0FBQUE7QUFBQSxPQURKO0FBRUpvQjtBQUZJLEtBQU4sRUFHRyxVQUFDQyxLQUFELEVBQVFDLGdCQUFSLEVBQTBCQyxXQUExQixFQUEwQztBQUMzQyxzQ0FBaUJDLG9CQUFqQixDQUFzQ3BDLFdBQXRDLEVBQW1EbUMsV0FBbkQsRUFBZ0ViLElBQWhFLENBQXFFLGlCQUFTO0FBQzVFeEIsY0FBTSxzQkFBTjtBQUNBLDJCQUFTdUMsTUFBVCxDQUFnQixtREFBWUMsS0FBWixDQUFoQixFQUF1Q1IsTUFBdkM7QUFDRCxPQUhEO0FBSUQsS0FSRDtBQUxtQztBQWNwQyIsImZpbGUiOiJlbnRyeS1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSXNvbW9ycGhpY1JlbGF5IGZyb20gJ2lzb21vcnBoaWMtcmVsYXknO1xuaW1wb3J0IFJlbGF5IGZyb20gJ3JlYWN0LXJlbGF5JztcbmltcG9ydCBJc29tb3JwaGljUm91dGVyIGZyb20gJ2lzb21vcnBoaWMtcmVsYXktcm91dGVyJztcbmltcG9ydCBJc29tb3JwaGljUmVsYXlSb3V0ZXJDb250ZXh0IGZyb20gJ2lzb21vcnBoaWMtcmVsYXktcm91dGVyL2xpYi9Jc29tb3JwaGljUmVsYXlSb3V0ZXJDb250ZXh0JztcbmltcG9ydCB1c2VSZWxheSBmcm9tICdyZWFjdC1yb3V0ZXItcmVsYXknO1xuaW1wb3J0IHtcbiAgYXBwbHlSb3V0ZXJNaWRkbGV3YXJlLFxuICBSb3V0ZXIsXG4gIFJvdXRlLFxuICBtYXRjaCxcbiAgYnJvd3Nlckhpc3Rvcnlcbn0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00sIHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBtZDUgZnJvbSAnbWQ1JztcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnbGVvOmVudHJ5LWNsaWVudCcpO1xuXG5pbXBvcnQgcm91dGVzIGZyb20gJ0BzYS1sYWJzL2xlby1jb3JlL2J1aWxkL2xvYWQtcm91dGVzJztcbi8vaW1wb3J0IHsgY29uZiB9IGZyb20gJy4vaW5zZXJ0ZWQtZmlsZXMnO1xuXG4vLyBTZXQgdXAgUmVsYXkgRW52aXJvbm1lbnRcbmNvbnN0IGVudmlyb25tZW50ID0gbmV3IFJlbGF5LkVudmlyb25tZW50KCk7XG5lbnZpcm9ubWVudC5pbmplY3ROZXR3b3JrTGF5ZXIobmV3IFJlbGF5LkRlZmF1bHROZXR3b3JrTGF5ZXIoJy9ncmFwaHFsJykpO1xuXG4vLyBJbmplY3QgRGF0YSBmcm9tIERPTSAoYW5kIG5ldHdvcms/KVxuY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZWxvYWRlZERhdGEnKS50ZXh0Q29udGVudCk7XG5Jc29tb3JwaGljUmVsYXkuaW5qZWN0UHJlcGFyZWREYXRhKGVudmlyb25tZW50LCBkYXRhKTtcblxubGV0IGNhY2hlZERhdGEgPSB7fTtcbmZ1bmN0aW9uIG9uQ2hhbmdlKHByZXZTdGF0ZSwgbmV4dFN0YXRlLCByZXBsYWNlLCBjYikge1xuICAvKipcbiAgICogZmV0Y2ggSlNPTiBmaWxlcyBiZWZvcmUgUmVsYXkgaGFzIGEgY2hhbmNlIHRvIGtub3cgaXQgZGlkbid0IGhhdmUgdGhlIGRhdGFcbiAgICogVGhpcyBhbGxvd3MgdXMgdG8gcHJlbG9hZCBSZWxheSdzIHN0b3JlIHNvIGl0IGRvZXNuJ3QgbWFrZSByZXF1ZXN0cy5cbiAgICpcbiAgICogV2UgY2FjaGUgdGhlIGRhdGEgbG9jYWxseSBieSBoYXNoIG9mIHJvdXRlLiBUaGlzIGlzIGFkZXF1YXRlIGZvciBwYWdldmlld3NcbiAgICogYnV0IG5vdCBmb3IgbG9jYWxzdG9yYWdlIHNpbmNlIHRoZSBoYXNoZXMgb2Ygcm91dGVzIGNhbiBjaGFuZ2UgY29udGVudHMuXG4gICAqL1xuICBjb25zdCBoYXNoID0gbWQ1KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gIGlmKCFjYWNoZWREYXRhW2hhc2hdKSB7XG4gICAgZGVidWcoYHJlcXVlc3RpbmcgJHtoYXNofS5qc29uYCk7XG4gICAgZmV0Y2goYC9hcGkvJHtoYXNofS5qc29uYClcbiAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKCdlcnJvcnMgaW4ganNvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBJc29tb3JwaGljUmVsYXkuaW5qZWN0UHJlcGFyZWREYXRhKGVudmlyb25tZW50LCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVkRGF0YVtoYXNoXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNiKCdlcnJvciBmZXRjaGluZyBqc29uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZGVidWcoYCR7aGFzaH0uanNvbiBoYXMgYWxyZWFkeSBiZWVuIGxvYWRlZGApO1xuICAgIGNiKCk7XG4gIH1cbn1cblxuLy8gQ2xpZW50IHJlbmRlciAob3B0aW9uYWwpOlxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgZGVidWcoJ3VzaW5nIGNsaWVudCByZW5kZXInKTtcbiAgY29uc3Qgb3V0bGV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlYWN0LW1vdW50Jyk7XG5cbiAgLy8gdXNlIHRoZSBzYW1lIHJvdXRlcyBvYmplY3QgYXMgb24gdGhlIHNlcnZlclxuICBtYXRjaCh7XG4gICAgcm91dGVzOiA8Um91dGUgb25DaGFuZ2U9e29uQ2hhbmdlfT57cm91dGVzfTwvUm91dGU+LFxuICAgIGhpc3Rvcnk6IGJyb3dzZXJIaXN0b3J5XG4gIH0sIChlcnJvciwgcmVkaXJlY3RMb2NhdGlvbiwgcmVuZGVyUHJvcHMpID0+IHtcbiAgICBJc29tb3JwaGljUm91dGVyLnByZXBhcmVJbml0aWFsUmVuZGVyKGVudmlyb25tZW50LCByZW5kZXJQcm9wcykudGhlbihwcm9wcyA9PiB7XG4gICAgICBkZWJ1ZygncHJlcGFyZUluaXRpYWxSZW5kZXInKTtcbiAgICAgIFJlYWN0RE9NLnJlbmRlcig8Um91dGVyIHsuLi5wcm9wc30gLz4sIG91dGxldCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19