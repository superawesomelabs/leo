import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

import {
  connectionDefinitions,
  connectionFromArray,
  connectionArgs
} from 'graphql-relay';

import find from 'lodash/find';
import filter from 'lodash/filter';
import oDebug from 'debug';
import moment from 'moment';
const debug = oDebug('leo:plugin-blogpost:schema');

const BlogPostAttributesType = new GraphQLObjectType({
  name: 'BlogPostAttributes',
  fields: {
    title: {
      type: GraphQLString,
      description: 'Display title for the BlogPost'
    },
    slug: {
      type: GraphQLString,
      description: 'url-safe string for use in URLs. Can be derived from Title, Filename or specified in Frontmatter'
    },
    date: {
      type: GraphQLString,
      description: 'The most recent time that this BlogPost was updated, in moment-parseable format'
    },
    featuredImage: {
      type: GraphQLString,
      description: 'Featured image for display in Heros and Previews'
    },
    url: {
      type: GraphQLString,
      description: 'The absolute pathname of the BlogPost, ex. `/post`'
    },
    excerpt: {
      type: GraphQLString,
      description: 'A short excerpt of the `body` content'
    },
    timeToRead: {
      type: GraphQLInt,
      description: 'The time it takes the average person to read this post in minutes'
    }
  }
})

const BlogPostType = new GraphQLObjectType({
  name: 'BlogPost',
  description: 'A Blog Post written in Markdown with Frontmatter.',
  fields: {
    attributes: {
      type: BlogPostAttributesType,
      description: 'Metadata about the blog post'
    },
    rawBody: {
      type: GraphQLString,
      description: 'The raw Markdown, excluding any frontmatter'
    },
    body: {
      type: GraphQLString,
      description: 'The Markdown rendered as HTML'
    }
  }
})

module.exports = function(data) {

  const allPosts = filter(data, ({ attributes: a }) => a.contentType === 'leo-blogpost')
                     .sort((postA, postB) => !moment.utc(postA.date).isAfter(postB.date));

  const getPost = (slug) => {
    const post = find(allPosts, ({ attributes: a }) => a ? a.slug === slug : false);
    if(!post) {
      console.log('leo-plugin-blogpost could not find', slug, 'It may be useful to define `slug` in the frontmatter for this post');
    }
    return post
  }

  const {
    connectionType: BlogPostConnection
  } = connectionDefinitions({
    nodeType: BlogPostType
  });

  return {
    post: {
      type: BlogPostType,
      args: {
        slug: {
          type: GraphQLString,
          description: 'The slugified version of a post title'
        }
      },
      resolve: (root, { slug }) => getPost(slug)
    },
    posts: {
      type: BlogPostConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(allPosts, args)
    }
  }
}
