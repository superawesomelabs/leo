import { GraphQLSchema } from "graphql/type";
import { resolve } from "path";
import generate from "../src";

describe("basic", () => {
  it("should handle text content", done => {
    generate(
      {
        memoryFS: true,
        files: [ "./__tests__/basic/data/content.md" ],
        plugins: [ resolve(process.cwd(), "./__utils__/text") ]
      },
      (err, { data, schema } = {}) => {
        expect(err).toBeNull();
        expect(schema).toEqual(jasmine.any(GraphQLSchema));
        expect(Array.isArray(data)).toEqual(true);
        expect(data[0].attributes.slug).toBe("slug");
        expect(
          data[0].rawBody
        ).toBe('---\ntitle: "Some Content"\n---\n# What is this\n\ntesting\n\n> quoootes\n');
        done();
      }
    );
  });
});
