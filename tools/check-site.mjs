#!/usr/bin/env node
// Site checks. Run from anywhere:
//   node tools/check-site.mjs              dead links, fragments, one h1, heading order,
//                                          title/description length, .html links, banned
//                                          words, retired facts, tel: links, link rel rules,
//                                          CONFIRM count
//   node tools/check-site.mjs --external   also requests every external URL and prints
//                                          its status and final address
// Exits non-zero if any error is found.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { check } from './checks/lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const site = join(here, '..', 'site');
const files = {};
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    const rel = relative(site, p).split('\\').join('/');
    files[rel] = /\.(html|xml|txt|css|json|svg|md)$/.test(name) || name === '.htaccess' || name === '_redirects' ? readFileSync(p, 'utf8') : '';
  }
})(site);

const r = check(files);
for (const e of r.errors) console.log('ERROR  ' + e);
for (const w of r.warnings) console.log('warn   ' + w);
const total = Object.values(r.confirms).reduce((a, b) => a + b, 0);
console.log(`\nCONFIRM markers: ${total}`);
for (const [f, n] of Object.entries(r.confirms)) console.log(`  ${n}  ${f}`);

if (process.argv.includes('--external')) {
  console.log('\nExternal links:');
  for (const url of Object.keys(r.external)) {
    try {
      let res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (res.status >= 400 || res.status === 0) res = await fetch(url, { redirect: 'follow' });
      console.log(`  ${res.status}  ${url}${res.url && res.url !== url ? '  ->  ' + res.url : ''}`);
    } catch (e) {
      console.log(`  ERR  ${url}  (${e.message})`);
    }
  }
  console.log('\nA 403 from a bot-blocking site is not proof of a dead link: open it in a browser.');
}
process.exitCode = r.errors.length ? 1 : 0;
