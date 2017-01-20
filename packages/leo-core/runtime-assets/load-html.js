import html from "leohtml";

/**
 * This file exists for the sole purpose of not being the entry file because
 * webpack plugins don't apply to entry files. We replace
 * `import routes from '.leo-routes';` with the path to either the project's or
 * the default react-router Routes structure
 *
 */
export default html;
