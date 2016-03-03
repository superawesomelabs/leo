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
    url: {
      type: _type.GraphQLString,
      description: 'The absolute pathname of the content, ex. `/post`'
    }
  }
});

var MarkdownType = new _type.GraphQLObjectType({
  name: 'Markdown',
  fields: {
    attributes: { type: MarkdownAttributesType },
    rawBody: {
      type: _type.GraphQLString,
      description: 'Content as raw Markdown. For use with a client-side markdown renderer'
    },
    body: {
      type: _type.GraphQLString,
      description: 'Content as HTML. Can be directly inserted without client-side renderer'
    }
  }
});

module.exports = function (data) {

  /**
   * All of the parsed markdown files. Signified by `contentType`
   * being `leo-markdown`.
   */
  var allMarkdown = filter(data, function (_ref) {
    var a = _ref.attributes;
    return a.contentType === 'leo-markdown';
  });

  /**
   * Get a single markdown document by slug
   */
  var getContent = function getContent(slug) {
    return (0, _find2.default)(allMarkdown, function (_ref2) {
      var a = _ref2.attributes;
      return a ? a.slug === slug : false;
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
      resolve: function resolve(root, _ref3) {
        var slug = _ref3.slug;
        return getContent(slug);
      }
    }
  };
};
