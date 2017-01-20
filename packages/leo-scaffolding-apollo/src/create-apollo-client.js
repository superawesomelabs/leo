import ApolloClient, { addTypename } from "apollo-client";

export default options => new ApolloClient(
  Object.assign(
    {},
    {
      queryTransformer: addTypename,
      // shouldBatch: true,
      dataIdFromObject: result => {
        if (result.id && result.__typename) {
          // eslint-disable-line no-underscore-dangle
          return result.__typename +
            result.id; // eslint-disable-line no-underscore-dangle
        }
        return null;
      }
    },
    options
  )
);
