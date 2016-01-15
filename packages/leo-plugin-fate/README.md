# Leo Plugin BlogPost

Provides the BlogPost content type for the Leo static site generator.

## Installation

```
npm i --save leo-plugin-blogpost
```

then add it to the plugins list in your `.leorc`.

```
{
  "plugins": [
    "leo-plugin-blogpost"
  ],
  ...
}
```

## Usage

Write a file in your `data/` directory with an extension of `.post`. For
example, consider the following `hello-world.post`.

```
---
title: 'Hello world'
publish: draft
---

# Hi world

talk about something here

* 1
* secondary
* thirdly
```

## Querying
