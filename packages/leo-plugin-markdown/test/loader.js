/**
 * Load a markdown file
 */
import test from 'ava';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import evaluate from 'eval';

test.cb('loads a markdown file', t => {
  const stringConfig = {
    entry: './_loader-assets/entry.js',
    module: {
      loaders: [{
        test: /\.md$/,
        loaders: ['../../loader']
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

    /**
     * Make sure the resulting JSON is accurate.
     * This file has no frontmatter and thus must derive from the filename
     */
    t.is(attributes.slug, 'test', 'slug should be derived from the filename');
    t.is(attributes.url, '/test/', 'url should be derived from the slug');
    t.is(rawBody, '# Title\n\n* some\n* list\n* here\n');
    t.is(body, '<h1>Title</h1>\n<ul>\n<li>some</li>\n<li>list</li>\n<li>here</li>\n</ul>\n');

    t.end();
  });
});
