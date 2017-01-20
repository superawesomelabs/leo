import path from "path";
const debug = require("debug")("leo:find-leoroutes-path");

/**
 * .routes is handled by a special loader which creates routes, etc
 * Unfortunately, webpack can't load a file that doesn't exist, so
 * we check the user's .routes first, then fall back to our default one
 */
export default () => {
  let routes;
  try {
    debug("trying to use project's routes");
    routes = require.resolve(path.resolve(process.cwd(), "routes"));
  } catch (e) {
    debug("falling back to default route structure");
    routes = require.resolve(path.resolve(__dirname, "routes"));
  }
  debug(`using ${routes}`);
  return routes;
};
