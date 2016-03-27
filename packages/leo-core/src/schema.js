import fs from 'fs';
import path from 'path';
import genSchema from 'leo-graphql/gen-schema';
import {
  graphql
}
from 'graphql';
import {
  introspectionQuery, printSchema
}
from 'graphql/utilities';
import mkdirp from 'mkdirp';
import oDebug from 'debug';
const debug = oDebug('leo:schema');

export default function({ print, update }) {
  genSchema((err, schema) => {
    update ? writeSchemaFiles(schema, !print) : null;
    // Default behavior is to print human-readable schema
    if(print || !print && !update) {
      console.log(printSchema(schema));
    }
  })
}

function writeSchemaFiles(schema, shouldLog) {
  debug('ensuring api folder exists');
  mkdirp.sync('./dist/api/');

  // Save JSON of full schema introspection for Babel Relay Plugin to use
  (async() => {
    debug('resolving schema');
    var result = await (graphql(schema, introspectionQuery));
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        './dist/api/schema.json',
        JSON.stringify(result, null, 2)
      );
      shouldLog ? console.log('wrote `./dist/api/schema.json`') : null;
    }
  })();

  // Save user readable type system shorthand of schema
  debug('writing human-readable schema');
  fs.writeFileSync(
    './dist/api/schema.graphql',
    printSchema(schema)
  );
  shouldLog ? console.log('wrote `./dist/api/schema.graphql`') : null;
}
