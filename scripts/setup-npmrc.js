#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.warn('Warning: GITHUB_TOKEN not set. Private GitHub packages may fail to install.');
  process.exit(0);
}

const npmrcPath = path.join(process.cwd(), '.npmrc');
const npmrcContent = `//github.com/:_authToken=${token}\n`;

fs.writeFileSync(npmrcPath, npmrcContent, 'utf8');
console.log('✓ Created .npmrc from GITHUB_TOKEN');
