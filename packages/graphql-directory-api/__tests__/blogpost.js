import { GraphQLSchema } from "graphql/type";
import { resolve } from "path";
import generate from "../src";
import fs from "fs";

describe("leo-plugin-blogpost", () => {
  it("should handle .post content", done => {
    let rawFile = fs.readFileSync(
      "./__utils__/instrumenting-servant-with-prometheus/index.post",
      "utf-8"
    );
    let lines = rawFile.split("\n");
    lines.splice(0, 5);
    const rawBody = lines.join("\n");

    generate(
      {
        memoryFS: true,
        files: [
          "./__utils__/instrumenting-servant-with-prometheus/index.post"
        ],
        plugins: [
          "@sa-labs/leo-plugin-blogpost",
          "@sa-labs/leo-plugin-markdown",
          "@sa-labs/leo-plugin-images"
        ],
        pluginOpts: {}
      },
      (err, { data, schema } = {}) => {
        expect(err).toBeNull();
        expect(schema).toEqual(jasmine.any(GraphQLSchema));
        expect(Array.isArray(data)).toEqual(true);
        expect(
          data[0].attributes.slug
        ).toBe("instrumenting-servant-with-prometheus");
        expect(data[0].rawBody).toBe(rawBody);
        done();
      }
    );
  });

  it("should handle .post content with a custom markdown instance", done => {
    let rawFile = fs.readFileSync(
      "./__utils__/instrumenting-servant-with-prometheus/index.post",
      "utf-8"
    );
    let lines = rawFile.split("\n");
    lines.splice(0, 5);
    const rawBody = lines.join("\n");

    generate(
      {
        memoryFS: true,
        files: [
          "./__utils__/instrumenting-servant-with-prometheus/index.post"
        ],
        plugins: [
          "@sa-labs/leo-plugin-blogpost",
          "@sa-labs/leo-plugin-markdown",
          "@sa-labs/leo-plugin-images"
        ],
        pluginOpts: {
          "@sa-labs/leo-plugin-markdown": { instance: require("markdown-it")() }
        }
      },
      (err, { data, schema } = {}) => {
        expect(err).toBeNull();
        expect(schema).toEqual(jasmine.any(GraphQLSchema));
        expect(Array.isArray(data)).toEqual(true);
        expect(
          data[0].attributes.slug
        ).toBe("instrumenting-servant-with-prometheus");
        expect(data[0].rawBody).toBe(rawBody);
        done();
      }
    );
  });
});
