import path from "path";
const debug = require("debug")("leo:find-leohtml-path");

/**
 * Unfortunately, webpack can't load a file that doesn't exist, so
 * we check the user's html.js first, then fall back to our default one
 */
export default scaffoldingPlugin => {
  let pathname;
  try {
    debug("trying to use project's html wrapper");
    pathname = require.resolve(path.resolve(process.cwd(), "html"));
  } catch (e) {
    try {
      debug("trying to use local scaffolding plugin's html wrapper");
      pathname = require.resolve(
        path.resolve(process.cwd(), scaffoldingPlugin, "html")
      );
    } catch (e) {
      try {
        debug("trying to use node_module scaffolding plugin's html wrapper");
        pathname = require.resolve(`${scaffoldingPlugin}/html`);
      } catch (e) {
        debug("falling back to default html wrapper");
        pathname = require.resolve(path.resolve(__dirname, "html.js"));
      }
    }
  }
  debug(`using ${pathname}`);
  return pathname;
};
