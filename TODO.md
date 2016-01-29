# TODO

## "Marketing" Site

- Should include Documentation and perhaps tutorials, use-cases, etc
  * http://babeljs.io/ is a nice example
- Should be built using leo, of course.

## Development Experience Improvements

Currently, building a site with Leo has a few drawbacks. The main one being that
it is not trivial to use and requires knowledge of a few commands. In addition,
the level to which changes are "hot-loaded" is not satisfactory at the current
time.

### Current Flow

The following describes approximately what it looks like to develop a Leo site
today. It is not at all clear to newcomers when each command is supposed to be
run.

```
npm run update-schema
npm run api
npm run site
```

The worst case scenario is developing a plugin, which requires all three steps
to be re-run for each schema change. Developing a plugin needs to be easy, since
it is how many new Content Types will be created and is what offers leo's
extreme extensibility.

The best-case scenario is writing a new post, which only requires the last two
steps to be re-run when it is desired to view the fully rendered post.

### Desired Flow

An ideal first-run experience might look like:

```bash
git clone some-default-project
cd some-default-project
npm i && npm start
```

A new user should then be able to create a new `whatever.post` file (provided
the default project has `leo-plugin-blogpost` enabled) and they should be able
to navigate to the relevant URL and view their post as they write it.

and for production, the same site should be built as

```bash
npm build
```
