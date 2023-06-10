# css.unescape

## Install

```bash
<npm|yarn|pnpm> add css.unescape
```

## Usage

```ts
import { cssUnescape } from 'css.unescape'

cssUnescape('\\31 2345') // -> '12345'

cssUnescape('\\32 xlctext-base') // -> '2xlctext-base'

cssUnescape('a\0b') // -> 'a\uFFFDb'

cssUnescape('a\0b', {
  slashZero: false
}) // -> 'a\u0000b'
```

## Options

```ts
export interface CssUnescapeOptions {
  // default true
  // if '\0' -> '\uFFFD'
  slashZero?: boolean
}
```
