import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from "graphql/type";

import oDebug from "debug";
const debug = oDebug("leo:plugin-markdown:schema");

const TextAttributesType = new GraphQLObjectType({
  name: "TextAttributes",
  fields: { title: { type: GraphQLString } }
});

const TextType = new GraphQLObjectType({
  name: "Text",
  fields: {
    attributes: { type: TextAttributesType },
    rawBody: {
      type: GraphQLString,
      description: "Content as raw Markdown. For use with a client-side markdown renderer"
    }
  }
});

module.exports = function(data) {
  return {
    text: {
      type: TextType,
      args: {
        slug: {
          type: GraphQLString,
          description: "The slugified version of a post title"
        }
      },
      resolve: (root, { slug }) => ({
        attributes: { title: "some title" },
        rawBody: "somagihg"
      })
    }
  };
};
