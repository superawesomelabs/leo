import StaticSiteGeneratorPlugin from "./plugins/static-site-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import path, { resolve } from "path";
import webpack from "webpack";
import findLeoRoutesPath from "utils/find-leoroutes-path";
import findLeoHTMLPath from "utils/find-leohtml-path";
import AssetsPlugin from "assets-webpack-plugin";
import serialize from "serialize-javascript";

export default ({ conf, data, urls }) => {
  const outputPath = conf.outputPath ? conf.outputPath : process.cwd() + '/dist';
  function getDefinePlugins() {
    const dPlugins = [
      /**
       * definePlugin takes raw strings and inserts them, so we put in
       * strings of JSON. This includes the leo configuration and
       * the full set of loaded data (markdown, etc)
       */
      new webpack.DefinePlugin({
        __LEORC__: JSON.stringify(conf),
        __DATA__: JSON.stringify(data)
      })
    ];
    if (conf.define) {
      /**
       * If there are any user-defined ENV vars or Flags,
       * inject hem too.
       */
      dPlugins.push(new webpack.DefinePlugin(conf.define));
    }
    return dPlugins;
  }

  let staticEntry = path.resolve(__dirname, "entry-static-watch.js");
  if (conf.scaffolding) {
    staticEntry = `${conf.scaffolding}/entry-static`;
  }
  let clientEntry = path.resolve(__dirname, "entry-client");
  if (conf.scaffolding) {
    clientEntry = `${conf.scaffolding}/entry-client`;
  }

  return {
    static: {
      entry: { static: staticEntry },
      target: "node",
      node: {
        // do not include poly fills...
        console: true,
        process: false,
        global: false,
        buffer: false,
        __filename: false,
        __dirname: false
      },
      output: {
        // chunkhash can't be used in hmr
        filename: "js/[name]-[chunkhash].js",
        path: outputPath,
        libraryTarget: "commonjs2"
      },
      externals: [ /^graphql/ ],
      resolve: { extensions: [ ".js", ".json", ".leorc" ] },
      resolveLoader: {
        modules: [
          "node_modules",
          /**
           * Allow leo's custom loaders to be accessed without specifying the full
           * path. ie: leo-markdown-loader vs './node_modules/leo-plugin-blog/...'
           */
          path.resolve(__dirname, "loaders")
        ]
      },
      plugins: [
        new AssetsPlugin({
          filename: "webpack-static-assets.json",
          path: path.resolve(process.cwd(), "dist/js"),
          prettyPrint: true
        }),
        new StaticSiteGeneratorPlugin("static", urls),
        /**
         * replaces require('.leorc') in application js files with the
         * location of a .leorc
         */
        new webpack.NormalModuleReplacementPlugin(
          /leorc/,
          // A file we know exists but won't actually use
          resolve(__dirname, "leo.js")
        ),
        /**
         * replaces require('leoroutes') in application js files with the
         * location of a routes.js
         */
        new webpack.NormalModuleReplacementPlugin(
          /leoroutes/,
          findLeoRoutesPath()
        ),
        //wat
        //      new webpack.DefinePlugin({ "global.GENTLY": false }),
        new webpack.NormalModuleReplacementPlugin(
          /leohtml/,
          findLeoHTMLPath(conf.scaffolding)
        ),
        ...getDefinePlugins(),
        new CopyWebpackPlugin([ { from: "static" } ])
      ],
      module: {
        noParse: [
          /node_modules\/rc/,
          /node_modules\/eval/,
          /get-plugin-schemas/
        ],
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(graphql|node_modules)/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: path.resolve(process.cwd(), ".babelcache")
                }
              }
            ]
          }
        ]
      }
    },
    client: {
      entry: { client: clientEntry },
      devtool: "cheap-eval-source-map",
      output: {
        // chunkhash can't be used in hmr
        filename: "js/client.js",
        path: outputPath,
      },
      target: "web",
      resolve: { extensions: [ ".js", ".json", ".leorc" ] },
      plugins: [
        new AssetsPlugin({
          filename: "webpack-client-assets.json",
          path: path.resolve(process.cwd(), "dist/js"),
          prettyPrint: true
        }),
        /**
         * replaces require('.leorc') in application js files with the
         * location of a .leorc
         */
        new webpack.NormalModuleReplacementPlugin(
          /leorc/,
          // A file we know exists but won't actually use
          resolve(__dirname, "leo.js")
        ),
        /**
         * replaces require('leoroutes') in application js files with the
         * location of a routes.js
         */
        new webpack.NormalModuleReplacementPlugin(
          /leoroutes/,
          findLeoRoutesPath()
        ),
        //wat
        //      new webpack.DefinePlugin({ "global.GENTLY": false }),
        ...getDefinePlugins()
      ],
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [ { loader: "babel-loader" } ]
          }
        ]
      }
    }
  };
};
