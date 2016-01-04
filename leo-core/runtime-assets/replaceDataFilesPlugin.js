/**
 * Create a babel plugin which will replace `__DATA_FILES__` with require
 * statements; This allows webpack to execute the require statements so
 * loaders process them.
 */
export default function({ types: t }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        console.log('babel path', path)
        if (path.node.name === "__DATA_FILES__") {
          path.replaceWith(t.valueToNode(mkRequireArray(filepaths)));
        }
      }
    }
  };
}
