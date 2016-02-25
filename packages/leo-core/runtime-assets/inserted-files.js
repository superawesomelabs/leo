import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql/type';
import getPluginSchemas from './copyof-get-plugin-schemas';

export const conf = __LEORC__;

const data = __DATA__;

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: getPluginSchemas(conf.plugins, data)
});
const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    root: {
      type: new GraphQLNonNull(Query),
      resolve: () => ({})
    }
  }
});

// Final Schema
export const schema = new GraphQLSchema({
  query: Root
});
