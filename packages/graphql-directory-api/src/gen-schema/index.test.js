import { GraphQLSchema } from 'graphql/type';
import genSchema from './index';

describe('gen-schema', () => {
  it('generates a schema', () => {
    expect(genSchema({
      data: [],
      plugins: ['./__utils__/text']
    })).toEqual(jasmine.any(GraphQLSchema))
  });
})
