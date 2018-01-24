#!/usr/bin/env node

const fs = require('fs');
const path = require('path');


// Read version from the normalize.css package and write it in our package.json
const normalizePackage = JSON.parse(fs.readFileSync('./node_modules/normalize.css/package.json', 'utf8'));

const normalizeVersion = normalizePackage.version;

const data = fs.readFileSync('./package.json', 'utf8');
const package = JSON.parse(data);
package.version = normalizeVersion;

fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));

// Read css from normalize.css, clean comments and write it in our index.js
const normalizeMain = path.join('./node_modules/normalize.css', normalizePackage.main);
const readStream = fs.readFileSync(normalizeMain, 'utf8');
const regex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
const normalize = readStream.replace(regex, '').replace(/^\s*\n/gm, '');

const contents = `import {css} from 'emotion';\n\nconst normalize = css\`\n${normalize}\`;\n\nexport default normalize;`;

fs.writeFileSync('./index.js', contents);
