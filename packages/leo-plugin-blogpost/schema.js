'use strict';

var _type = require('graphql/type');

var _type2 = _interopRequireDefault(_type);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _take = require('lodash/take');

var _take2 = _interopRequireDefault(_take);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('leo:plugin-blogpost:schema');

var BlogPostAttributesType = new _type.GraphQLObjectType({
  name: 'BlogPostAttributes',
  fields: {
    title: {
      type: _type.GraphQLString,
      description: 'Display title for the BlogPost'
    },
    slug: {
      type: _type.GraphQLString,
      description: 'url-safe string for use in URLs. Can be derived from Title, Filename or specified in Frontmatter'
    },
    date: {
      type: _type.GraphQLString,
      description: 'The most recent time that this BlogPost was updated, in moment-parseable format'
    },
    featuredImage: {
      type: _type.GraphQLString,
      description: 'Featured image for display in Heros and Previews'
    },
    url: {
      type: _type.GraphQLString,
      description: 'The absolute pathname of the BlogPost, ex. `/post`'
    },
    excerpt: {
      type: _type.GraphQLString,
      description: 'A short excerpt of the `body` content'
    },
    timeToRead: {
      type: _type.GraphQLInt,
      description: 'The time it takes the average person to read this post in minutes'
    }
  }
});

var BlogPostType = new _type.GraphQLObjectType({
  name: 'BlogPost',
  description: 'A Blog Post written in Markdown with Frontmatter.',
  fields: {
    attributes: {
      type: BlogPostAttributesType,
      description: 'Metadata about the blog post'
    },
    rawBody: {
      type: _type.GraphQLString,
      description: 'The raw Markdown, excluding any frontmatter'
    },
    body: {
      type: _type.GraphQLString,
      description: 'The Markdown rendered as HTML'
    }
  }
});

module.exports = function (data) {

  var getPost = function getPost(slug) {
    var post = (0, _find2.default)(data, function (_ref) {
      var a = _ref.attributes;

      if (a) {
        return a.contentType === 'leo-blogpost' && a.slug === slug;
      } else {
        return false;
      }
    });
    if (!post) {
      console.log('leo-plugin-blogpost could not find', slug);
    }
    return post;
  };

  var getAllPosts = function getAllPosts(_ref2) {
    var _ref2$limit = _ref2.limit;
    var limit = _ref2$limit === undefined ? 5 : _ref2$limit;

    // return up to `limit` blogposts
    return (0, _take2.default)((0, _filter2.default)(data, function (_ref3) {
      var a = _ref3.attributes;

      return a.contentType === 'leo-blogpost';
    }).sort(function (postA, postB) {
      // sort newest first
      return !_moment2.default.utc(postA.date).isAfter(postB.date);
    }), limit);
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
      resolve: function resolve(root, _ref4) {
        var slug = _ref4.slug;
        return getPost(slug);
      }
    },
    allPosts: {
      type: new _type.GraphQLList(BlogPostType),
      args: {
        limit: {
          type: _type.GraphQLInt,
          description: 'Restrict the number of results'
        }
      },
      resolve: function resolve(_, args) {
        return getAllPosts(args);
      }
    }
  };
};
