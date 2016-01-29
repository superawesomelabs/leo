/**
 * Load a blogpost file with custom frontmatter values
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
    } = evaluate(str, 'blogpost-with-frontmatter.json', null, true);

    // Make sure the resulting JSON is accurate.
    t.is(attributes.slug, 'some-title', 'slug should be derived from the frontmatter');
    t.is(attributes.url, '/some-title/', 'url should be derived from the slug');
    t.is(attributes.contentType, 'leo-blogpost', 'contentType is used to identify records in the "database"');
    t.ok(attributes.date, 'Jan 13, 2013', 'date is derived from frontmatter');
    t.is(attributes.excerpt, 'there is an excerpt that should show up here', 'Blog Posts come with excerpts');
    t.is(attributes.timeToRead, 1, 'Is a 1 minute read');
    t.is(rawBody, '# Title\n\nthere is an excerpt that should show up here\n\n* some\n* list\n* here\n');
    t.is(body, '<h1>Title</h1>\n<p>there is an excerpt that should show up here</p>\n<ul>\n<li>some</li>\n<li>list</li>\n<li>here</li>\n</ul>\n');

    t.end();
  });
});
