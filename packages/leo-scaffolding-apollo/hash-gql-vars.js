"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

exports.default = hashGQLVars;

var _md = require("md5");

var _md2 = _interopRequireDefault(_md);

var _graphql = require("graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hashGQLVars(query, variables) {
  var variablesHash = (0, _md2.default)(!variables ? "" : (0, _entries2.default)(variables).reduce(function (acc, _ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return acc + ":" + key + ":" + val;
  }, ""));
  var queryHash = (0, _md2.default)((0, _graphql.print)(query));
  return {
    queryHash: queryHash,
    variablesHash: variablesHash
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9oYXNoLWdxbC12YXJzLmpzIl0sIm5hbWVzIjpbImhhc2hHUUxWYXJzIiwicXVlcnkiLCJ2YXJpYWJsZXMiLCJ2YXJpYWJsZXNIYXNoIiwicmVkdWNlIiwiYWNjIiwia2V5IiwidmFsIiwicXVlcnlIYXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQkFHd0JBLFc7O0FBSHhCOzs7O0FBQ0E7Ozs7QUFFZSxTQUFTQSxXQUFULENBQXFCQyxLQUFyQixFQUE0QkMsU0FBNUIsRUFBdUM7QUFDcEQsTUFBTUMsZ0JBQWdCLGtCQUNwQixDQUFDRCxTQUFELEdBQ0ksRUFESixHQUVJLHVCQUFlQSxTQUFmLEVBQ0dFLE1BREgsQ0FDVSxVQUFDQyxHQUFEO0FBQUE7QUFBQSxRQUFPQyxHQUFQO0FBQUEsUUFBWUMsR0FBWjs7QUFBQSxXQUF3QkYsR0FBeEIsU0FBK0JDLEdBQS9CLFNBQXNDQyxHQUF0QztBQUFBLEdBRFYsRUFDdUQsRUFEdkQsQ0FIZ0IsQ0FBdEI7QUFNQSxNQUFNQyxZQUFZLGtCQUFJLG9CQUFNUCxLQUFOLENBQUosQ0FBbEI7QUFDQSxTQUFPO0FBQ0xPLHdCQURLO0FBRUxMO0FBRkssR0FBUDtBQUlEIiwiZmlsZSI6Imhhc2gtZ3FsLXZhcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWQ1IGZyb20gXCJtZDVcIjtcbmltcG9ydCB7IHByaW50IH0gZnJvbSBcImdyYXBocWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFzaEdRTFZhcnMocXVlcnksIHZhcmlhYmxlcykge1xuICBjb25zdCB2YXJpYWJsZXNIYXNoID0gbWQ1KFxuICAgICF2YXJpYWJsZXNcbiAgICAgID8gXCJcIlxuICAgICAgOiBPYmplY3QuZW50cmllcyh2YXJpYWJsZXMpXG4gICAgICAgICAgLnJlZHVjZSgoYWNjLCBba2V5LCB2YWxdKSA9PiBgJHthY2N9OiR7a2V5fToke3ZhbH1gLCBcIlwiKVxuICApO1xuICBjb25zdCBxdWVyeUhhc2ggPSBtZDUocHJpbnQocXVlcnkpKTtcbiAgcmV0dXJuIHtcbiAgICBxdWVyeUhhc2gsXG4gICAgdmFyaWFibGVzSGFzaCxcbiAgfVxufVxuIl19