import { readFile } from 'node:fs/promises';
const html = await readFile('index.html', 'utf8');
const required = ['<header', '<main', '<footer', '<h1', 'lang="cs"', 'name="description"'];
const missing = required.filter(token => !html.includes(token));
if (missing.length) {
  console.error(`Missing semantic markers: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('HTML validation passed.');
