'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _reactApollo = require('react-apollo');

var _server3 = require('react-apollo/server');

var _reactRouter = require('react-router');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

require('isomorphic-fetch');

var _graphql = require('graphql');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _loadRoutes = require('@sa-labs/leo-core/build/load-routes');

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

var _loadHtml = require('@sa-labs/leo-core/build/load-html');

var _loadHtml2 = _interopRequireDefault(_loadHtml);

var _insertedFiles = require('@sa-labs/leo-core/build/inserted-files');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('leo-scaffolding-apollo:entry-static');


var basePort = process.env.PORT || 3000;
var apiHost = 'http://localhost:' + (basePort + 10);
var apiUrl = apiHost + '/graphql';

var gqlInterface = {
  query: function query(_ref) {
    var _query = _ref.query,
        variables = _ref.variables,
        operationName = _ref.operationName;

    // TODO: static render is failing for some reason?!?!?
    var variablesString = (0, _entries2.default)(variables).reduce(function (acc, _ref2) {
      var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
          key = _ref3[0],
          val = _ref3[1];

      return acc + ':' + key + ':' + val;
    }, '');
    var queryHash = (0, _md2.default)((0, _graphql.print)(_query));
    return (0, _graphql.execute)(_insertedFiles.schema, _query, undefined, undefined, variables, operationName).then(function (json) {
      _globalJSONAsset({
        name: '/api/' + queryHash + '--' + (0, _md2.default)(variablesString) + '.json',
        json: json
      });
      debug(json.length);
      return json;
    });
  }
};

