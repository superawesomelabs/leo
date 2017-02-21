import md5 from "md5";
import { print } from "graphql";

export default function hashGQLVars(query, variables) {
  const variablesHash = md5(
    !variables
      ? ""
      : Object.entries(variables)
          .reduce((acc, [key, val]) => `${acc}:${key}:${val}`, "")
  );
  const queryHash = md5(print(query));
  return {
    queryHash,
    variablesHash,
  }
}
