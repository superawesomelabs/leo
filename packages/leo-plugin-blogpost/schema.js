'use strict';

var _type = require('graphql/type');

var _type2 = _interopRequireDefault(_type);

var _graphqlRelay = require('graphql-relay');

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

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

// Helper to create a Connection for Relay (paging, etc)

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
  nodeType: BlogPostType
});

var BlogPostConnection = _connectionDefinition.connectionType;


module.exports = function (data) {
  // The set of posts we should return via the API
  var allPosts = data.filter(function (post) {
    return post.attributes.contentType === 'leo-blogpost';
  })
  // sort by publish date
  .sort(function (postA, postB) {
    var a = _moment2.default.utc(postA.attributes.date, 'MMM Do, YYYY');
    var b = _moment2.default.utc(postB.attributes.date, 'MMM Do, YYYY');
    return b.diff(a);
  });

  console.log(allPosts.map(function (p) {
    return p.attributes.date;
  }));
  // Get a single post by slug
  var getPost = function getPost(slug) {
    var post = (0, _find2.default)(allPosts, function (_ref) {
      var a = _ref.attributes;
      return a ? a.slug === slug : false;
    });
    if (!post) {
      console.log('leo-plugin-blogpost could not find', slug, 'It may be useful to define `slug` in the frontmatter for this post');
    }
    return post;
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
    },
    posts: {
      type: BlogPostConnection,
      args: _graphqlRelay.connectionArgs,
      resolve: function resolve(_, args) {
        return (0, _graphqlRelay.connectionFromArray)(allPosts, args);
      }
    }
  };
};
