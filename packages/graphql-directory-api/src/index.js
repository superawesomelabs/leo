import genDatabase from "./gen-database";
import genSchema from "./gen-schema";

export { default as genDatabase } from "./gen-database";
export { default as genSchema, NoFieldsError } from "./gen-schema";

export default function generate(
  opts = { files: [], plugins: [], pluginOpts: {}, output: { dir: "./dist" } },
  cb
) {
  genDatabase(opts, (err, data) => {
    if (err) {
      return cb(err);
    }
    cb(null, { data, schema: genSchema({ data, plugins: opts.plugins }) });
  });
}
