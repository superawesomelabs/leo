// Adapted file-loader to process using graphicsmagick
const loaderUtils = require("loader-utils");
const gm = require('gm');

module.exports = function(content) {
  this.cacheable && this.cacheable();
  var callback = this.async && this.async();
  if(!callback) {
    // TODO provide sync fallback
    throw new Error('GraphicksMagick can not operate in sync mode');
    //    return someSyncOperation(content);
  }

  if(!this.emitFile) throw new Error("emitFile is required from module system");

  var query = loaderUtils.parseQuery(this.query);
  var configKey = query.config || "graphicsmagickLoader";
  var options = this.options[configKey] || {};

  var config = {
    publicPath: false,
    name: "[hash].[ext]"
  };

  // options takes precedence over config
  Object.keys(options).forEach(function(attr) {
    config[attr] = options[attr];
  });

  // query takes precedence over config and options
  Object.keys(query).forEach(function(attr) {
    config[attr] = query[attr];
  });

  // processing happens before interpolating hashed name
  const normalFilename = loaderUtils.interpolateName(this, '[name].[ext]', {
    content: content
  });
  const image = gm(content, normalFilename);
  image.identify((err, data) => {
    if(err) {
      callback(err);
    }
    console.log(data.size, data.format);
    image.resize(40)
         .toBuffer(data.format, (err, buffer) => {
           if (err) {
             throw new Error(err);
           }
           // end processing
           var url = loaderUtils.interpolateName(this, config.name, {
             context: config.context || this.options.context,
             content: buffer,
             regExp: config.regExp
           });

           var publicPath = "__webpack_public_path__ + " + JSON.stringify(url);

           if (config.publicPath) {
             // support functions as publicPath to generate them dynamically
             publicPath = JSON.stringify(
               typeof config.publicPath === "function"
             ? config.publicPath(url)
	         : config.publicPath + url
             );
           }

           if (query.emitFile === undefined || query.emitFile) {
             this.emitFile(url, buffer);
           }

           const json = {
             path: publicPath,
             width: size.width,
             height: size.height
           }
           callback(null, `module.exports = ${JSON.stringify(json)};`);
         });
  })
}
module.exports.raw = true;
