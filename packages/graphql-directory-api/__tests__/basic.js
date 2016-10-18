import generate from '../src';

test('text content', (done) => {
  const callback = jest.fn();
  generate({
    files: [
      './data/content.md'
    ],
    plugins: [
      './__utils__/text'
    ]
  }, (err, result) => {
    console.log('s');
    expect(err).toBe(null);
    expect(result.length).toEqual(1);
    done();
  })
});
