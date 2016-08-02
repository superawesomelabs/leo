import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql/type';

import find from 'lodash/find';
import filter from 'lodash/filter';
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
    url: {
      type: GraphQLString,
      description: 'The absolute pathname of the content, ex. `/post`'
    },
    canonicalURL: {
      type: GraphQLString,
      description: 'The Canonical URL for this content. Can be used to deprecate pages for SEO when you want to keep the old content around.'
    }
  }
})

const MarkdownType = new GraphQLObjectType({
  name: 'Markdown',
  fields: {
    attributes: { type: MarkdownAttributesType },
    rawBody: {
      type: GraphQLString,
      description: 'Content as raw Markdown. For use with a client-side markdown renderer'
    },
    body: {
      type: GraphQLString,
      description: 'Content as HTML. Can be directly inserted without client-side renderer'
    }
  }
})

module.exports = function(data) {

  /**
   * All of the parsed markdown files. Signified by `contentType`
   * being `leo-markdown`.
   */
  const allMarkdown = filter(data, ({ attributes: a }) => a.contentType === 'leo-markdown');

  /**
   * Get a single markdown document by slug
   */
  const getContent = (slug) => {
    return find(allMarkdown, ({ attributes: a }) => a ? a.slug === slug : false)
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
      resolve: (root, { slug }) => getContent(slug)
    }
  }
}
