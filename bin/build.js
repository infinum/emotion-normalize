#!/usr/bin/env node

const fs = require('fs');

let original = '';
let version = '';

// Read version from the normalize.css package and write it in our package.json
const normalizePackage = fs.createReadStream('./node_modules/normalize.css/package.json', 'utf8');

normalizePackage.on('data', (chunk) => {
  if (chunk.indexOf("version: ")) {
    const match = chunk.match(/("version": "[\d+\.]*")/g)[0];
    version = match.match(/[\d\.*]+/g)[0];
  }
}).on('end', () => {
  fs.readFile('./package.json', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }
    var result = data.replace(/("version": "[\d+\.]*")/g, `"version": "${version}"`);

    fs.writeFile('./package.json', result, 'utf8', function (error) {
       if (error) {
        return console.log(error);
      };
    });
  });
});

// Read css from normalize.css, clean comments and write it in our index.js
const readStream = fs.createReadStream('./node_modules/normalize.css/normalize.css', 'utf8');

readStream.on('data', (chunk) => {
    original += chunk;
    version
  }).on('end', () => {
    const regex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
    const normalize = original.replace(regex, '').replace(/^\s*\n/gm, '');

    const contents = `import {css} from 'emotion';\n\nconst normalize = css\`${normalize}\`;\n\nexport default normalize;`;

    fs.writeFile('./index.js', contents, (error) => {
      if (error) {
        return console.log(error);
      }
    });
});
