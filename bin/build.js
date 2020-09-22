#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const normalizePackage = JSON.parse(fs.readFileSync('./node_modules/normalize.css/package.json', 'utf8'));

const normalizeMain = path.join('./node_modules/normalize.css', normalizePackage.main);
const readStream = fs.readFileSync(normalizeMain, 'utf8');
const regex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
const normalize = readStream.replace(regex, '').replace(/^\s*\n/gm, '');

const contents = `import { css } from '@emotion/react';

const normalize = css\`
${normalize}\`;

export default normalize;`;

fs.writeFileSync('./src/index.js', contents);
