import generate from '../src';

test('generates nothing', () => {
  generate(undefined, (err, result) => {
    expect(err).toBe(null);
    expect(result).toEqual([]);
  });
});
