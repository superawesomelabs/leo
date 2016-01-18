'use strict';

var _type = require('graphql/type');

var _type2 = _interopRequireDefault(_type);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('leo:plugin-blogpost:schema');

var BlogPostAttributesType = new _type.GraphQLObjectType({
  name: 'BlogPostAttributes',
  fields: {
    title: {
      type: _type.GraphQLString
    },
    date: {
      type: _type.GraphQLString
    },
    featuredImage: {
      type: _type.GraphQLString
    },
    path: {
      type: _type.GraphQLString
    }
  }
});

var BlogPostType = new _type.GraphQLObjectType({
  name: 'BlogPost',
  fields: {
    attributes: { type: BlogPostAttributesType },
    body: {
      type: _type.GraphQLString
    }
  },
  resolve: function resolve() {
    return {
      attributes: {
        title: 'A Test Post',
        path: '/a-test-post'
      },
      body: 'test resolve post'
    };
  }
});

module.exports = function (data) {

  var getPost = function getPost(slug) {
    debug('data.length', data.length);
    return (0, _find2.default)(data, function (_ref) {
      var a = _ref.attributes;

      debug('attributes', a);
      if (a) {
        return a.contentType === 'leo-blogpost' && a.slug === slug;
      } else {
        return false;
      }
    });
  };

  return {
    post: {
      type: BlogPostType,
      args: {
        slug: {
          type: _type.GraphQLString,
          description: 'The slugified version of a post title'
        }
      },
      resolve: function resolve(root, _ref2) {
        var slug = _ref2.slug;
        return getPost(slug);
      }
    }
  };
};
