import genDatabase from './gen-database';
import genSchema from './gen-schema';

export default function generate(opts={
  files: [],
  plugins: [],
  pluginOpts: {},
  output: {
    dir: './dist'
  }
}, cb) {
  genDatabase(opts, (err, data) => {
    if(err) {
      return cb(err);
    }
    genSchema({
      data,
      plugins: opts.plugins
    }, (pErr, schema) => {
      if(pErr) {
        cb(pErr);
      } else {
        cb(null, schema);
      }
    })
  })
}
