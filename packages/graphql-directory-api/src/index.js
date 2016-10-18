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
    }).then(schema => {
      cb(null, schema);
    }).catch(pErr => {
      cb(pErr);
    })
  })
}
