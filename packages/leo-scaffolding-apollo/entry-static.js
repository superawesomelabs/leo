"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _apolloClient = require("apollo-client");

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _reactApollo = require("react-apollo");

var _reactRouter = require("react-router");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _graphql = require("graphql");

var _loadRoutes = require("@sa-labs/leo-core/build/load-routes");

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

var _loadHtml = require("@sa-labs/leo-core/build/load-html");

var _loadHtml2 = _interopRequireDefault(_loadHtml);

var _insertedFiles = require("@sa-labs/leo-core/build/inserted-files");

var _hashGqlVars = require("./hash-gql-vars");

var _hashGqlVars2 = _interopRequireDefault(_hashGqlVars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require("debug")("leo-scaffolding-apollo:entry-static");
//import "isomorphic-fetch";


var gqlInterface = {
  query: function query(_ref) {
    var _query = _ref.query,
        variables = _ref.variables,
        operationName = _ref.operationName;

    debug("gqlInterface.query", operationName);

    return (0, _graphql.execute)(_insertedFiles.schema, _query, undefined, undefined, variables, operationName).then(function (json) {
      var _hashGQLVars = (0, _hashGqlVars2.default)(_query, variables),
          queryHash = _hashGQLVars.queryHash,
          variablesHash = _hashGQLVars.variablesHash;

      debug("hash " + queryHash);

      _globalJSONAsset({
        name: "/api/" + queryHash + "--" + variablesHash + ".json",
        json: json
      });
      debug(json.length);
      return json;
    });
  }
};

exports.default = function (locals, callback) {
  debug(locals.path + " rendering");

  var client = new _apolloClient2.default({
    ssrMode: true,
    networkInterface: gqlInterface
  });

  var ctx = {};
  var component = _react2.default.createElement(
    _reactApollo.ApolloProvider,
    { client: client },
    _react2.default.createElement(
      _reactRouter.StaticRouter,
      { location: locals.path, context: ctx },
      _loadRoutes2.default
    )
  );

  debug(locals.path + " getDataFromTree");
  (0, _reactApollo.getDataFromTree)(component).then(function (context) {
    debug(locals.path + " rendering body");
    var body = _server2.default.renderToString(component);
    var initialState = (0, _defineProperty3.default)({}, client.reduxRootKey, client.getInitialState());
    var html = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_loadHtml2.default, {
      body: body,
      assets: locals.assets,
      bundleAssets: locals.assetsPluginHash,
      data: initialState
    }));
    debug("callback");
    callback(null, html);
  }).catch(function (e) {
    debug(locals.path + " failed");
    callback(e);
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9lbnRyeS1zdGF0aWMuanMiXSwibmFtZXMiOlsiZGVidWciLCJyZXF1aXJlIiwiZ3FsSW50ZXJmYWNlIiwicXVlcnkiLCJ2YXJpYWJsZXMiLCJvcGVyYXRpb25OYW1lIiwidW5kZWZpbmVkIiwidGhlbiIsInF1ZXJ5SGFzaCIsInZhcmlhYmxlc0hhc2giLCJfZ2xvYmFsSlNPTkFzc2V0IiwibmFtZSIsImpzb24iLCJsZW5ndGgiLCJsb2NhbHMiLCJjYWxsYmFjayIsInBhdGgiLCJjbGllbnQiLCJzc3JNb2RlIiwibmV0d29ya0ludGVyZmFjZSIsImN0eCIsImNvbXBvbmVudCIsImJvZHkiLCJyZW5kZXJUb1N0cmluZyIsImluaXRpYWxTdGF0ZSIsInJlZHV4Um9vdEtleSIsImdldEluaXRpYWxTdGF0ZSIsImh0bWwiLCJhc3NldHMiLCJhc3NldHNQbHVnaW5IYXNoIiwiY2F0Y2giLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUxBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixFQUFpQixxQ0FBakIsQ0FBZDtBQUZBOzs7QUFTQSxJQUFNQyxlQUFlO0FBQ25CQyxPQURtQix1QkFDd0I7QUFBQSxRQUFuQ0EsTUFBbUMsUUFBbkNBLEtBQW1DO0FBQUEsUUFBNUJDLFNBQTRCLFFBQTVCQSxTQUE0QjtBQUFBLFFBQWpCQyxhQUFpQixRQUFqQkEsYUFBaUI7O0FBQ3pDTCxVQUFNLG9CQUFOLEVBQTRCSyxhQUE1Qjs7QUFFQSxXQUFPLDZDQUVMRixNQUZLLEVBR0xHLFNBSEssRUFJTEEsU0FKSyxFQUtMRixTQUxLLEVBTUxDLGFBTkssRUFPTEUsSUFQSyxDQU9BLGdCQUFRO0FBQUEseUJBQ3dCLDJCQUFZSixNQUFaLEVBQW1CQyxTQUFuQixDQUR4QjtBQUFBLFVBQ0xJLFNBREssZ0JBQ0xBLFNBREs7QUFBQSxVQUNNQyxhQUROLGdCQUNNQSxhQUROOztBQUViVCxzQkFBY1EsU0FBZDs7QUFFQUUsdUJBQWlCO0FBQ2ZDLHdCQUFjSCxTQUFkLFVBQTRCQyxhQUE1QixVQURlO0FBRWZHLGNBQU1BO0FBRlMsT0FBakI7QUFJQVosWUFBTVksS0FBS0MsTUFBWDtBQUNBLGFBQU9ELElBQVA7QUFDRCxLQWpCTSxDQUFQO0FBa0JEO0FBdEJrQixDQUFyQjs7a0JBeUJlLFVBQUNFLE1BQUQsRUFBU0MsUUFBVCxFQUFzQjtBQUNuQ2YsUUFBU2MsT0FBT0UsSUFBaEI7O0FBRUEsTUFBTUMsU0FBUywyQkFBaUI7QUFDOUJDLGFBQVMsSUFEcUI7QUFFOUJDLHNCQUFrQmpCO0FBRlksR0FBakIsQ0FBZjs7QUFLQSxNQUFJa0IsTUFBTSxFQUFWO0FBQ0EsTUFBTUMsWUFDSjtBQUFBO0FBQUEsTUFBZ0IsUUFBUUosTUFBeEI7QUFDRTtBQUFBO0FBQUEsUUFBUSxVQUFVSCxPQUFPRSxJQUF6QixFQUErQixTQUFTSSxHQUF4QztBQUFBO0FBQUE7QUFERixHQURGOztBQVFBcEIsUUFBU2MsT0FBT0UsSUFBaEI7QUFDQSxvQ0FBZ0JLLFNBQWhCLEVBQ0dkLElBREgsQ0FDUSxtQkFBVztBQUNmUCxVQUFTYyxPQUFPRSxJQUFoQjtBQUNBLFFBQU1NLE9BQU8saUJBQVNDLGNBQVQsQ0FBd0JGLFNBQXhCLENBQWI7QUFDQSxRQUFNRyxpREFBa0JQLE9BQU9RLFlBQXpCLEVBQXdDUixPQUFPUyxlQUFQLEVBQXhDLENBQU47QUFDQSxRQUFNQyxPQUFPLGtDQUNYO0FBQ0UsWUFBTUwsSUFEUjtBQUVFLGNBQVFSLE9BQU9jLE1BRmpCO0FBR0Usb0JBQWNkLE9BQU9lLGdCQUh2QjtBQUlFLFlBQU1MO0FBSlIsTUFEVyxDQUFiO0FBUUF4QixVQUFNLFVBQU47QUFDQWUsYUFBUyxJQUFULEVBQWVZLElBQWY7QUFDRCxHQWZILEVBZ0JHRyxLQWhCSCxDQWdCUyxhQUFLO0FBQ1Y5QixVQUFTYyxPQUFPRSxJQUFoQjtBQUNBRCxhQUFTZ0IsQ0FBVDtBQUNELEdBbkJIO0FBb0JELEMiLCJmaWxlIjoiZW50cnktc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NLCB7IHJlbmRlclRvU3RhdGljTWFya3VwIH0gZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIjtcbmltcG9ydCBBcG9sbG9DbGllbnQsIHsgY3JlYXRlTmV0d29ya0ludGVyZmFjZSB9IGZyb20gXCJhcG9sbG8tY2xpZW50XCI7XG5pbXBvcnQgeyBBcG9sbG9Qcm92aWRlciwgZ2V0RGF0YUZyb21UcmVlIH0gZnJvbSBcInJlYWN0LWFwb2xsb1wiO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIGFzIFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG4vL2ltcG9ydCBcImlzb21vcnBoaWMtZmV0Y2hcIjtcbmltcG9ydCB7IGV4ZWN1dGUgfSBmcm9tIFwiZ3JhcGhxbFwiO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJsZW8tc2NhZmZvbGRpbmctYXBvbGxvOmVudHJ5LXN0YXRpY1wiKTtcblxuaW1wb3J0IHJvdXRlcyBmcm9tIFwiQHNhLWxhYnMvbGVvLWNvcmUvYnVpbGQvbG9hZC1yb3V0ZXNcIjtcbmltcG9ydCBIdG1sIGZyb20gXCJAc2EtbGFicy9sZW8tY29yZS9idWlsZC9sb2FkLWh0bWxcIjtcbmltcG9ydCB7IGNvbmYsIHNjaGVtYSB9IGZyb20gXCJAc2EtbGFicy9sZW8tY29yZS9idWlsZC9pbnNlcnRlZC1maWxlc1wiO1xuaW1wb3J0IGhhc2hHUUxWYXJzIGZyb20gXCIuL2hhc2gtZ3FsLXZhcnNcIjtcblxuY29uc3QgZ3FsSW50ZXJmYWNlID0ge1xuICBxdWVyeSh7IHF1ZXJ5LCB2YXJpYWJsZXMsIG9wZXJhdGlvbk5hbWUgfSkge1xuICAgIGRlYnVnKFwiZ3FsSW50ZXJmYWNlLnF1ZXJ5XCIsIG9wZXJhdGlvbk5hbWUpO1xuXG4gICAgcmV0dXJuIGV4ZWN1dGUoXG4gICAgICBzY2hlbWEsXG4gICAgICBxdWVyeSxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHZhcmlhYmxlcyxcbiAgICAgIG9wZXJhdGlvbk5hbWVcbiAgICApLnRoZW4oanNvbiA9PiB7XG4gICAgICBjb25zdCB7IHF1ZXJ5SGFzaCwgdmFyaWFibGVzSGFzaCB9ID0gaGFzaEdRTFZhcnMocXVlcnksIHZhcmlhYmxlcyk7XG4gICAgICBkZWJ1ZyhgaGFzaCAke3F1ZXJ5SGFzaH1gKTtcblxuICAgICAgX2dsb2JhbEpTT05Bc3NldCh7XG4gICAgICAgIG5hbWU6IGAvYXBpLyR7cXVlcnlIYXNofS0tJHt2YXJpYWJsZXNIYXNofS5qc29uYCxcbiAgICAgICAganNvbjoganNvblxuICAgICAgfSk7XG4gICAgICBkZWJ1Zyhqc29uLmxlbmd0aCk7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKGxvY2FscywgY2FsbGJhY2spID0+IHtcbiAgZGVidWcoYCR7bG9jYWxzLnBhdGh9IHJlbmRlcmluZ2ApO1xuXG4gIGNvbnN0IGNsaWVudCA9IG5ldyBBcG9sbG9DbGllbnQoe1xuICAgIHNzck1vZGU6IHRydWUsXG4gICAgbmV0d29ya0ludGVyZmFjZTogZ3FsSW50ZXJmYWNlXG4gIH0pO1xuXG4gIGxldCBjdHggPSB7fTtcbiAgY29uc3QgY29tcG9uZW50ID0gKFxuICAgIDxBcG9sbG9Qcm92aWRlciBjbGllbnQ9e2NsaWVudH0+XG4gICAgICA8Um91dGVyIGxvY2F0aW9uPXtsb2NhbHMucGF0aH0gY29udGV4dD17Y3R4fT5cbiAgICAgICAge3JvdXRlc31cbiAgICAgIDwvUm91dGVyPlxuICAgIDwvQXBvbGxvUHJvdmlkZXI+XG4gICk7XG5cbiAgZGVidWcoYCR7bG9jYWxzLnBhdGh9IGdldERhdGFGcm9tVHJlZWApO1xuICBnZXREYXRhRnJvbVRyZWUoY29tcG9uZW50KVxuICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgZGVidWcoYCR7bG9jYWxzLnBhdGh9IHJlbmRlcmluZyBib2R5YCk7XG4gICAgICBjb25zdCBib2R5ID0gUmVhY3RET00ucmVuZGVyVG9TdHJpbmcoY29tcG9uZW50KTtcbiAgICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHsgW2NsaWVudC5yZWR1eFJvb3RLZXldOiBjbGllbnQuZ2V0SW5pdGlhbFN0YXRlKCkgfTtcbiAgICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0YXRpY01hcmt1cChcbiAgICAgICAgPEh0bWxcbiAgICAgICAgICBib2R5PXtib2R5fVxuICAgICAgICAgIGFzc2V0cz17bG9jYWxzLmFzc2V0c31cbiAgICAgICAgICBidW5kbGVBc3NldHM9e2xvY2Fscy5hc3NldHNQbHVnaW5IYXNofVxuICAgICAgICAgIGRhdGE9e2luaXRpYWxTdGF0ZX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBkZWJ1ZyhcImNhbGxiYWNrXCIpO1xuICAgICAgY2FsbGJhY2sobnVsbCwgaHRtbCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZSA9PiB7XG4gICAgICBkZWJ1ZyhgJHtsb2NhbHMucGF0aH0gZmFpbGVkYCk7XG4gICAgICBjYWxsYmFjayhlKTtcbiAgICB9KTtcbn07XG4iXX0=