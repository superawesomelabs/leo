# Leo Plugin BlogPost

Provides the Markdown content type for the Leo static site generator.

## Installation

```
npm i --save leo-plugin-markdown
```

then add it to the plugins list in your `.leorc`.

```
{
  "plugins": [
    "leo-plugin-markdown"
  ],
  ...
}
```

## Usage

Write a file in your `data/` directory with an extension of `.md`. For
example, consider the following `hello-world.md`.

```
# Hi world

talk about something here

* 1
* secondary
* thirdly
```

## Querying
