import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import generate from '@sa-labs/graphql-directory-api';
import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';
import fs from 'fs';
import md5 from 'md5';
import mkdirp from 'mkdirp';

import loadLeorc from 'utils/load-leorc';

var debug = require('debug')('leo:graphql:api');

export default function(callback) {
  loadLeorc((err, conf) => {

    generate({
      memoryFS: true,
      ...conf
    }, (err, { schema }) => {

      const apiFolder = './dist/api';
      const app = express();

      //    app.use(logger('dev'));

      // parse POST body as text
      app.use(bodyParser.text({
        type: 'application/graphql'
      }));

      /**
       * When polyfilling XMLHTTPRequest in the static site generator, the requests
       * come as text
       */
      app.use(bodyParser.json({
        type: 'text/plain'
      }));
      app.use(bodyParser.json({
        type: 'json'
      }));

      // ensure the directory to place api .json files into exists
      debug('ensuring api folder exists');
      mkdirp.sync('./dist/api/');

      /* const writeGraphQLJSONResponseToFile = (filename, json) => {
         const filePath = path.resolve(apiFolder, `${filename}.json`);
         fs.writeFile(filePath, json, function(err) {
         if (err) throw err;
         return debug(`wrote JSON to ${path.resolve(apiFolder, filename)}.json`);
         });
         } */

      app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
      }));

      // catch 404 and forward to error handler
      app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
      });

      // error handlers

      // development error handler
      // will print stacktrace
      if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
            message: err.message,
            error: err
          });
        });
      }

      callback(null, app);
    })
  })
}
