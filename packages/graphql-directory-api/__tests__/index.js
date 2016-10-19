import { GraphQLSchema } from 'graphql/type';
import generate from '../src';

describe('index', () => {
  it('generates nothing', done => {
    generate({
      memoryFS: true
    }, (err, result) => {
      expect(err).toEqual(jasmine.any(Error));
      expect(result).toBeUndefined();
      done();
    });
  });
})
