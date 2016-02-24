import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  isOutputType,
  getNamedType
} from 'graphql/type';
import getPluginSchemas from './copyof-get-plugin-schemas';

export const conf = __LEORC__;

const data = __DATA__;

console.log('data', data[0].attributes);

function printPrototype(obj, i) {
  var n = Number(i || 0);
  var indent = Array(2 + n).join("-");

  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      console.log(indent, key, ": ", obj[key]);
    }
  }

  if(obj) {
    if(Object.getPrototypeOf) {
      printPrototype(Object.getPrototypeOf(obj), n + 1);
    } else if(obj.__proto__) {
      printPrototype(obj.__proto__, n + 1);
    }
  }
  }

console.log('plugin', require('@sa-labs/leo-plugin-blogpost/schema')([]).post);
const t = getPluginSchemas(conf.plugins, data).post.type;
console.log('isOutputType', isOutputType(t));
console.log('getNamedType', getNamedType(t));
console.log('getNamedType instanceof GraphQLObjectType', getNamedType(t) instanceof GraphQLObjectType);
console.log('prototypes', t.prototype)

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: getPluginSchemas(conf.plugins, data)
});
const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    root: {
      type: new GraphQLNonNull(Query),
      resolve: () => ({})
    }
  }
});

console.log('api root is', Root);
// Final Schema
export const schema = new GraphQLSchema({
  query: Root
});
