import genSchema from '@sa-labs/graphql-directory-api/build/gen-schema';

export const conf = __LEORC__;

const data = __DATA__;

export const schema = genSchema({
  data,
  plugins: conf.plugins
});
