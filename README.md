# emotion-normalize

Normalize file for [Emotion](https://github.com/emotion-js/emotion) CSS-in-JS library.

The original `normalize.css` is pulled from [necolas/normalize.css](https://github.com/necolas/normalize.css), and parsed into emotion ready format.

## Usage

```sh
npm install --save emotion-normalize
```

### JavaScript

```js
// global.js - place in your app where global styles reside
import emotionNormalize from 'emotion-normalize';
import {injectGlobal} from 'emotion';

/* eslint-disable no-unused-expressions */
injectGlobal`
${emotionNormalize}

*, *::after, *::before {
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
}`;
/* eslint-enable */
```

## License

The [MIT License](LICENSE)

## Credits

emotion-normalize is maintained and sponsored by
[Infinum](http://www.infinum.co).

<img src="https://infinum.co/infinum.png" width="264">
