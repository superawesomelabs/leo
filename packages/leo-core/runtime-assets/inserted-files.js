import { genSchema } from 'graphql-directory-api';

export const conf = __LEORC__;

const data = __DATA__;

export const schema = genSchema({
  data,
  plugins: conf.plugins
});
