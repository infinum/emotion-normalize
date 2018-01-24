#!/usr/bin/env node

const fs = require('fs');

// Read version from the normalize.css package and write it in our package.json
const normalizePackage = JSON.parse(fs.readFileSync('./node_modules/normalize.css/package.json', 'utf8'));

const normalizeVersion = normalizePackage.version;

fs.readFile('./package.json', 'utf8', function (error, data) {
  if (error) {
    return console.log(error);
  }
  var result = data.replace(/("version": "[\d+\.]*")/g, `"version": "${normalizeVersion}"`);

  fs.writeFile('./package.json', result, 'utf8', function (error) {
     if (error) {
      return console.log(error);
    };
  });
});

// Read css from normalize.css, clean comments and write it in our index.js
const readStream = fs.readFileSync(`./node_modules/normalize.css/${normalizePackage.main}`, 'utf8');
const regex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
const normalize = readStream.replace(regex, '').replace(/^\s*\n/gm, '');

const contents = `import {css} from 'emotion';\n\nconst normalize = css\`\n${normalize}\`;\n\nexport default normalize;`;

fs.writeFile('./index.js', contents, (error) => {
  if (error) {
    return console.log(error);
  }
});
