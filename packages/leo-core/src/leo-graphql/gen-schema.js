import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull
}
from 'graphql/type';
import getPluginSchemas from './get-plugin-schemas';
import {
  genDatabase
}
from 'utils/gen-database';

/**
 * Merge all plugin schemas into a single Query object
 */
export default function genSchema(callback) {
  genDatabase((err, { data, plugins }) => {

    if (err) {
      throw new Error('failed to generate database', err);
    }

    /**
     * This is the root query type. We use a self-reference trick to
     * enable List responses, solving issue 112 temporarily.
     * https://github.com/facebook/relay/issues/112
     */
    const Query = new GraphQLObjectType({
      name: 'Query',
      fields: () => getPluginSchemas(plugins, data)
    });

    const Root = new GraphQLObjectType({
      name: 'Root',
      fields: () => ({
        root: {
          type: new GraphQLNonNull(Query),
          resolve: () => ({})
        }
      })
    });

    // Final Schema
    callback(null, new GraphQLSchema({
      query: Root
    }));
  })
}
