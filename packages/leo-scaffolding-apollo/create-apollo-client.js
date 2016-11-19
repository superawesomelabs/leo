'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return new _apolloClient2.default((0, _assign2.default)({}, {
    queryTransformer: _apolloClient.addTypename,
    dataIdFromObject: function dataIdFromObject(result) {
      if (result.id && result.__typename) {
        // eslint-disable-line no-underscore-dangle
        return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
      }
      return null;
    }
  }, options));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jcmVhdGUtYXBvbGxvLWNsaWVudC5qcyJdLCJuYW1lcyI6WyJxdWVyeVRyYW5zZm9ybWVyIiwiZGF0YUlkRnJvbU9iamVjdCIsInJlc3VsdCIsImlkIiwiX190eXBlbmFtZSIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O2tCQUVlO0FBQUEsU0FBVywyQkFBaUIsc0JBQWMsRUFBZCxFQUFrQjtBQUMzREEsK0NBRDJEO0FBRTNEQyxzQkFBa0IsMEJBQUNDLE1BQUQsRUFBWTtBQUM1QixVQUFJQSxPQUFPQyxFQUFQLElBQWFELE9BQU9FLFVBQXhCLEVBQW9DO0FBQUU7QUFDcEMsZUFBT0YsT0FBT0UsVUFBUCxHQUFvQkYsT0FBT0MsRUFBbEMsQ0FEa0MsQ0FDSTtBQUN2QztBQUNELGFBQU8sSUFBUDtBQUNEO0FBUDBELEdBQWxCLEVBU3hDRSxPQVR3QyxDQUFqQixDQUFYO0FBQUEsQyIsImZpbGUiOiJjcmVhdGUtYXBvbGxvLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcG9sbG9DbGllbnQsIHsgYWRkVHlwZW5hbWUgfSBmcm9tICdhcG9sbG8tY2xpZW50JztcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9ucyA9PiBuZXcgQXBvbGxvQ2xpZW50KE9iamVjdC5hc3NpZ24oe30sIHtcbiAgcXVlcnlUcmFuc2Zvcm1lcjogYWRkVHlwZW5hbWUsXG4gIGRhdGFJZEZyb21PYmplY3Q6IChyZXN1bHQpID0+IHtcbiAgICBpZiAocmVzdWx0LmlkICYmIHJlc3VsdC5fX3R5cGVuYW1lKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGVcbiAgICAgIHJldHVybiByZXN1bHQuX190eXBlbmFtZSArIHJlc3VsdC5pZDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgLy8gc2hvdWxkQmF0Y2g6IHRydWUsXG59LCBvcHRpb25zKSk7XG4iXX0=