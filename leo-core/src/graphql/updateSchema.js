//#!/usr/bin/env babel-node --optional es7.asyncFunctions

import fs from 'fs';
import path from 'path';
import genSchema from './gen-schema';
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
const debug = oDebug('leo:graphql:updateSchema');

import {
  GraphQLSchema
}
from 'graphql/type/schema';

export default function() {
  genSchema((err, schema) => {
    debug('Schema is', schema);
    debug('is instanceof GraphQLSchema:', schema instanceof GraphQLSchema)

    debug('ensuring api folder exists');
    mkdirp.sync('./dist/api/');

    // Save JSON of full schema introspection for Babel Relay Plugin to use
    (async() => {
      debug('waiting for graphql Promise');
      var result = await (graphql(schema, introspectionQuery));
      debug('result', result);
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
      }
    })();

    // Save user readable type system shorthand of schema
    debug('writing human-readable schema');
    fs.writeFileSync(
      './dist/api/schema.graphql',
      printSchema(schema)
    );
  })
}
