const debug = require("debug")("leo:develop");
import webpack from "webpack";
import path from "path";
import map from "lodash/map";
import uniq from "lodash/uniq";
import chalk from "chalk";
import { genDatabase } from "@sa-labs/graphql-directory-api";

import config from "./webpack.config.develop";
import enablePlugins from "utils/enable-plugins";
import loadLeorc from "utils/load-leorc";
import graphql, {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull
} from "graphql/type";

export default () => {
  loadLeorc((err, conf) => {
    if (err) {
      throw new Error("error loading .leorc", err);
    }
    genDatabase(
      {
        //      memoryFS: true,
        ...conf
      },
      (err, data) => {
        if (err) {
          console.log(err);
          throw new Error("failed to generate database");
        }

        /**
       * The following length comparison if intended to determine if we have
       * duplicate urls. That would mean we have two files trying to render
       * themselves at the same location.
       */
        const totalURLs = conf.urls.concat(map(data, "attributes.url"));
        const uniquedURLs = uniq(totalURLs);
        if (totalURLs.length !== uniquedURLs.length) {
          /**
         * In the future, figure out which url it is to give better error
         * message
         */
          throw new Error(
            "Two documents have the same URL. You should try to fix this"
          );
        }
        const configWithUrls = config({ conf, data, urls: uniquedURLs });
        /**
       * Enable third party plugins.
       * This is where we hook in to allow things like `npm i leo-blogpost`
       */
        const configWithUrlsAndPlugins = Object
          .entries(configWithUrls)
          .map(([ key, wpConfig ]) => {
            //                                               console.log(key, wpConfig);
            return enablePlugins({ bundleType: key, config: wpConfig, conf });
          });
        //      console.log('config', configWithUrlsAndPlugins);
        debug("enabled plugins");
        let compiler;
        try {
          compiler = webpack(configWithUrlsAndPlugins);
        } catch (e) {
          console.log("webpack error");
          console.log(e.message);
          throw e;
        }
        compiler.run((err, stats) => {
          debug("ran client and static webpack builds");
          if (err) {
            // hard failure
            debug("hard failure");
            return console.error(chalk.red(err));
          }
          const jsonStats = stats.toJson();
          if (jsonStats.errors.length > 0) {
            //soft failure
            debug("soft failure");
            jsonStats.errors.forEach(e => console.error(chalk.red(e)));
          }
          if (jsonStats.warnings.length > 0) {
            debug("softer failure");
            jsonStats.warnings.forEach(
              warning => console.warn(chalk.yellow(warning))
            );
          }
          debug("built");
        });
      }
    );
  });
};
