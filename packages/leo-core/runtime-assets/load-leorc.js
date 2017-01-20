import conf from ".leorc";

/**
 * This file exists for the sole purpose of not being the entry file because
 * webpack plugins don't apply to entry files. We replace
 * `import conf from '.leorc';` with the path to either the project's or the
 * default .leorc
 *
 */
export default conf;
