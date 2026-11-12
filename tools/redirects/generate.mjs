#!/usr/bin/env node
// Writes site/.htaccess, site/_redirects, site/vercel.json and every HTML stub
// from tools/redirects/redirects.json. Run from anywhere:
//   node tools/redirects/generate.mjs
// Then commit the source list and the generated files together.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const site = join(here, '..', '..', 'site');
const config = JSON.parse(readFileSync(join(here, 'redirects.json'), 'utf8'));
const tpl = name => readFileSync(join(here, 'templates', name), 'utf8');
const files = build(config, { htaccessHead: tpl('htaccess-head.txt'), htaccessTail: tpl('htaccess-tail.txt') });

let stubs = 0;
for (const [rel, body] of Object.entries(files)) {
  const file = join(site, rel);
  if (rel.endsWith('index.html')) {
    if (existsSync(file) && !readFileSync(file, 'utf8').includes('<!-- MOVED-STUB -->') && !process.argv.includes('--replace-pages')) {
      // A real page lives here. Refuse rather than silently overwrite it.
      // Pass --replace-pages when a page is being retired on purpose.
      console.error(`Refusing to overwrite a real page: site/${rel} (use --replace-pages)`);
      process.exitCode = 1;
      continue;
    }
    stubs++;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body);
}
console.log(`Wrote .htaccess, _redirects, vercel.json and ${stubs} stubs.`);
