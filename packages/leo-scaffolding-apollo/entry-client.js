'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _reactApollo = require('react-apollo');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _graphql = require('graphql');

require('isomorphic-fetch');

var _loadRoutes = require('@sa-labs/leo-core/build/load-routes');

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Polyfill fetch
var gqlInterface = {
  query: function query(_ref) {
    var _query = _ref.query,
        variables = _ref.variables,
        operationName = _ref.operationName;


    var variablesHash = (0, _md2.default)((0, _entries2.default)(variables).reduce(function (acc, _ref2) {
      var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
          key = _ref3[0],
          val = _ref3[1];

      return acc + ':' + key + ':' + val;
    }, ''));
    var queryHash = (0, _md2.default)((0, _graphql.print)(_query));
    return fetch('/api/' + queryHash + '--' + variablesHash + '.json').then(function (v) {
      return v.json();
    });
  }
};

var client = new _apolloClient2.default({
  networkInterface: gqlInterface,
  initialState: window.__APOLLO_STATE__
});

(0, _reactDom.render)(_react2.default.createElement(
  _reactApollo.ApolloProvider,
  { client: client },
  _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.browserHistory },
    _loadRoutes2.default
  )
), document.getElementById('content'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9lbnRyeS1jbGllbnQuanMiXSwibmFtZXMiOlsiZ3FsSW50ZXJmYWNlIiwicXVlcnkiLCJ2YXJpYWJsZXMiLCJvcGVyYXRpb25OYW1lIiwidmFyaWFibGVzSGFzaCIsInJlZHVjZSIsImFjYyIsImtleSIsInZhbCIsInF1ZXJ5SGFzaCIsImZldGNoIiwidGhlbiIsInYiLCJqc29uIiwiY2xpZW50IiwibmV0d29ya0ludGVyZmFjZSIsImluaXRpYWxTdGF0ZSIsIndpbmRvdyIsIl9fQVBPTExPX1NUQVRFX18iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7OztBQUhBO0FBS0EsSUFBTUEsZUFBZTtBQUNuQkMsT0FEbUIsdUJBS2hCO0FBQUEsUUFIREEsTUFHQyxRQUhEQSxLQUdDO0FBQUEsUUFGREMsU0FFQyxRQUZEQSxTQUVDO0FBQUEsUUFEREMsYUFDQyxRQUREQSxhQUNDOzs7QUFFRCxRQUFNQyxnQkFBZ0Isa0JBQUksdUJBQWVGLFNBQWYsRUFDT0csTUFEUCxDQUNjLFVBQUNDLEdBQUQ7QUFBQTtBQUFBLFVBQU9DLEdBQVA7QUFBQSxVQUFZQyxHQUFaOztBQUFBLGFBQXdCRixHQUF4QixTQUErQkMsR0FBL0IsU0FBc0NDLEdBQXRDO0FBQUEsS0FEZCxFQUMyRCxFQUQzRCxDQUFKLENBQXRCO0FBRUEsUUFBTUMsWUFBWSxrQkFBSSxvQkFBTVIsTUFBTixDQUFKLENBQWxCO0FBQ0EsV0FBT1MsZ0JBQWNELFNBQWQsVUFBNEJMLGFBQTVCLFlBQWtETyxJQUFsRCxDQUF1RCxhQUFLO0FBQ2pFLGFBQU9DLEVBQUVDLElBQUYsRUFBUDtBQUNELEtBRk0sQ0FBUDtBQUdEO0FBYmtCLENBQXJCOztBQWdCQSxJQUFNQyxTQUFTLDJCQUFpQjtBQUM5QkMsb0JBQWtCZixZQURZO0FBRTlCZ0IsZ0JBQWNDLE9BQU9DO0FBRlMsQ0FBakIsQ0FBZjs7QUFLQSxzQkFDRTtBQUFBO0FBQUEsSUFBZ0IsUUFBUUosTUFBeEI7QUFDRTtBQUFBO0FBQUEsTUFBUSxvQ0FBUjtBQUFBO0FBQUE7QUFERixDQURGLEVBTUdLLFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FOSCIsImZpbGUiOiJlbnRyeS1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IFJvdXRlciwgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEFwb2xsb0NsaWVudCwgeyBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlIH0gZnJvbSAnYXBvbGxvLWNsaWVudCc7XG5pbXBvcnQgeyBBcG9sbG9Qcm92aWRlciB9IGZyb20gJ3JlYWN0LWFwb2xsbyc7XG5pbXBvcnQgbWQ1IGZyb20gJ21kNSc7XG5pbXBvcnQgeyBwcmludCB9IGZyb20gJ2dyYXBocWwnO1xuLy8gUG9seWZpbGwgZmV0Y2hcbmltcG9ydCAnaXNvbW9ycGhpYy1mZXRjaCc7XG5cbmltcG9ydCByb3V0ZXMgZnJvbSAnQHNhLWxhYnMvbGVvLWNvcmUvYnVpbGQvbG9hZC1yb3V0ZXMnO1xuXG5jb25zdCBncWxJbnRlcmZhY2UgPSB7XG4gIHF1ZXJ5KHtcbiAgICBxdWVyeSxcbiAgICB2YXJpYWJsZXMsXG4gICAgb3BlcmF0aW9uTmFtZSxcbiAgfSkge1xuXG4gICAgY29uc3QgdmFyaWFibGVzSGFzaCA9IG1kNShPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIFtrZXksIHZhbF0pID0+IGAke2FjY306JHtrZXl9OiR7dmFsfWAsICcnKSk7XG4gICAgY29uc3QgcXVlcnlIYXNoID0gbWQ1KHByaW50KHF1ZXJ5KSk7XG4gICAgcmV0dXJuIGZldGNoKGAvYXBpLyR7cXVlcnlIYXNofS0tJHt2YXJpYWJsZXNIYXNofS5qc29uYCkudGhlbih2ID0+IHtcbiAgICAgIHJldHVybiB2Lmpzb24oKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBjbGllbnQgPSBuZXcgQXBvbGxvQ2xpZW50KHtcbiAgbmV0d29ya0ludGVyZmFjZTogZ3FsSW50ZXJmYWNlLFxuICBpbml0aWFsU3RhdGU6IHdpbmRvdy5fX0FQT0xMT19TVEFURV9fLFxufSk7XG5cbnJlbmRlcigoXG4gIDxBcG9sbG9Qcm92aWRlciBjbGllbnQ9e2NsaWVudH0+XG4gICAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0+XG4gICAgICB7cm91dGVzfVxuICAgIDwvUm91dGVyPlxuICA8L0Fwb2xsb1Byb3ZpZGVyPlxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSk7XG4iXX0=