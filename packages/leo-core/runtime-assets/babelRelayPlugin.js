var getbabelRelayPlugin = require("babel-relay-plugin");
import path from "path";

var schema = require(path.resolve(process.cwd(), "dist/api/schema.json"));

module.exports = getbabelRelayPlugin(schema.data);
