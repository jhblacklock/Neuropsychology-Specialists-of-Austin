# Preserving the old site's SEO

The rebuild changes every URL on neuroaustin.com. Ranking survives that only if
each old address returns a **301** pointing at its nearest new equivalent, in
one hop.

Everything here is **generated** from one source list,
`../tools/redirects/redirects.json`, by `../tools/redirects/generate.mjs`:
`.htaccess`, `_redirects`, `vercel.json` and 38 HTML fallback stubs. Edit the
list, run the generator, and commit the list and its outputs together. Never
hand-edit an output; the four would drift apart.

```
node tools/redirects/generate.mjs
```

The generator refuses to overwrite a real page with a stub. When a page is
being retired on purpose, pass `--replace-pages`.

## What the map covers

- **32 old WordPress URLs**, complete against the live Yoast sitemaps
  (`post-`, `page-`, `category-`, `asp-products-` and `author-sitemap`).
- **2 prototype `.html` URLs** from before the rebuild.
- **The feeds and the old sitemaps**, server-side only.
- **Wildcards** for anything else under the two checkout-plugin trees and for
  any other dated blog permalink.
- **6 v1 pages** merged into the six-page structure in November 2026. These
  were only ever served from the GitHub Pages preview, never from
  neuroaustin.com, so they carry no search equity. Their rules exist for anyone
  holding a preview link.

## Decisions

**1. Settled: medical records.**
`/for-patients/patients-medical-records-and-patients-rights/` now has an
equivalent: the client supplied the copy, and it is the Medical Records and
Patients' Rights section of Resources. The redirect goes to
`/resources/#medical-records`.

**2. Still open: retired clinicians.** `/about-us/david-tucker-phd/` is in the
map. The brand document says that name must never appear anywhere. It appears
here only as a *path* in the config files and as a stub folder name, because
the URL exists on the live site and a crawler will keep requesting it.
Retiring it with a 301 to `/about/` is the opposite of publishing it — no name
is rendered on any page. If you would rather it simply 404, delete its line
from `redirects.json`, delete the `site/about-us/david-tucker-phd/` folder, and
regenerate. The same question applies to `/about-us/greg-allen-phd/` and
`/about-us/connie-walker/`.

## The map

### v1 pages

| Old | New | Why |
| --- | --- | --- |
| `/neuropsychological-evaluation/` | `/services/` | Became Services |
| `/the-process/` | `/services/#evaluation-process` | Merged into Services |
| `/our-team/` | `/about/#our-experts` | Merged into About |
| `/fees-and-payment/` | `/faqs/#insurance` | Merged into the insurance FAQ |
| `/intervention-services/` | `/faqs/#intervention-services` | Retired: the practice does not provide intervention |
| `/for-referring-providers/` | `/contact/#referrals` | The confirmed referral detail, the fax, is on Contact |

### Old posts, sent to the nearest topic

| Old | New | Why |
| --- | --- | --- |
| `/2018/04/02/what-is-neuropsychology/` | `/services/` | Direct topic match |
| `/2018/04/02/detecting-autism-in-the-very-young/` | `/services/#neuropsychological-evaluations` | Autism evaluation is a core service |
| `/2018/04/02/head-injuries-may-lead-to-early-alzheimers/` | `/services/#neuropsychological-evaluations` | Was `/insights/` for want of a pediatric equivalent; adult brain injury is in scope again |
| `/2021/01/21/every-child-has-a-gift-it-just-has-to-be-discovered/` | `/services/#giftedness` | Was `/insights/`; giftedness is now a service |
| `/category/articles/` | `/insights/` | |
| `/author/stephaniep/` | `/about/#stephanie-paulos` | |

### People

| Old | New |
| --- | --- |
| `/about-us/` | `/about/` |
| `/about-us/melissa-bunner-phd/` | `/about/#melissa-bunner` |
| `/about-us/stephanie-paulos-phd/` | `/about/#stephanie-paulos` |
| `/about-us/david-tucker-phd/` | `/about/` — see decision 2 |
| `/about-us/greg-allen-phd/` | `/about/` — not on the team |
| `/about-us/connie-walker/` | `/about/` — not on the team |

### Patient pages

| Old | New |
| --- | --- |
| `/general-procedures/` | `/services/#evaluation-process` |
| `/for-patients/what-is-neuropsychology/` | `/services/` |
| `/for-patients/intervention-services/` | `/faqs/#intervention-services` |
| `/for-patients/billing-and-fees/` | `/faqs/#insurance` |
| `/for-patients/forms/` | `/contact/#make-an-appointment` — the office sends the paperwork |
| `/for-patients/patients-medical-records-and-patients-rights/` | `/resources/#medical-records` — decision 1 |
| `/for-patients/links/` | `/resources/` — Resources replaces the Links page |
| `/for-patients/` | `/services/` — section hub |
| `/directions/` | `/contact/` |
| `/contact-us/` | `/contact/` |

### The retired checkout plugin

