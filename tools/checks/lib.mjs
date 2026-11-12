// Pure function: { 'relative/path': contents } in, report out. No imports, so
// check-site.mjs and any other runner can share it.
export function check(files) {
  const out = { errors: [], warnings: [], confirms: {}, external: {}, stats: {} };
  const isStub = h => h.includes('<!-- MOVED-STUB -->');
  const pages = Object.keys(files).filter(f => f.endsWith('.html') && !isStub(files[f]));
  const noindex = f => f === '404.html' || f.startsWith('insights/post-template/');
  const BANNED = ['journey', 'empower', 'holistic', 'cutting-edge', 'state of the art', 'passionate', 'dedicated team', 'comprehensive suite', 'trusted partner'];
  // "Austin Neuropsychology" is the practice's history and is allowed inside #our-story only.
  const RETIRED = [/Austin Neuropsychology\b/, /711 W\.? 38th/i, /David Tucker/i, /75\+ years/i, /Texas Psychological Association/, /\bTPA\b/];
  // Cogmed: the working-memory post names it on purpose; the Resources referral
  // list and Dr. Paulos's bio (marked CONFIRM) are reported as warnings so they stay visible.
  const COGMED_OK = ['insights/what-working-memory-training-is-for/index.html'];
  const visible = h => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  const idCache = {};
  const ids = f => idCache[f] || (idCache[f] = new Set([...files[f].matchAll(/\sid="([^"]+)"/g)].map(m => m[1])));
  const resolve = (from, href) => {
    const [path, frag] = href.split('#');
    let target;
    if (path === '') target = from;
    else if (path.startsWith('/')) target = path.slice(1);
    else {
      const stack = [];
      for (const p of (from.slice(0, from.lastIndexOf('/') + 1) + path).split('/')) { if (p === '..') stack.pop(); else if (p !== '.') stack.push(p); }
      target = stack.join('/');
    }
    if (target === '' || target.endsWith('/')) target += 'index.html';
    return [target, frag];
  };
  for (const f of pages) {
    const h = files[f];
    const main = (h.match(/<main[\s\S]*<\/main>/) || [''])[0];
    for (const m of h.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      const url = m[1].replace(/&amp;/g, '&');
      if (/^https?:/.test(url)) {
        if (!/^https:\/\/neuroaustin\.com\//.test(url) || url.includes('/wp-content/')) (out.external[url] = out.external[url] || new Set()).add(f);
        continue;
      }
      if (/^(mailto:|tel:)/.test(url) || url.includes('TODO')) continue;
      if (/\.html(#|$)/.test(url)) out.errors.push(`${f}: .html link ${url}`);
      const [t, frag] = resolve(f, url);
      if (!(t in files)) { out.errors.push(`${f}: dead link ${url}`); continue; }
      if (frag && !ids(t).has(frag)) out.errors.push(`${f}: missing fragment ${url}`);
    }
    const hs = [...h.matchAll(/<h([1-6])\b/g)].map(m => +m[1]);
    const h1 = hs.filter(x => x === 1).length;
    if (h1 !== 1) out.errors.push(`${f}: ${h1} h1`);
    for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) out.errors.push(`${f}: heading h${hs[i - 1]} -> h${hs[i]}`);
    if (!noindex(f)) {
      const t = ((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/&amp;/g, '&');
      const d = ((h.match(/name="description" content="([^"]*)"/) || [])[1] || '').replace(/&amp;/g, '&');
      if (t.length > 60) out.errors.push(`${f}: title ${t.length} chars`);
      if (d.length > 155 || d.length < 50) out.errors.push(`${f}: description ${d.length} chars`);
      out.stats[f] = { title: t.length, description: d.length };
      const internal = new Set([...main.matchAll(/href="([^"]+)"/g)].map(m => m[1]).filter(u => !/^(https?:|mailto:|tel:|#)/.test(u)));
      if (internal.size < 3) out.errors.push(`${f}: only ${internal.size} in-context internal links`);
    }
    // Banned words apply to our copy. A <blockquote> is a client review, quoted exactly.
    const text = visible(h.replace(/<blockquote[\s\S]*?<\/blockquote>/g, ' ')).toLowerCase();
    for (const w of BANNED) if (text.includes(w)) out.errors.push(`${f}: banned word "${w}"`);
    const outsideStory = visible(h.replace(/<section[^>]*id="our-story"[\s\S]*?<\/section>/, ''));
    for (const re of RETIRED) if (re.test(outsideStory)) out.errors.push(`${f}: retired fact ${re}`);
    if (text.includes('cogmed') && !COGMED_OK.includes(f)) out.warnings.push(`${f}: mentions Cogmed`);
    if (!h.includes('href="tel:')) out.errors.push(`${f}: no tel: link`);
    const c = (h.match(/class="confirm"/g) || []).length;
    if (c) out.confirms[f] = c;
    for (const m of h.matchAll(/<a\s([^>]*href="https?:[^"]+"[^>]*)>/g)) {
      const a = m[1], href = a.match(/href="([^"]+)"/)[1];
      if (/^https:\/\/neuroaustin\.com\//.test(href) && !href.includes('/wp-content/')) continue;
      if (!/rel="[^"]*noopener/.test(a)) out.errors.push(`${f}: external link without noopener ${href}`);
      if (/target="_blank"/.test(a) && !/\.(pdf|docx?)$/i.test(href)) out.warnings.push(`${f}: new tab on a non-document link ${href}`);
      if (/nofollow/.test(a) !== href.includes('carecredit.com')) out.errors.push(`${f}: nofollow belongs on the CareCredit link only (${href})`);
    }
    for (const m of h.matchAll(/<img\s[^>]*>/g)) {
      if (!m[0].includes('assets/images/')) continue;
      for (const a of ['width', 'height', 'loading', 'alt']) if (!new RegExp('\\s' + a + '="').test(m[0])) out.errors.push(`${f}: photo without ${a}`);
    }
    if (/[A-Z]{3,}_[A-Z_]*URL/.test(h)) out.errors.push(`${f}: unresolved URL placeholder`);
  }
  out.external = Object.fromEntries(Object.entries(out.external).sort().map(([k, v]) => [k, [...v]]));
  return out;
}
