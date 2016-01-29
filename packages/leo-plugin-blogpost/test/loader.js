/**
 * Load a Blog Post
 */
import test from 'ava';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import evaluate from 'eval';

test.cb('loads a blogpost file', t => {
  const stringConfig = {
    entry: './_loader-assets/entry.js',
    module: {
      loaders: [{
        test: /\.post$/,
        loaders: [
          '../../loader',
          '@sa-labs/leo-plugin-markdown/loader',
          'frontmatter-loader'
        ]
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
    } = evaluate(str, 'blogpost.json', null, true);

    /**
     * Make sure the resulting JSON is accurate.
     * This file has no frontmatter and thus must derive from the filename
     */
    t.is(attributes.slug, 'test', 'slug should be derived from the filename');
    t.is(attributes.url, '/test/', 'url should be derived from the slug');
    t.is(attributes.contentType, 'leo-blogpost', 'contentType is used to identify records in the "database"');
    t.ok(attributes.date, 'A date exists as a string');
    t.is(attributes.excerpt, 'false', 'excerpt html has unintuitive behavior of returning a stringified false if no excerpt is generated');
    t.is(attributes.timeToRead, 1, 'Is a 1 minute read');
    t.is(rawBody, '# Title\n\n* some\n* list\n* here\n');
    t.is(body, '<h1>Title</h1>\n<ul>\n<li>some</li>\n<li>list</li>\n<li>here</li>\n</ul>\n');

    t.end();
  });
});
