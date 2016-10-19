/* @flow */
import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql/type';
import getPluginSchemas from './get-plugin-schemas';
import type { PluginSpec } from './types';
import oDebug from 'debug';
const debug = oDebug('graphql-directory-api:gen-schema');

type Callback = (err: ?Error, data: ?GraphQLSchema) => void
/**
 * Merge all plugin schemas into a single Query object
 */
export default function genSchema({
  data=[], plugins=[]
}: PluginSpec, cb: Callback) {
  /**
   * This is the root query type. We use a self-reference trick to
   * enable List responses, solving issue 112 temporarily.
   * https://github.com/facebook/relay/issues/112
   */
  debug('queryFields')
    const queryFields = getPluginSchemas({ plugins, data });

  if (Object.keys(queryFields).length === 0) {
    debug('no fields');
    cb(Error('no fields in Query schema'));
  } else {
    cb(null, new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Root',
        fields: () => ({
          root: {
            type: new GraphQLNonNull(new GraphQLObjectType({
              name: 'Query',
              fields: () => queryFields
            })),
            resolve: () => ({})
          }
        })
      })
    }));
  }
}