The old site ran WP Invoicing and a Stripe checkout. All ten of those URLs go
to `/faqs/#insurance`, on the grounds that anyone landing on one was trying to
pay: `/wpi-checkout/` and its four children, `/stripe-checkout-result/`,
`/payment-confirmation/`, `/payment-failed/`, `/products/`,
`/asp-products/payment/`. Wildcards cover anything else under those trees.

### Prototype URLs, feeds and old sitemaps

`/fees-and-insurance.html` goes to `/faqs/#insurance`;
`/insights/normal-memory-change-and-what-is-not.html` to `/insights/`, since
there is still no aging content. `/feed/` and `/comments/feed/` go to
`/rss.xml`; `/sitemap_index.xml` and the five Yoast child sitemaps to
`/sitemap.xml`. None of these has a stub: a stub cannot stand in for an XML
file, and a `.html` path cannot be a folder.

## Fragment destinations

27 of the 40 rules, and both plugin wildcards, send the visitor to a
`#fragment`. Browsers keep a fragment from the
`Location` header, so the visitor lands on the right section, and on Services
and FAQs the page script opens that row. Two host details make it work:

- **Apache** escapes `#` to `%23` unless the rule carries `NE`. The generator
  adds `NE` to every rule with a fragment destination.
- **Netlify** serves a file that exists at the source path in preference to a
  redirect, so a stub would win and the visitor would get a meta refresh
  instead of a 301. The generator writes `301!` (forced) for every rule that
  has a stub. On Vercel the stubs never shadow a rule, but two other
  details do matter. `cleanUrls` and `trailingSlash` run before the redirects,
  so `/our-team` has already become `/our-team/`, and `/x.html` has become
  `/x/`, by the time a rule is tried. The generator writes every Vercel source
  in that final form; written without the slash, no rule matches and the stub
  is served instead. And `permanent: true` is a 308 on Vercel, so the rules use
  `statusCode: 301` to match the other two configs.

  One consequence: on Vercel an old URL typed without its trailing slash takes
  two hops (Vercel's 308 to add the slash, then the 301). WordPress published
  every permalink with the slash, so the links that carry ranking take one.

Each stub's canonical drops the fragment (a canonical names a page, not a
section); its refresh and its JS fallback keep it.

## Which config your host reads

| Host | File | Notes |
| --- | --- | --- |
| Apache / cPanel — most likely, given the current WordPress setup | `.htaccess` | Also does HTTPS and www canonicalization, clean URLs, caching and the 404 document. Must be in the web root. |
| Netlify | `_redirects` | Deploy from `site/`. |
| Vercel | `vercel.json` | May need to sit at the repository root rather than in `site/`, depending on the project's root directory setting. |
| GitHub Pages | none of them | Pages cannot issue a 301. The HTML stubs are the fallback. |

The old-site rules sit at the top of `.htaccess`, above the canonicalization
and clean-URL blocks, so every old URL reaches its destination in one hop.

## The HTML stubs

Thirty-eight folders each hold an `index.html` with a canonical pointing at the
destination, a zero-second meta refresh, and a JS fallback. They exist so the
old URLs still land somewhere on a host that cannot issue a 301. They are a
fallback, not the plan: a meta refresh is slower than a 301 and passes signals
less reliably. They are deliberately **not** blocked in `robots.txt`, and they
carry no `noindex`: a `noindex` next to a canonical can be carried over to the
page being consolidated into.

Pre-cutover the stubs are indexable, which is only safe because the staging
build injects a site-wide `noindex` — see the "Keep the staging build out of
search indexes" step in `.github/workflows/pages.yml`. That step turns itself
off as soon as `site/CNAME` exists, so **do not create `site/CNAME` until DNS
actually points at Pages**.

## Before and after cutover

1. **Verify the map is still current.** The sitemaps were read in August 2026.
   Re-check `https://neuroaustin.com/sitemap_index.xml` at cutover in case
   pages were added.
2. **Cross-check against traffic.** Search Console → Performance → Pages, last
   16 months. Anything with impressions that is not in the map needs a rule.
   Then Links → Top linked pages.
3. **Test before DNS moves.** `curl -sSI https://neuroaustin.com/about-us/` and
   confirm `HTTP/1.1 301` and the right `location:`. Check a few from each
   group, confirm no chains, and confirm a fragment survives:
   `curl -sSI …/for-patients/billing-and-fees/` must show
   `location: /faqs/#insurance`, not `%23insurance`.
4. **Submit the new `sitemap.xml`** in Search Console after cutover.
5. **Leave the redirects in place permanently.** The cost of keeping them is
   nothing.
6. **Watch Search Console → Pages** for a spike in "Not found (404)" in the
   first fortnight. Each one is a URL missing from the map.
7. **Keep the old domain's DNS and certificate alive** through the transition.
8. **Copy the two CVs off WordPress first.** About links to them under
   `/wp-content/uploads/`, which disappears with WordPress.
