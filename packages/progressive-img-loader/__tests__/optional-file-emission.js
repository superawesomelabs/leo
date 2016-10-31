var should = require("should");
var loader = require("../");
const fs = require('fs');

function run(resourcePath, query, content) {
  content = content || fs.readFileSync('./__tests__/sky.jpeg');
  var result = false;
  var context = {
    resourcePath: resourcePath,
    query: "?" + query,
    options: {
      context: "/this/is/the/context"
    },
    emitFile: function(url, content2) {
      result = true;
    }
  };
  loader.call(context, content);
  return result;
}

describe("optional-emission", function() {
  it("should emit a file by default", function() {
    run("whatever.txt", "").should.be.true;
  });

  it("should not emit a file if disabled", function() {
    run("whatever.txt", "emitFile=false").should.be.false;
  });
});
