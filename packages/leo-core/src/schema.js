import fs from "fs";
import path from "path";
import { graphql } from "graphql";
import { introspectionQuery, printSchema } from "graphql/utilities";
import genSchema from "@sa-labs/graphql-directory-api/build/gen-schema";
import mkdirp from "mkdirp";
import oDebug from "debug";
const debug = oDebug("leo:schema");
import loadLeorc from "utils/load-leorc";

export default function({ print, update }) {
  loadLeorc((err, conf) => {
    const schema = genSchema({ data: [], plugins: conf.plugins });
    update ? writeSchemaFiles(schema, !print) : null;
    // Default behavior is to print human-readable schema
    if (print || !print && !update) {
      console.log(printSchema(schema));
    }
  });
}

function writeSchemaFiles(schema, shouldLog) {
  debug("ensuring api folder exists");
  mkdirp.sync("./dist/api/");

  // Save JSON of full schema introspection for Babel Relay Plugin to use
  (async () => {
    try {
    debug("resolving schema");
    var result = await graphql(schema, introspectionQuery);
    if (result.errors) {
      console.error(
        "ERROR introspecting schema: ",
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        "./dist/api/schema.json",
        JSON.stringify(result, null, 2)
      );
      shouldLog ? console.log("wrote `./dist/api/schema.json`") : null;
    }
  } catch (e) {
    console.warn(e);
  }
  })();

  // Save user readable type system shorthand of schema
  debug("writing human-readable schema");
  fs.writeFileSync("./dist/api/schema.graphql", printSchema(schema));
  shouldLog ? console.log("wrote `./dist/api/schema.graphql`") : null;
}
