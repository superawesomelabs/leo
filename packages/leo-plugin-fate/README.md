# Leo Plugin Fate

Provides the Fate Component System for the Leo static site generator.

## Installation

```
npm i --save leo-plugin-fate
```

then add it to the plugins list in your `.leorc`.

```
{
  "plugins": [
    "leo-plugin-fate"
  ],
  ...
}
```

## Usage

Fate uses PostCSS. Write a CSS file alongside your components.

```
/* Whatever.css */
:root {
  --something: #fff;
}

body {
  background: var(--something);
}

.myClass {
  border: 1px solid black;
}
```

Then require the CSS file in your templates.

```
// Routes.js
import styles from './Whatever.css';

...

<div className={styles.myClass}>...</div>
```
