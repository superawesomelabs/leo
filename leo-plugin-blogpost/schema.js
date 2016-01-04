'use strict';

var _type = require('graphql/type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      body: 'test post'
    };
  }
});

module.exports = function (data) {

  var getPost = function getPost(slug) {
    return {
      attributes: {
        title: 'A Test Post',
        path: '/a-test-post/'
      },
      body: 'test post'
    };
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
      resolve: function resolve(root, _ref) {
        var slug = _ref.slug;
        return getPost(slug);
      }
    }
  };
};
