/**
 * Load a markdown file, passing it through the frontmatter-loader first
 */
import test from 'ava';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import evaluate from 'eval';

test.cb('loads a markdown file with frontmatter', t => {
  const stringConfig = {
    entry: './_loader-assets/entry-with-frontmatter.js',
    module: {
      loaders: [{
        test: /\.md$/,
        loaders: ['json-loader', '../../loader', 'frontmatter-loader']
      }]
    },
    output: {
      path: '/',
      filename: 'bundle.js',
      libraryTarget: 'commonjs2'
    }
  }

  const compiler = webpack(stringConfig);
  const fs = new MemoryFS();
  compiler.outputFileSystem = fs;

  compiler.run((err, stats) => {

    // There are 3 places to check for webpack errors
    t.ifError(err, err);
    const jsonStats = stats.toJson();
    t.is(jsonStats.errors.length, 0, jsonStats.errors);
    t.is(jsonStats.warnings.length, 0, jsonStats.warnings);

    // Read the module off the in-memory filesystem.
    const str = fs.readFileSync('/bundle.js').toString('utf-8');
    const {
      attributes,
      rawBody,
      body
    } = evaluate(str, 'markdown.json', null, true);

    // Make sure the resulting JSON is accurate.
    t.is(attributes.slug, 'some-title', 'slug should be derived from the frontmatter');
    t.is(attributes.url, '/some-title/', 'url should be derived from the slug');
    t.is(rawBody, '# Title\n\n* some\n* list\n* here\n');
    t.is(body, '<h1>Title</h1>\n<ul>\n<li>some</li>\n<li>list</li>\n<li>here</li>\n</ul>\n');

    t.end();
  });
});
