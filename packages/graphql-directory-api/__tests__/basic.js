import { GraphQLSchema } from 'graphql/type';
import generate from '../src';

describe('basic', () => {
  it('should handle text content', done => {
    generate({
      memoryFS: true,
      files: [
        './data/content.md'
      ],
      plugins: [
        './__utils__/text'
      ]
    }, (err, result) => {
      expect(err).toBeNull();
      expect(result).toEqual(jasmine.any(GraphQLSchema));
      done();
    })
  });
})
