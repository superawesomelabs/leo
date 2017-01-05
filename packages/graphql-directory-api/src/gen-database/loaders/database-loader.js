import loaderUtils from 'loader-utils';
var debug = require('debug')('graphql-directory-api:database-loader');
import template from 'babel-template';
import generate from 'babel-generator';
import * as t from 'babel-types';
import { resolve } from 'path';

function mkRequireArray(paths) {
  const buildRequire = template(`
  module.exports = FILES_ARRAY;
`);

  // requirePaths generates `[require('a')]`
  const requirePaths = t.arrayExpression(
    paths.map(v => {
      const path = require.resolve(resolve(process.cwd(), v));
      return t.callExpression(t.identifier('require'),
                              [
                                t.stringLiteral(path)
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
  const {
    files=[]
  } = loaderUtils.parseQuery(this.query);
  debug('files', files);
  return mkRequireArray(files)
}
