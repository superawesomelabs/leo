import fs from "fs";
const debug = require("debug")("leo:db");
import { genDatabase } from "@sa-labs/graphql-directory-api";

import loadLeorc from "utils/load-leorc";

export default ({ outputFile }) => {
  loadLeorc((err, conf) => {
    if (err) {
      throw new Error("error loading .leorc", err);
    }
    genDatabase(conf, (err, data) => {
      if (err) {
        console.log(err);
        throw new Error("failed to generate database");
      } else {
        debug(conf.files);
        debug(data);
        fs.writeFileSync(
          outputFile || "./database.json",
          JSON.stringify(data),
          "utf-8"
        );
      }
    });
  });
};
