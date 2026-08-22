# Preserving the old site's SEO

The rebuild changes every URL on neuroaustin.com. Ranking survives that only if
each old address returns a **301** pointing at its nearest new equivalent. This
file is the procedure and the current state of the map.

## What is already mapped

Three old URLs are confirmed, because they appear in the project handoff:

| Old | New |
| --- | --- |
| `/about-us/melissa-bunner-phd/` | `/our-team/` |
| `/about-us/stephanie-paulos-phd/` | `/our-team/` |
| `/about-us/` | `/our-team/` |

A further set is **guessed** from ordinary WordPress conventions —
`/contact-us/`, `/services/`, `/fees/`, `/links/`, `/blog/*`, dated permalinks.
They are marked as guesses in each config file. A rule for a path that never
existed does nothing; a missing rule loses a ranking. Verify them, delete the
ones that never existed, and add the ones that did.

## Building the rest of the map

The full list could not be built here: this site was assembled on a machine
with no outbound network access, so neuroaustin.com could not be crawled. Do
this before launch.

1. **Get every indexed URL.** In Google Search Console, Indexing → Pages →
   Export. Also fetch `https://neuroaustin.com/sitemap.xml` (WordPress and
   Yoast both publish one) and `https://neuroaustin.com/wp-sitemap.xml`.
2. **Get every URL with traffic or links.** Search Console → Performance →
   Pages, last 16 months, export. Anything with impressions is worth a rule.
   Then Links → Top linked pages: an inbound link to a URL that starts 404ing
   is the ranking you actually lose.
3. **Map each one to its nearest equivalent.** Nearest, not the home page. A
   page with no equivalent should 404 or 410 rather than redirect — a pile of
   unrelated redirects to `/` is read as a soft 404 and passes nothing.
4. **Add the rules** to whichever config your host reads (below), keeping
   confirmed rules above guessed ones.
5. **Test before cutover** with `curl -sSI https://neuroaustin.com/old-path/`
   and confirm `HTTP/1.1 301` plus the right `location:`. Chained redirects
   (301 → 301 → 200) leak; point every rule straight at the final URL.

## Which config your host reads

| Host | File | Notes |
| --- | --- | --- |
| Apache / cPanel — most likely, given the current WordPress setup | `.htaccess` | Also does HTTPS and www canonicalization, clean URLs, and the 404 document. Must be in the web root. |
| Netlify | `_redirects` | Deploy from `site/`. |
| Vercel | `vercel.json` | May need to sit at the repository root rather than in `site/`, depending on how the project's root directory is set. |
| GitHub Pages | none of them | Pages cannot issue a 301. The HTML stubs below are the fallback. |

## The HTML stubs

`about-us/index.html` and the two clinician paths under it are meta-refresh
stubs: `noindex, follow`, a canonical pointing at `/our-team/`, and a JS
fallback. They exist so the known URLs still land somewhere on a host that
cannot issue a 301.

They are a fallback, not the plan. A meta refresh is slower than a 301 and
passes signals less reliably. If the host can do server-side redirects, the
config file wins and the stubs are never served.

## After cutover

- Submit the new `sitemap.xml` in Search Console.
- Leave the redirects in place permanently. A year is the usual advice; the
  cost of keeping them is nothing.
- Watch Search Console → Pages for a spike in "Not found (404)" in the first
  fortnight. Each one is a URL missing from the map.
- Keep the old domain's DNS and certificate alive through the transition.
