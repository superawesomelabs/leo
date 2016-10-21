import { GraphQLSchema } from 'graphql/type';
import generate from '../src';

describe('basic', () => {
  it('should handle text content', done => {
    generate({
      memoryFS: true,
      files: [
        './_tests__/basic/data/content.md'
      ],
      plugins: [
        './__utils__/text'
      ]
    }, (err, { data, schema }) => {
      expect(err).toBeNull();
      expect(schema).toEqual(jasmine.any(GraphQLSchema));
      expect(Array.isArray(data)).toEqual(true);
      done();
    })
  });
})
