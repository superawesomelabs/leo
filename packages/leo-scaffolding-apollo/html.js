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
          _react2.default.createElement("link", { rel: "stylesheet", type: "text/css", href: "/" + bundleAssets.static.css })
        ),
        _react2.default.createElement(
          "body",
          null,
          _react2.default.createElement("div", { id: "content", dangerouslySetInnerHTML: { __html: body } }),
          _react2.default.createElement("script", {
            dangerouslySetInnerHTML: { __html: "window.__APOLLO_STATE__=" + (0, _stringify2.default)({ apollo: { data: data } }) + ";" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9odG1sLmpzIl0sIm5hbWVzIjpbIkh0bWwiLCJwcm9wcyIsImJ1bmRsZUFzc2V0cyIsImRhdGEiLCJib2R5Iiwic3RhdGljIiwiY3NzIiwiX19odG1sIiwiYXBvbGxvIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs2QkFLVjtBQUFBLG1CQUtILEtBQUtDLEtBTEY7QUFBQSxVQUVMQyxZQUZLLFVBRUxBLFlBRks7QUFBQSxVQUdMQyxJQUhLLFVBR0xBLElBSEs7QUFBQSxVQUlMQyxJQUpLLFVBSUxBLElBSks7OztBQU9QLGFBQU87QUFBQTtBQUFBLFVBQU0sTUFBSyxJQUFYO0FBQ0w7QUFBQTtBQUFBO0FBQ0Usa0RBQU0sU0FBUSxPQUFkLEdBREY7QUFFRSxrREFBTSxNQUFLLFVBQVgsRUFBc0IsU0FBUSxxQ0FBOUIsR0FGRjtBQUdFLGtEQUFNLEtBQUksWUFBVixFQUF1QixNQUFLLFVBQTVCLEVBQXVDLFlBQVVGLGFBQWFHLE1BQWIsQ0FBb0JDLEdBQXJFO0FBSEYsU0FESztBQU1MO0FBQUE7QUFBQTtBQUNFLGlEQUFLLElBQUcsU0FBUixFQUFrQix5QkFBeUIsRUFBRUMsUUFBUUgsSUFBVixFQUEzQyxHQURGO0FBRUU7QUFDRSxxQ0FBeUIsRUFBRUcscUNBQW1DLHlCQUFlLEVBQUVDLFFBQVEsRUFBRUwsVUFBRixFQUFWLEVBQWYsQ0FBbkMsTUFBRixFQUQzQjtBQUVFLHFCQUFRO0FBRlYsWUFGRjtBQU1FLG9EQUFRLEtBQUksZUFBWixFQUE0QixTQUFRLE9BQXBDO0FBTkY7QUFOSyxPQUFQO0FBZUQ7Ozs7O0FBM0JrQkgsSSxDQUNaUyxTLEdBQVk7QUFDakJMLFFBQU0saUJBQVVNLE1BQVYsQ0FBaUJDLFVBRE47QUFFakJSLFFBQU0saUJBQVVTLE1BQVYsQ0FBaUJEO0FBRk4sQztrQkFEQVgsSSIsImZpbGUiOiJodG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdG1sIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBib2R5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGF0YTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICB9O1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgYnVuZGxlQXNzZXRzLFxuICAgICAgZGF0YSxcbiAgICAgIGJvZHksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPGh0bWwgbGFuZz1cImVuXCI+XG4gICAgICA8aGVhZD5cbiAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9e2AvJHtidW5kbGVBc3NldHMuc3RhdGljLmNzc31gfS8+XG4gICAgICA8L2hlYWQ+XG4gICAgICA8Ym9keT5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnRcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGJvZHkgfX0gLz5cbiAgICAgICAgPHNjcmlwdFxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYHdpbmRvdy5fX0FQT0xMT19TVEFURV9fPSR7SlNPTi5zdHJpbmdpZnkoeyBhcG9sbG86IHsgZGF0YSB9fSl9O2AgfX1cbiAgICAgICAgICBjaGFyU2V0PVwiVVRGLThcIlxuICAgICAgICAvPlxuICAgICAgICA8c2NyaXB0IHNyYz0nL2pzL2NsaWVudC5qcycgY2hhclNldD1cIlVURi04XCIgLz5cbiAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gIH1cbn1cbiJdfQ==