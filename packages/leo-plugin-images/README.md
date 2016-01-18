# Leo Plugin Images

Provides Image processing for the Leo static site generator.

## Installation

```
npm i --save leo-plugin-images
```

then add it to the plugins list in your `.leorc`.

```
{
  "plugins": [
    "leo-plugin-images"
  ],
  ...
}
```

## Usage

`require` an image in any React Component. The image will be
optimized, the filename hashed and the new image will be output into
the `dist/` directory.