exports.default = function (locals, callback) {
  debug(locals.path + ' rendering');
  var history = (0, _reactRouter.createMemoryHistory)();
  var location = history.createLocation(locals.path);

  (0, _reactRouter.match)({ routes: _loadRoutes2.default, location: location }, function (error, redirectLocation, renderProps) {
    var client = new _apolloClient2.default({
      ssrMode: true,
      networkInterface: gqlInterface
    });

    var component = _react2.default.createElement(
      _reactApollo.ApolloProvider,
      { client: client },
      _react2.default.createElement(_reactRouter.RouterContext, renderProps)
    );

    (0, _server3.getDataFromTree)(component).then(function (context) {
      var body = _server2.default.renderToString(component);
      var html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_loadHtml2.default, {
        body: body,
        assets: locals.assets,
        bundleAssets: locals.assetsPluginHash,
        props: renderProps,
        data: context.store.getState().apollo.data
      }));
      callback(null, html);
    }).catch(function (e) {
      debug(locals.path + ' failed');
      callback(e);
    });
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9lbnRyeS1zdGF0aWMuanMiXSwibmFtZXMiOlsiZGVidWciLCJyZXF1aXJlIiwiYmFzZVBvcnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImFwaUhvc3QiLCJhcGlVcmwiLCJncWxJbnRlcmZhY2UiLCJxdWVyeSIsInZhcmlhYmxlcyIsIm9wZXJhdGlvbk5hbWUiLCJ2YXJpYWJsZXNTdHJpbmciLCJyZWR1Y2UiLCJhY2MiLCJrZXkiLCJ2YWwiLCJxdWVyeUhhc2giLCJ1bmRlZmluZWQiLCJ0aGVuIiwiX2dsb2JhbEpTT05Bc3NldCIsIm5hbWUiLCJqc29uIiwibGVuZ3RoIiwibG9jYWxzIiwiY2FsbGJhY2siLCJwYXRoIiwiaGlzdG9yeSIsImxvY2F0aW9uIiwiY3JlYXRlTG9jYXRpb24iLCJyb3V0ZXMiLCJlcnJvciIsInJlZGlyZWN0TG9jYXRpb24iLCJyZW5kZXJQcm9wcyIsImNsaWVudCIsInNzck1vZGUiLCJuZXR3b3JrSW50ZXJmYWNlIiwiY29tcG9uZW50IiwiYm9keSIsInJlbmRlclRvU3RyaW5nIiwiaHRtbCIsImFzc2V0cyIsImFzc2V0c1BsdWdpbkhhc2giLCJjb250ZXh0Iiwic3RvcmUiLCJnZXRTdGF0ZSIsImFwb2xsbyIsImRhdGEiLCJjYXRjaCIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFHQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUxBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixFQUFpQixxQ0FBakIsQ0FBZDs7O0FBVUEsSUFBTUMsV0FBV0MsUUFBUUMsR0FBUixDQUFZQyxJQUFaLElBQW9CLElBQXJDO0FBQ0EsSUFBTUMsaUNBQThCSixXQUFXLEVBQXpDLENBQU47QUFDQSxJQUFNSyxTQUFZRCxPQUFaLGFBQU47O0FBRUEsSUFBTUUsZUFBZTtBQUNuQkMsT0FEbUIsdUJBS2hCO0FBQUEsUUFIREEsTUFHQyxRQUhEQSxLQUdDO0FBQUEsUUFGREMsU0FFQyxRQUZEQSxTQUVDO0FBQUEsUUFEREMsYUFDQyxRQUREQSxhQUNDOztBQUNEO0FBQ0EsUUFBTUMsa0JBQWtCLHVCQUFlRixTQUFmLEVBQ09HLE1BRFAsQ0FDYyxVQUFDQyxHQUFEO0FBQUE7QUFBQSxVQUFPQyxHQUFQO0FBQUEsVUFBWUMsR0FBWjs7QUFBQSxhQUF3QkYsR0FBeEIsU0FBK0JDLEdBQS9CLFNBQXNDQyxHQUF0QztBQUFBLEtBRGQsRUFDMkQsRUFEM0QsQ0FBeEI7QUFFQSxRQUFNQyxZQUFZLGtCQUFJLG9CQUFNUixNQUFOLENBQUosQ0FBbEI7QUFDQSxXQUFPLDZDQUFnQkEsTUFBaEIsRUFBdUJTLFNBQXZCLEVBQWtDQSxTQUFsQyxFQUE2Q1IsU0FBN0MsRUFBd0RDLGFBQXhELEVBQXVFUSxJQUF2RSxDQUE0RSxnQkFBUTtBQUN6RkMsdUJBQWlCO0FBQ2ZDLHdCQUFjSixTQUFkLFVBQTRCLGtCQUFJTCxlQUFKLENBQTVCLFVBRGU7QUFFZlUsY0FBTUE7QUFGUyxPQUFqQjtBQUlBdEIsWUFBTXNCLEtBQUtDLE1BQVg7QUFDQSxhQUFPRCxJQUFQO0FBQ0QsS0FQTSxDQUFQO0FBUUQ7QUFsQmtCLENBQXJCOztrQkFzQmUsVUFBQ0UsTUFBRCxFQUFTQyxRQUFULEVBQXNCO0FBQ25DekIsUUFBU3dCLE9BQU9FLElBQWhCO0FBQ0EsTUFBTUMsVUFBVSx1Q0FBaEI7QUFDQSxNQUFNQyxXQUFXRCxRQUFRRSxjQUFSLENBQXVCTCxPQUFPRSxJQUE5QixDQUFqQjs7QUFFQSwwQkFBTSxFQUFFSSw0QkFBRixFQUFVRixrQkFBVixFQUFOLEVBQTRCLFVBQUNHLEtBQUQsRUFBUUMsZ0JBQVIsRUFBMEJDLFdBQTFCLEVBQTBDO0FBQ3BFLFFBQU1DLFNBQVMsMkJBQWlCO0FBQzlCQyxlQUFTLElBRHFCO0FBRTlCQyx3QkFBa0I1QjtBQUZZLEtBQWpCLENBQWY7O0FBS0EsUUFBTTZCLFlBQ0o7QUFBQTtBQUFBLFFBQWdCLFFBQVFILE1BQXhCO0FBQ0UsZ0VBQW1CRCxXQUFuQjtBQURGLEtBREY7O0FBTUEsa0NBQWdCSSxTQUFoQixFQUEyQmxCLElBQTNCLENBQWdDLG1CQUFXO0FBQ3pDLFVBQU1tQixPQUFPLGlCQUFTQyxjQUFULENBQXdCRixTQUF4QixDQUFiO0FBQ0EsVUFBTUcsT0FBTyxrQ0FDWDtBQUNFLGNBQU1GLElBRFI7QUFFRSxnQkFBUWQsT0FBT2lCLE1BRmpCO0FBR0Usc0JBQWNqQixPQUFPa0IsZ0JBSHZCO0FBSUUsZUFBT1QsV0FKVDtBQUtFLGNBQU1VLFFBQVFDLEtBQVIsQ0FBY0MsUUFBZCxHQUF5QkMsTUFBekIsQ0FBZ0NDO0FBTHhDLFFBRFcsQ0FBYjtBQVNBdEIsZUFBUyxJQUFULEVBQWVlLElBQWY7QUFDRCxLQVpELEVBWUdRLEtBWkgsQ0FZUyxhQUFLO0FBQ1poRCxZQUFTd0IsT0FBT0UsSUFBaEI7QUFDQUQsZUFBU3dCLENBQVQ7QUFDRCxLQWZEO0FBZ0JELEdBNUJEO0FBNkJELEMiLCJmaWxlIjoiZW50cnktc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSwgeyByZW5kZXJUb1N0YXRpY01hcmt1cCB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IEFwb2xsb0NsaWVudCwgeyBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlIH0gZnJvbSAnYXBvbGxvLWNsaWVudCc7XG5pbXBvcnQgeyBBcG9sbG9Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWFwb2xsbyc7XG5pbXBvcnQgeyBnZXREYXRhRnJvbVRyZWUgfSBmcm9tICdyZWFjdC1hcG9sbG8vc2VydmVyJztcbmltcG9ydCB7IG1hdGNoLCBSb3V0ZXJDb250ZXh0LCBjcmVhdGVNZW1vcnlIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICdpc29tb3JwaGljLWZldGNoJztcbmltcG9ydCB7IGV4ZWN1dGUgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCB7IHByaW50IH0gZnJvbSAnZ3JhcGhxbCc7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2xlby1zY2FmZm9sZGluZy1hcG9sbG86ZW50cnktc3RhdGljJyk7XG5pbXBvcnQgbWQ1IGZyb20gJ21kNSc7XG5cbmltcG9ydCByb3V0ZXMgZnJvbSAnQHNhLWxhYnMvbGVvLWNvcmUvYnVpbGQvbG9hZC1yb3V0ZXMnO1xuaW1wb3J0IEh0bWwgZnJvbSAnQHNhLWxhYnMvbGVvLWNvcmUvYnVpbGQvbG9hZC1odG1sJztcbmltcG9ydCB7XG4gIGNvbmYsXG4gIHNjaGVtYVxufSBmcm9tICdAc2EtbGFicy9sZW8tY29yZS9idWlsZC9pbnNlcnRlZC1maWxlcyc7XG5cbmNvbnN0IGJhc2VQb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuY29uc3QgYXBpSG9zdCA9IGBodHRwOi8vbG9jYWxob3N0OiR7YmFzZVBvcnQgKyAxMH1gO1xuY29uc3QgYXBpVXJsID0gYCR7YXBpSG9zdH0vZ3JhcGhxbGA7XG5cbmNvbnN0IGdxbEludGVyZmFjZSA9IHtcbiAgcXVlcnkoe1xuICAgIHF1ZXJ5LFxuICAgIHZhcmlhYmxlcyxcbiAgICBvcGVyYXRpb25OYW1lLFxuICB9KSB7XG4gICAgLy8gVE9ETzogc3RhdGljIHJlbmRlciBpcyBmYWlsaW5nIGZvciBzb21lIHJlYXNvbj8hPyE/XG4gICAgY29uc3QgdmFyaWFibGVzU3RyaW5nID0gT2JqZWN0LmVudHJpZXModmFyaWFibGVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgW2tleSwgdmFsXSkgPT4gYCR7YWNjfToke2tleX06JHt2YWx9YCwgJycpO1xuICAgIGNvbnN0IHF1ZXJ5SGFzaCA9IG1kNShwcmludChxdWVyeSkpO1xuICAgIHJldHVybiBleGVjdXRlKHNjaGVtYSwgcXVlcnksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2YXJpYWJsZXMsIG9wZXJhdGlvbk5hbWUpLnRoZW4oanNvbiA9PiB7XG4gICAgICBfZ2xvYmFsSlNPTkFzc2V0KHtcbiAgICAgICAgbmFtZTogYC9hcGkvJHtxdWVyeUhhc2h9LS0ke21kNSh2YXJpYWJsZXNTdHJpbmcpfS5qc29uYCxcbiAgICAgICAganNvbjoganNvblxuICAgICAgfSk7XG4gICAgICBkZWJ1Zyhqc29uLmxlbmd0aCk7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9KVxuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgKGxvY2FscywgY2FsbGJhY2spID0+IHtcbiAgZGVidWcoYCR7bG9jYWxzLnBhdGh9IHJlbmRlcmluZ2ApO1xuICBjb25zdCBoaXN0b3J5ID0gY3JlYXRlTWVtb3J5SGlzdG9yeSgpO1xuICBjb25zdCBsb2NhdGlvbiA9IGhpc3RvcnkuY3JlYXRlTG9jYXRpb24obG9jYWxzLnBhdGgpO1xuXG4gIG1hdGNoKHsgcm91dGVzLCBsb2NhdGlvbiB9LCAoZXJyb3IsIHJlZGlyZWN0TG9jYXRpb24sIHJlbmRlclByb3BzKSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gbmV3IEFwb2xsb0NsaWVudCh7XG4gICAgICBzc3JNb2RlOiB0cnVlLFxuICAgICAgbmV0d29ya0ludGVyZmFjZTogZ3FsSW50ZXJmYWNlXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSAoXG4gICAgICA8QXBvbGxvUHJvdmlkZXIgY2xpZW50PXtjbGllbnR9PlxuICAgICAgICA8Um91dGVyQ29udGV4dCB7Li4ucmVuZGVyUHJvcHN9IC8+XG4gICAgICA8L0Fwb2xsb1Byb3ZpZGVyPlxuICAgICk7XG5cbiAgICBnZXREYXRhRnJvbVRyZWUoY29tcG9uZW50KS50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IFJlYWN0RE9NLnJlbmRlclRvU3RyaW5nKGNvbXBvbmVudCk7XG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdGF0aWNNYXJrdXAoXG4gICAgICAgIDxIdG1sXG4gICAgICAgICAgYm9keT17Ym9keX1cbiAgICAgICAgICBhc3NldHM9e2xvY2Fscy5hc3NldHN9XG4gICAgICAgICAgYnVuZGxlQXNzZXRzPXtsb2NhbHMuYXNzZXRzUGx1Z2luSGFzaH1cbiAgICAgICAgICBwcm9wcz17cmVuZGVyUHJvcHN9XG4gICAgICAgICAgZGF0YT17Y29udGV4dC5zdG9yZS5nZXRTdGF0ZSgpLmFwb2xsby5kYXRhfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgIGNhbGxiYWNrKG51bGwsIGh0bWwpO1xuICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgZGVidWcoYCR7bG9jYWxzLnBhdGh9IGZhaWxlZGApO1xuICAgICAgY2FsbGJhY2soZSk7XG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==