'use strict';

var _type = require('graphql/type');

var _type2 = _interopRequireDefault(_type);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('leo:plugin-markdown:schema');

var MarkdownAttributesType = new _type.GraphQLObjectType({
  name: 'MarkdownAttributes',
  fields: {
    title: {
      type: _type.GraphQLString
    },
    date: {
      type: _type.GraphQLString
    },
    path: {
      type: _type.GraphQLString
    }
  }
});

var MarkdownType = new _type.GraphQLObjectType({
  name: 'Markdown',
  fields: {
    attributes: { type: MarkdownAttributesType },
    rawBody: {
      type: _type.GraphQLString
    },
    body: {
      type: _type.GraphQLString
    }
  }
});

module.exports = function (data) {

  var getContent = function getContent(slug) {

    return (0, _find2.default)(data, function (_ref) {
      var a = _ref.attributes;

      if (a) {
        return a.contentType === 'leo-markdown' && a.slug === slug;
      } else {
        return false;
      }
    });
  };

  return {
    md: {
      type: MarkdownType,
      args: {
        slug: {
          type: _type.GraphQLString,
          description: 'The slugified version of a post title'
        }
      },
      resolve: function resolve(root, _ref2) {
        var slug = _ref2.slug;
        return getContent(slug);
      }
    }
  };
};
