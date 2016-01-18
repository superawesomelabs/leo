import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql/type';

import find from 'lodash/find';
import oDebug from 'debug';
const debug = oDebug('leo:plugin-blogpost:schema');

const BlogPostAttributesType = new GraphQLObjectType({
  name: 'BlogPostAttributes',
  fields: {
    title: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    featuredImage: {
      type: GraphQLString
    },
    path: {
      type: GraphQLString
    }
  }
})

const BlogPostType = new GraphQLObjectType({
  name: 'BlogPost',
  fields: {
    attributes: { type: BlogPostAttributesType },
    body: {
      type: GraphQLString
    }
  },
  resolve: () => {
    return {
      attributes: {
        title: 'A Test Post',
        path: '/a-test-post'
      },
      body: 'test resolve post'
    }
  }
})

module.exports = function(data) {

  const getPost = (slug) => {
    debug('data.length', data.length);
    return find(data, ({ attributes: a }) => {
      debug('attributes', a)
      if(a) {
        return a.contentType === 'leo-blogpost' && a.slug === slug;
      } else {
        return false;
      }
    })
  }

  return {
    post: {
      type: BlogPostType,
      args: {
        slug: {
          type: GraphQLString,
          description: 'The slugified version of a post title'
        }
      },
      resolve: (root, {
        slug
      }) => getPost(slug)
    }
  }
}
