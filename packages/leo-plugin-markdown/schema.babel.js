import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql/type';

import { slugify } from 'lodash-addons';
import find from 'lodash/find';
import oDebug from 'debug';
const debug = oDebug('leo:plugin-markdown:schema');

const MarkdownAttributesType = new GraphQLObjectType({
  name: 'MarkdownAttributes',
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

const MarkdownType = new GraphQLObjectType({
  name: 'Markdown',
  fields: {
    attributes: { type: MarkdownAttributesType },
    rawBody: {
      type: GraphQLString
    },
    body: {
      type: GraphQLString
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
    md: {
      type: MarkdownType,
      args: {
        slug: {
          type: GraphQLString,
          description: 'The slugified version of a post title'
        }
      },
      resolve: (root, {
        slug
      }) => getContent(slug)
    }
  }
}
