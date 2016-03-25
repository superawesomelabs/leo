var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var blacklist = ['.bin'];
var nodeModules = fs.readdirSync('node_modules')
  .filter(function(x) {
    return !_.includes(blacklist, x);
  });

/**
 * Add some other modules which aren't registered in node_modules
 * array above for some reason.
 *
 * Expect babel and core to be module names in the following command,
 * but not much else
 * ack -o '\!\*\*\*\ \./~\/[a-zA-Z0-9\-]*'  node_modules/.bin/leo | sort | uniq
 */
console.log(nodeModules);
nodeModules.push([
  /^graphql/,
  /^lodash/,
  /^core-js/,
  /^babel-runtime/,
  /^assets-webpack-plugin/
])

module.exports = {
  entry: './index.js',
  target: 'node',
  node: {
    // do not include poly fills...
    console: false,
    process: false,
    global: false,
    buffer: false,
    __filename: false,
    __dirname: false
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'leo.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeModules,
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  module: {
    noParse: [
      /find-leorc-path/,
      /find-leoroutes-path/,
      /enable-plugins/,
      /get-plugin-schemas/,
      /let-plugins-post-process-data/
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  }
}
