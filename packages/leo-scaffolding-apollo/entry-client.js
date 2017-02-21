"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRouterDom = require("react-router-dom");

var _apolloClient = require("apollo-client");

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _reactApollo = require("react-apollo");

require("isomorphic-fetch");

var _loadRoutes = require("@sa-labs/leo-core/build/load-routes");

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

var _hashGqlVars = require("./hash-gql-vars");

var _hashGqlVars2 = _interopRequireDefault(_hashGqlVars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gqlInterface = {
  query: function query(_ref) {
    var _query = _ref.query,
        variables = _ref.variables,
        operationName = _ref.operationName;

    console.log('gint');

    var _hashGQLVars = (0, _hashGqlVars2.default)(_query, variables),
        queryHash = _hashGQLVars.queryHash,
        variablesHash = _hashGQLVars.variablesHash;

    return fetch("/api/" + queryHash + "--" + variablesHash + ".json").then(function (v) {
      console.log('gql-interface', v);
      return v.json();
    });
  }
};
// Polyfill fetch


var client = new _apolloClient2.default({
  networkInterface: gqlInterface,
  initialState: window.__APOLLO_STATE__
});

(0, _reactDom.render)(_react2.default.createElement(
  _reactApollo.ApolloProvider,
  { client: client },
  _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _loadRoutes2.default
  )
), document.getElementById("content"));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9lbnRyeS1jbGllbnQuanMiXSwibmFtZXMiOlsiZ3FsSW50ZXJmYWNlIiwicXVlcnkiLCJ2YXJpYWJsZXMiLCJvcGVyYXRpb25OYW1lIiwiY29uc29sZSIsImxvZyIsInF1ZXJ5SGFzaCIsInZhcmlhYmxlc0hhc2giLCJmZXRjaCIsInRoZW4iLCJ2IiwianNvbiIsImNsaWVudCIsIm5ldHdvcmtJbnRlcmZhY2UiLCJpbml0aWFsU3RhdGUiLCJ3aW5kb3ciLCJfX0FQT0xMT19TVEFURV9fIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsZUFBZTtBQUNuQkMsT0FEbUIsdUJBQ3dCO0FBQUEsUUFBbkNBLE1BQW1DLFFBQW5DQSxLQUFtQztBQUFBLFFBQTVCQyxTQUE0QixRQUE1QkEsU0FBNEI7QUFBQSxRQUFqQkMsYUFBaUIsUUFBakJBLGFBQWlCOztBQUN6Q0MsWUFBUUMsR0FBUixDQUFZLE1BQVo7O0FBRHlDLHVCQUVKLDJCQUFZSixNQUFaLEVBQW1CQyxTQUFuQixDQUZJO0FBQUEsUUFFakNJLFNBRmlDLGdCQUVqQ0EsU0FGaUM7QUFBQSxRQUV0QkMsYUFGc0IsZ0JBRXRCQSxhQUZzQjs7QUFHekMsV0FBT0MsZ0JBQWNGLFNBQWQsVUFBNEJDLGFBQTVCLFlBQWtERSxJQUFsRCxDQUF1RCxhQUFLO0FBQ2pFTCxjQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QkssQ0FBN0I7QUFDQSxhQUFPQSxFQUFFQyxJQUFGLEVBQVA7QUFDRCxLQUhNLENBQVA7QUFJRDtBQVJrQixDQUFyQjtBQU5BOzs7QUFpQkEsSUFBTUMsU0FBUywyQkFBaUI7QUFDOUJDLG9CQUFrQmIsWUFEWTtBQUU5QmMsZ0JBQWNDLE9BQU9DO0FBRlMsQ0FBakIsQ0FBZjs7QUFLQSxzQkFDRTtBQUFBO0FBQUEsSUFBZ0IsUUFBUUosTUFBeEI7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREYsQ0FERixFQU1FSyxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBTkYiLCJmaWxlIjoiZW50cnktY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgQXBvbGxvQ2xpZW50LCB7IGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UgfSBmcm9tIFwiYXBvbGxvLWNsaWVudFwiO1xuaW1wb3J0IHsgQXBvbGxvUHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtYXBvbGxvXCI7XG4vLyBQb2x5ZmlsbCBmZXRjaFxuaW1wb3J0IFwiaXNvbW9ycGhpYy1mZXRjaFwiO1xuXG5pbXBvcnQgcm91dGVzIGZyb20gXCJAc2EtbGFicy9sZW8tY29yZS9idWlsZC9sb2FkLXJvdXRlc1wiO1xuaW1wb3J0IGhhc2hHUUxWYXJzIGZyb20gJy4vaGFzaC1ncWwtdmFycyc7XG5cbmNvbnN0IGdxbEludGVyZmFjZSA9IHtcbiAgcXVlcnkoeyBxdWVyeSwgdmFyaWFibGVzLCBvcGVyYXRpb25OYW1lIH0pIHtcbiAgICBjb25zb2xlLmxvZygnZ2ludCcpO1xuICAgIGNvbnN0IHsgcXVlcnlIYXNoLCB2YXJpYWJsZXNIYXNoIH0gPSBoYXNoR1FMVmFycyhxdWVyeSwgdmFyaWFibGVzKTtcbiAgICByZXR1cm4gZmV0Y2goYC9hcGkvJHtxdWVyeUhhc2h9LS0ke3ZhcmlhYmxlc0hhc2h9Lmpzb25gKS50aGVuKHYgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2dxbC1pbnRlcmZhY2UnLCB2KTtcbiAgICAgIHJldHVybiB2Lmpzb24oKTtcbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgY2xpZW50ID0gbmV3IEFwb2xsb0NsaWVudCh7XG4gIG5ldHdvcmtJbnRlcmZhY2U6IGdxbEludGVyZmFjZSxcbiAgaW5pdGlhbFN0YXRlOiB3aW5kb3cuX19BUE9MTE9fU1RBVEVfX1xufSk7XG5cbnJlbmRlcihcbiAgPEFwb2xsb1Byb3ZpZGVyIGNsaWVudD17Y2xpZW50fT5cbiAgICA8QnJvd3NlclJvdXRlcj5cbiAgICAgIHtyb3V0ZXN9XG4gICAgPC9Ccm93c2VyUm91dGVyPlxuICA8L0Fwb2xsb1Byb3ZpZGVyPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXG4pO1xuIl19