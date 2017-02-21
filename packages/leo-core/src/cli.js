var program = require('commander');
var api = require('./api').default;
var schema = require('./schema').default;
var develop = require('./develop').default;
var build = require('./build').default;
var db = require('./db').default;

program
  .version('0.0.1');

program
  .command('develop')
  .alias('d')
  .description('Develop the site locally. Watch files for changes.')
  .option('-w, --watch', 'Watch mode')
  .action(develop);

program
  .command('build')
  .alias('b')
  .description('Build the site once with production flags')
  .action(build);

program
  .command('api')
  .alias('a')
  .description('Test the graphql server for use with tools')
  .action(api);

program
  .command('schema')
  .alias('s')
  .description('Generate the GraphQL Schema')
  .option('-u, --update', 'Update generated schema files')
  .option('-p, --print', 'Print human-readable schema')
  .action(schema);

program
  .command('db')
  .alias('d')
  .description('Generate the database from the data directory')
  .option('-o, --output-file <filepath>', 'File to write to')
  .action(db);

program.parse(process.argv);
