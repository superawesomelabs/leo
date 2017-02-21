"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Html = function (_Component) {
  (0, _inherits3.default)(Html, _Component);

  function Html() {
    (0, _classCallCheck3.default)(this, Html);
    return (0, _possibleConstructorReturn3.default)(this, (Html.__proto__ || (0, _getPrototypeOf2.default)(Html)).apply(this, arguments));
  }

  (0, _createClass3.default)(Html, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          bundleAssets = _props.bundleAssets,
          data = _props.data,
          body = _props.body;


      return _react2.default.createElement(
        "html",
        { lang: "en" },
        _react2.default.createElement(
          "head",
          null,
          _react2.default.createElement("meta", { charSet: "utf-8" }),
          _react2.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
          _react2.default.createElement("link", {
            rel: "stylesheet",
            type: "text/css",
            href: "/" + bundleAssets.static.css
          })
        ),
        _react2.default.createElement(
          "body",
          null,
          _react2.default.createElement("div", { id: "content", dangerouslySetInnerHTML: { __html: body } }),
          _react2.default.createElement("script", {
            dangerouslySetInnerHTML: {
              __html: "window.__APOLLO_STATE__=" + (0, _stringify2.default)(data) + ";"
            },
            charSet: "UTF-8"
          }),
          _react2.default.createElement("script", { src: "/js/client.js", charSet: "UTF-8" })
        )
      );
    }
  }]);
  return Html;
}(_react.Component);

Html.propTypes = {
  body: _react.PropTypes.string.isRequired,
  data: _react.PropTypes.object.isRequired
};
exports.default = Html;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9odG1sLmpzIl0sIm5hbWVzIjpbIkh0bWwiLCJwcm9wcyIsImJ1bmRsZUFzc2V0cyIsImRhdGEiLCJib2R5Iiwic3RhdGljIiwiY3NzIiwiX19odG1sIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs2QkFLVjtBQUFBLG1CQUM4QixLQUFLQyxLQURuQztBQUFBLFVBQ0NDLFlBREQsVUFDQ0EsWUFERDtBQUFBLFVBQ2VDLElBRGYsVUFDZUEsSUFEZjtBQUFBLFVBQ3FCQyxJQURyQixVQUNxQkEsSUFEckI7OztBQUdQLGFBQ0U7QUFBQTtBQUFBLFVBQU0sTUFBSyxJQUFYO0FBQ0U7QUFBQTtBQUFBO0FBQ0Usa0RBQU0sU0FBUSxPQUFkLEdBREY7QUFFRSxrREFBTSxNQUFLLFVBQVgsRUFBc0IsU0FBUSxxQ0FBOUIsR0FGRjtBQUdFO0FBQ0UsaUJBQUksWUFETjtBQUVFLGtCQUFLLFVBRlA7QUFHRSx3QkFBVUYsYUFBYUcsTUFBYixDQUFvQkM7QUFIaEM7QUFIRixTQURGO0FBVUU7QUFBQTtBQUFBO0FBQ0UsaURBQUssSUFBRyxTQUFSLEVBQWtCLHlCQUF5QixFQUFFQyxRQUFRSCxJQUFWLEVBQTNDLEdBREY7QUFFRTtBQUNFLHFDQUNFO0FBQ0VHLG1EQUFtQyx5QkFBZUosSUFBZixDQUFuQztBQURGLGFBRko7QUFNRSxxQkFBUTtBQU5WLFlBRkY7QUFVRSxvREFBUSxLQUFJLGVBQVosRUFBNEIsU0FBUSxPQUFwQztBQVZGO0FBVkYsT0FERjtBQXlCRDs7Ozs7QUFqQ2tCSCxJLENBQ1pRLFMsR0FBWTtBQUNqQkosUUFBTSxpQkFBVUssTUFBVixDQUFpQkMsVUFETjtBQUVqQlAsUUFBTSxpQkFBVVEsTUFBVixDQUFpQkQ7QUFGTixDO2tCQURBVixJIiwiZmlsZSI6Imh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHRtbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYm9keTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBidW5kbGVBc3NldHMsIGRhdGEsIGJvZHkgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGh0bWwgbGFuZz1cImVuXCI+XG4gICAgICAgIDxoZWFkPlxuICAgICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cbiAgICAgICAgICA8bGlua1xuICAgICAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dC9jc3NcIlxuICAgICAgICAgICAgaHJlZj17YC8ke2J1bmRsZUFzc2V0cy5zdGF0aWMuY3NzfWB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgICA8ZGl2IGlkPVwiY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYm9keSB9fSAvPlxuICAgICAgICAgIDxzY3JpcHRcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9faHRtbDogYHdpbmRvdy5fX0FQT0xMT19TVEFURV9fPSR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9O2BcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hhclNldD1cIlVURi04XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL2pzL2NsaWVudC5qc1wiIGNoYXJTZXQ9XCJVVEYtOFwiIC8+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvaHRtbD5cbiAgICApO1xuICB9XG59XG4iXX0=