import graphql, {
  GraphQLSchema,
  GraphQLObjectType
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
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: () => {
          return getPluginSchemas(plugins, data)
        }
      })
    });

    callback(null, schema);
  })
}
