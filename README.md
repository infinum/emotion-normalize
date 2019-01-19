# emotion-normalize

Normalize file for [Emotion](https://github.com/emotion-js/emotion) CSS-in-JS library.

The original `normalize.css` is pulled from [necolas/normalize.css](https://github.com/necolas/normalize.css), and parsed into emotion ready format.

## Usage

```sh
npm install --save emotion-normalize
```

### JavaScript

```js
import { Global, css } from "@emotion/core";
import emotionNormalize from 'emotion-normalize';

// ...

<Global
  styles={css`
    ${emotionNormalize}
    html,
    body {
      padding: 0;
      margin: 0;
      background: white;
      min-height: 100%;
      font-family: Helvetica, Arial, sans-serif;
    }
  `}
/>
```

## License

The [MIT License](LICENSE)

## Credits

emotion-normalize is maintained and sponsored by
[Infinum](http://www.infinum.co).

<img src="https://infinum.co/infinum.png" width="264">
