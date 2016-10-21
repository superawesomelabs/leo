import { GraphQLSchema } from 'graphql/type';
import generate, {
  genDatabase,
  genSchema,
  NoFieldsError
} from '../src';

describe('index', () => {
  it.skip('generates nothing', () => {
    expect(generate()).toThrow(NoFieldsError);
  });
  it('generates a database', done => {
    genDatabase({
      memoryFS: true
    }, (err, data) => {
      expect(err).toBeNull();
      expect(Array.isArray(data)).toEqual(true);
      done();
    });
  });

})
