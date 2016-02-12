var program = require('commander');
var build = require('./src/build').default;
var graphql = require('./src/graphql').default;
var schema = require('./src/schema').default;
var develop = require('./src/develop').default;

program
  .version('0.0.1');

program
  .command('develop')
  .alias('d')
  .description('Develop the site locally. Watch files for changes.')
  .action(develop)

program
  .command('build')
  .alias('b')
  .description('build static site for deployment')
  .action(build(program));

program
  .command('graphql')
  .alias('g')
  .description('Test the graphql server for use with tools')
  .action(graphql);

program
  .command('schema')
  .alias('s')
  .description('Generate the GraphQL Schema')
  .option('-u, --update', 'Update generated schema files')
  .option('-p, --print', 'Print human-readable schema')
  .action(schema);

program.parse(process.argv);
