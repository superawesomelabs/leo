import loaderUtils from 'loader-utils';
var debug = require('debug')('graphql-directory-api:database-loader');
import template from 'babel-template';
import generate from 'babel-generator';
import * as t from 'babel-types';

function mkRequireArray(paths) {
  const buildRequire = template(`
  module.exports = FILES_ARRAY;
`);

  // requirePaths generates `[require('a')]`
  const requirePaths = t.arrayExpression(
    paths.map(v => {
        require.resolve(v);
        return t.callExpression(t.identifier('require'),
                                [
                                  t.stringLiteral(require.resolve(v))
                                ])
    })
  );

  const ast = buildRequire({
    FILES_ARRAY: requirePaths
  });

  debug('generating database code from AST');
  return generate(ast).code;
}

module.exports = function(content, map) {
  this.cacheable && this.cacheable();
  const options = this.options.database || {};
  const { files=[] } = options;
  return mkRequireArray(files)
}
