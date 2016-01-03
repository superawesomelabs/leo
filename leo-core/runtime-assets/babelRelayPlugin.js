var getbabelRelayPlugin = require('babel-relay-plugin');
import path from 'path';

console.log(path.resolve(process.cwd(), 'dist/api/schema.json'));
var schema = require(path.resolve(process.cwd(), 'dist/api/schema.json'));

console.log('schema', schema)
// console.log('schema', schema.data.__schema)

module.exports = getbabelRelayPlugin(schema.data);
