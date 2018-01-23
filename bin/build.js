#!/usr/bin/env node

const fs = require('fs');

let original = '';

const readStream = fs.createReadStream('./node_modules/normalize.css/normalize.css', 'utf8');

readStream.on('data', (chunk) => {
    original += chunk;
  }).on('end', () => {
    // Clean comments
    const regex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
    const normalize = original.replace(regex, '').replace(/^\s*\n/gm, '');

    const contents = `import {injectGlobal} from 'emotion';\n\nexport default const normalize = injectGlobal\`${normalize}\`;`;

    fs.writeFile('./index.js', contents, (err) => {
      if (err) {
        throw err;
      }
    });
});
