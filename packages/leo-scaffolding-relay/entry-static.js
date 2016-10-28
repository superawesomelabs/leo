'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _isomorphicRelayRouter = require('isomorphic-relay-router');

var _isomorphicRelayRouter2 = _interopRequireDefault(_isomorphicRelayRouter);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _history = require('history');

var _reactRouter = require('react-router');

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _relayLocalSchema = require('relay-local-schema');

var _relayLocalSchema2 = _interopRequireDefault(_relayLocalSchema);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _insertedFiles = require('@sa-labs/leo-core/build/inserted-files');

var _loadRoutes = require('@sa-labs/leo-core/build/load-routes');

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

var _loadHtml = require('@sa-labs/leo-core/build/load-html');

var _loadHtml2 = _interopRequireDefault(_loadHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('leo:entry-static-watch');

//require('leo-gql-database-loader!');

// TODO, move Routes into scaffolding-relay


var networkLayer = new _relayLocalSchema2.default.NetworkLayer({
  schema: _insertedFiles.schema,
  onError: function onError(errors, request) {
    return console.error(errors, request);
  }
});

// Exported static site renderer:

exports.default = function (locals, callback) {
  console.log('rendering html for ' + locals.path);

  var history = (0, _history.createMemoryHistory)();
  var location = history.createLocation(locals.path);

  (0, _reactRouter.match)({ routes: _loadRoutes2.default, location: location }, function (error, redirectLocation, renderProps) {
    if (error) {
      console.log('had error', error);
      callback(error);
    } else {

      _isomorphicRelayRouter2.default.prepareData(renderProps, networkLayer).then(function (_ref) {
        var data = _ref.data,
            props = _ref.props;

        console.log('renderingJSON at ' + locals.jsonOutputFileName);
        _globalJSONAsset({
          name: locals.jsonOutputFileName,
          json: data
        });
        try {
          var body = (0, _server.renderToString)(_isomorphicRelayRouter2.default.render(props));
          /**
           * https://github.com/nfl/react-helmet/tree/16b3d67492f047aea635cddfaeadcf2686a00883#server-usage
           * See above URL for reasoning behind `rewind()`
           */
          var head = _reactHelmet2.default.rewind();

          var htmlAsString = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_loadHtml2.default, { body: body,
            helmet: head,
            assets: locals.assets,
            bundleAssets: locals.assetsPluginHash,
            props: props,
            data: data
          }));
          callback(null, htmlAsString);
        } catch (e) {
          console.log(e);
        }
      }, function (things) {
        console.log('things', things);
      }).catch(function (err) {
        console.log('caught', err);
      });
    }
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9lbnRyeS1zdGF0aWMuanMiXSwibmFtZXMiOlsiZGVidWciLCJyZXF1aXJlIiwibmV0d29ya0xheWVyIiwiTmV0d29ya0xheWVyIiwic2NoZW1hIiwib25FcnJvciIsImVycm9ycyIsInJlcXVlc3QiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2NhbHMiLCJjYWxsYmFjayIsImxvZyIsInBhdGgiLCJoaXN0b3J5IiwibG9jYXRpb24iLCJjcmVhdGVMb2NhdGlvbiIsInJvdXRlcyIsInJlZGlyZWN0TG9jYXRpb24iLCJyZW5kZXJQcm9wcyIsInByZXBhcmVEYXRhIiwidGhlbiIsImRhdGEiLCJwcm9wcyIsImpzb25PdXRwdXRGaWxlTmFtZSIsIl9nbG9iYWxKU09OQXNzZXQiLCJuYW1lIiwianNvbiIsImJvZHkiLCJyZW5kZXIiLCJoZWFkIiwicmV3aW5kIiwiaHRtbEFzU3RyaW5nIiwiYXNzZXRzIiwiYXNzZXRzUGx1Z2luSGFzaCIsImUiLCJ0aGluZ3MiLCJjYXRjaCIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTs7QUFLQTs7OztBQUNBOzs7Ozs7QUFUQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsRUFBaUIsd0JBQWpCLENBQWQ7O0FBRUE7O0FBS0E7OztBQUlBLElBQU1DLGVBQWUsSUFBSSwyQkFBaUJDLFlBQXJCLENBQWtDO0FBQ3JEQywrQkFEcUQ7QUFFckRDLFdBQVMsaUJBQUNDLE1BQUQsRUFBU0MsT0FBVDtBQUFBLFdBQXFCQyxRQUFRQyxLQUFSLENBQWNILE1BQWQsRUFBc0JDLE9BQXRCLENBQXJCO0FBQUE7QUFGNEMsQ0FBbEMsQ0FBckI7O0FBS0E7O2tCQUNlLFVBQUNHLE1BQUQsRUFBU0MsUUFBVCxFQUFzQjtBQUNuQ0gsVUFBUUksR0FBUix5QkFBa0NGLE9BQU9HLElBQXpDOztBQUVBLE1BQU1DLFVBQVUsbUNBQWhCO0FBQ0EsTUFBTUMsV0FBV0QsUUFBUUUsY0FBUixDQUF1Qk4sT0FBT0csSUFBOUIsQ0FBakI7O0FBRUEsMEJBQU0sRUFBRUksNEJBQUYsRUFBVUYsa0JBQVYsRUFBTixFQUE0QixVQUFDTixLQUFELEVBQVFTLGdCQUFSLEVBQTBCQyxXQUExQixFQUEwQztBQUNwRSxRQUFHVixLQUFILEVBQVU7QUFDUkQsY0FBUUksR0FBUixDQUFZLFdBQVosRUFBeUJILEtBQXpCO0FBQ0VFLGVBQVNGLEtBQVQ7QUFDSCxLQUhELE1BR087O0FBRUwsc0NBQWlCVyxXQUFqQixDQUE2QkQsV0FBN0IsRUFBMENqQixZQUExQyxFQUF3RG1CLElBQXhELENBQTZELGdCQUFxQjtBQUFBLFlBQWxCQyxJQUFrQixRQUFsQkEsSUFBa0I7QUFBQSxZQUFaQyxLQUFZLFFBQVpBLEtBQVk7O0FBQ2hGZixnQkFBUUksR0FBUix1QkFBZ0NGLE9BQU9jLGtCQUF2QztBQUNBQyx5QkFBaUI7QUFDZkMsZ0JBQU1oQixPQUFPYyxrQkFERTtBQUVmRyxnQkFBTUw7QUFGUyxTQUFqQjtBQUlBLFlBQUk7QUFDRixjQUFNTSxPQUFPLDRCQUFlLGdDQUFpQkMsTUFBakIsQ0FBd0JOLEtBQXhCLENBQWYsQ0FBYjtBQUNBOzs7O0FBSUEsY0FBTU8sT0FBTyxzQkFBT0MsTUFBUCxFQUFiOztBQUVBLGNBQU1DLGVBQWUsa0NBQ25CLG9EQUFNLE1BQU1KLElBQVo7QUFDTSxvQkFBUUUsSUFEZDtBQUVNLG9CQUFRcEIsT0FBT3VCLE1BRnJCO0FBR00sMEJBQWN2QixPQUFPd0IsZ0JBSDNCO0FBSU0sbUJBQU9YLEtBSmI7QUFLTSxrQkFBTUQ7QUFMWixZQURtQixDQUFyQjtBQVNFWCxtQkFBUyxJQUFULEVBQWVxQixZQUFmO0FBQ0gsU0FsQkQsQ0FrQkUsT0FBT0csQ0FBUCxFQUFVO0FBQ1YzQixrQkFBUUksR0FBUixDQUFZdUIsQ0FBWjtBQUNEO0FBQ0YsT0EzQkQsRUEyQkcsVUFBQ0MsTUFBRCxFQUFZO0FBQ2I1QixnQkFBUUksR0FBUixDQUFZLFFBQVosRUFBc0J3QixNQUF0QjtBQUNELE9BN0JELEVBNkJHQyxLQTdCSCxDQTZCUyxVQUFDQyxHQUFELEVBQVM7QUFDaEI5QixnQkFBUUksR0FBUixDQUFZLFFBQVosRUFBc0IwQixHQUF0QjtBQUNELE9BL0JEO0FBZ0NEO0FBQ0YsR0F2Q0Q7QUF3Q0QsQyIsImZpbGUiOiJlbnRyeS1zdGF0aWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBJc29tb3JwaGljUm91dGVyIGZyb20gJ2lzb21vcnBoaWMtcmVsYXktcm91dGVyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTVNlcnZlciwge1xuICByZW5kZXJUb1N0cmluZywgcmVuZGVyVG9TdGF0aWNNYXJrdXBcbn0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XG5pbXBvcnQgeyBtYXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgUmVsYXkgZnJvbSAncmVhY3QtcmVsYXknO1xuaW1wb3J0IFJlbGF5TG9jYWxTY2hlbWEgZnJvbSAncmVsYXktbG9jYWwtc2NoZW1hJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnbGVvOmVudHJ5LXN0YXRpYy13YXRjaCcpO1xuXG4vL3JlcXVpcmUoJ2xlby1ncWwtZGF0YWJhc2UtbG9hZGVyIScpO1xuaW1wb3J0IHtcbiAgY29uZixcbiAgc2NoZW1hXG59IGZyb20gJ0BzYS1sYWJzL2xlby1jb3JlL2J1aWxkL2luc2VydGVkLWZpbGVzJztcbi8vIFRPRE8sIG1vdmUgUm91dGVzIGludG8gc2NhZmZvbGRpbmctcmVsYXlcbmltcG9ydCByb3V0ZXMgZnJvbSAnQHNhLWxhYnMvbGVvLWNvcmUvYnVpbGQvbG9hZC1yb3V0ZXMnO1xuaW1wb3J0IEhUTUwgZnJvbSAnQHNhLWxhYnMvbGVvLWNvcmUvYnVpbGQvbG9hZC1odG1sJztcblxuY29uc3QgbmV0d29ya0xheWVyID0gbmV3IFJlbGF5TG9jYWxTY2hlbWEuTmV0d29ya0xheWVyKHtcbiAgc2NoZW1hLFxuICBvbkVycm9yOiAoZXJyb3JzLCByZXF1ZXN0KSA9PiBjb25zb2xlLmVycm9yKGVycm9ycywgcmVxdWVzdClcbn0pO1xuXG4vLyBFeHBvcnRlZCBzdGF0aWMgc2l0ZSByZW5kZXJlcjpcbmV4cG9ydCBkZWZhdWx0IChsb2NhbHMsIGNhbGxiYWNrKSA9PiB7XG4gIGNvbnNvbGUubG9nKGByZW5kZXJpbmcgaHRtbCBmb3IgJHtsb2NhbHMucGF0aH1gKTtcblxuICBjb25zdCBoaXN0b3J5ID0gY3JlYXRlTWVtb3J5SGlzdG9yeSgpO1xuICBjb25zdCBsb2NhdGlvbiA9IGhpc3RvcnkuY3JlYXRlTG9jYXRpb24obG9jYWxzLnBhdGgpO1xuXG4gIG1hdGNoKHsgcm91dGVzLCBsb2NhdGlvbiB9LCAoZXJyb3IsIHJlZGlyZWN0TG9jYXRpb24sIHJlbmRlclByb3BzKSA9PiB7XG4gICAgaWYoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdoYWQgZXJyb3InLCBlcnJvcilcbiAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIElzb21vcnBoaWNSb3V0ZXIucHJlcGFyZURhdGEocmVuZGVyUHJvcHMsIG5ldHdvcmtMYXllcikudGhlbigoeyBkYXRhLCBwcm9wcyB9KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGByZW5kZXJpbmdKU09OIGF0ICR7bG9jYWxzLmpzb25PdXRwdXRGaWxlTmFtZX1gKTtcbiAgICAgICAgX2dsb2JhbEpTT05Bc3NldCh7XG4gICAgICAgICAgbmFtZTogbG9jYWxzLmpzb25PdXRwdXRGaWxlTmFtZSxcbiAgICAgICAgICBqc29uOiBkYXRhXG4gICAgICAgIH0pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgYm9keSA9IHJlbmRlclRvU3RyaW5nKElzb21vcnBoaWNSb3V0ZXIucmVuZGVyKHByb3BzKSk7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL25mbC9yZWFjdC1oZWxtZXQvdHJlZS8xNmIzZDY3NDkyZjA0N2FlYTYzNWNkZGZhZWFkY2YyNjg2YTAwODgzI3NlcnZlci11c2FnZVxuICAgICAgICAgICAqIFNlZSBhYm92ZSBVUkwgZm9yIHJlYXNvbmluZyBiZWhpbmQgYHJld2luZCgpYFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGhlYWQgPSBIZWxtZXQucmV3aW5kKCk7XG5cbiAgICAgICAgICBjb25zdCBodG1sQXNTdHJpbmcgPSByZW5kZXJUb1N0YXRpY01hcmt1cChcbiAgICAgICAgICAgIDxIVE1MIGJvZHk9e2JvZHl9XG4gICAgICAgICAgICAgICAgICBoZWxtZXQ9e2hlYWR9XG4gICAgICAgICAgICAgICAgICBhc3NldHM9e2xvY2Fscy5hc3NldHN9XG4gICAgICAgICAgICAgICAgICBidW5kbGVBc3NldHM9e2xvY2Fscy5hc3NldHNQbHVnaW5IYXNofVxuICAgICAgICAgICAgICAgICAgcHJvcHM9e3Byb3BzfVxuICAgICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKVxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgaHRtbEFzU3RyaW5nKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIH1cbiAgICAgIH0sICh0aGluZ3MpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaW5ncycsIHRoaW5ncylcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NhdWdodCcsIGVycilcbiAgICAgIH0pXG4gICAgfVxuICB9KTtcbn07XG4iXX0=