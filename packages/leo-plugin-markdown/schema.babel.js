import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql/type';

import { slugify } from 'lodash-addons';
import find from 'lodash/collection/find';
import oDebug from 'debug';
const debug = oDebug('leo:plugin-markdown:schema');

const BlogPostAttributesType = new GraphQLObjectType({
  name: 'BlogPostAttributes',
  fields: {
    title: {
      type: GraphQLString
    },
    date: {
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

  const getContent = (slug) => {
    debug('data.length', data.length);
    return find(data, ({ attributes: a }) => {
      debug('attributes', a)
      if(a) {
        return a.contentType === 'leo-markdown' && a.slug === slug;
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
