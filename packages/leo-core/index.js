var program = require('commander');
var build = require('./src/build').default;
var graphql = require('./src/graphql').default;
var updateSchema = require('./src/updateSchema').default;

program
  .version('0.0.1');

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
  .command('update-schema')
  .alias('s')
  .description('update the graphql schema')
  .action(updateSchema);

program.parse(process.argv);
