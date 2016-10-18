/* @flow */
import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql/type';
import getPluginSchemas from './get-plugin-schemas';
import type { PluginSpec } from './types';
/**
 * Merge all plugin schemas into a single Query object
 */
export default async function genSchema({
  data, plugins
}: PluginSpec) {
  /**
   * This is the root query type. We use a self-reference trick to
   * enable List responses, solving issue 112 temporarily.
   * https://github.com/facebook/relay/issues/112
   */
  // Final Schema
  const Schema = await Promise.resolve(new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Root',
      fields: () => ({
        root: {
          type: new GraphQLNonNull(new GraphQLObjectType({
            name: 'Query',
            fields: () => getPluginSchemas({ plugins, data })
          })),
          resolve: () => ({})
        }
      })
    })
  }));
  return Schema;
}
