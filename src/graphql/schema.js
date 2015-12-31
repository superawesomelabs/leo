import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql/type';

// pull in all data here or in resolve

let counts = [0, 1, 2, 3];

function getPost(slug) {
  return {
    attributes: {
      title: 'A Test Post',
      path: '/a-test-post/'
    },
    body: 'test post'
  }
}

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
        path: '/a-test-post/'
      },
      body: 'test post'
    }
  }
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      post: {
        type: BlogPostType,
        args: {
          slug: {
            type: GraphQLString,
            description: 'The slugified version of a post title'
          }
        },
        resolve: (root, { slug }) => getPost(slug)
      }
    })
  })
});
