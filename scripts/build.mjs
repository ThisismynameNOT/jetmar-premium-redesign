import { cp, mkdir, rm } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src/styles.css', 'dist/styles.css');
await mkdir('dist/assets', { recursive: true });
await cp('public/assets', 'dist/assets', { recursive: true });

await cp('public/robots.txt', 'dist/robots.txt');
await cp('public/sitemap.xml', 'dist/sitemap.xml');
