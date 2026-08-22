# Preserving the old site's SEO

The rebuild changes every URL on neuroaustin.com. Ranking survives that only if
each old address returns a **301** pointing at its nearest new equivalent.

The map below is **complete against the live Yoast sitemaps** — 33 URLs across
`post-sitemap`, `page-sitemap`, `category-sitemap`, `asp-products-sitemap`, and
`author-sitemap`. It is generated into three config formats plus HTML fallback
stubs from one source list, so the four cannot drift apart.

## Two things need a decision before launch

**1. `/for-patients/patients-medical-records-and-patients-rights/` has no
equivalent on the new site.** It is a real, maintained page — last modified
2026-06-06, the same day as the home page — and the new sitemap has nothing
like it. It currently redirects to `/contact/`, which is a placeholder answer,
not a right one. A medical records and patient rights page is the kind of thing
a practice is usually expected to publish. Options: write the page and point
the redirect at it, or confirm that `/contact/` is where it should land. The
brief says to ask before adding a page, so it is not built.

**2. `/about-us/david-tucker-phd/` is in the redirect map.** The brand document
says that name must never appear anywhere. It appears here as a *path* in the
config files and as a stub folder name, because the URL exists on the live site
and a crawler will keep requesting it. Retiring it with a 301 to `/our-team/`
is the opposite of publishing it — no name is rendered on any page. If you
would rather the URL simply 404, delete that one line from
`scratchpad`-generated configs (`.htaccess`, `_redirects`, `vercel.json`) and
the `about-us/david-tucker-phd/` folder. Same question applies to
`/about-us/greg-allen-phd/` and `/about-us/connie-walker/`, who are also not on
the new team.

## The map

### Posts — retired per the brief, sent to the nearest topic

| Old | New | Why |
| --- | --- | --- |
| `/2018/04/02/what-is-neuropsychology/` | `/neuropsychological-evaluation/` | Direct topic match |
| `/2018/04/02/detecting-autism-in-the-very-young/` | `/neuropsychological-evaluation/` | Autism is on the conditions list |
| `/2018/04/02/head-injuries-may-lead-to-early-alzheimers/` | `/insights/` | Adult topic, no pediatric equivalent |
| `/2021/01/21/every-child-has-a-gift-it-just-has-to-be-discovered/` | `/insights/` | No specific equivalent |
| `/category/articles/` | `/insights/` | |
| `/author/stephaniep/` | `/our-team/` | |

The two posts with a real topic match go to the topic page rather than the blog
index, because that is where the equivalent content now lives. Sending all four
to `/insights/` would be tidier and worth less.

### People

| Old | New |
| --- | --- |
| `/about-us/` | `/our-team/` |
| `/about-us/melissa-bunner-phd/` | `/our-team/` |
| `/about-us/stephanie-paulos-phd/` | `/our-team/` |
| `/about-us/david-tucker-phd/` | `/our-team/` — see decision 2 |
| `/about-us/greg-allen-phd/` | `/our-team/` — not on the new team |
| `/about-us/connie-walker/` | `/our-team/` — not on the new team |

### Patient pages

| Old | New |
| --- | --- |
| `/general-procedures/` | `/the-process/` |
| `/for-patients/what-is-neuropsychology/` | `/neuropsychological-evaluation/` |
| `/for-patients/intervention-services/` | `/intervention-services/` |
| `/for-patients/billing-and-fees/` | `/fees-and-payment/` |
| `/for-patients/forms/` | `/contact/` — intake forms live there |
| `/for-patients/patients-medical-records-and-patients-rights/` | `/contact/` — see decision 1 |
| `/for-patients/links/` | `/` — Links page retired per the brief |
| `/for-patients/` | `/neuropsychological-evaluation/` — section hub, judgment call |
| `/directions/` | `/contact/` |
| `/contact-us/` | `/contact/` |

### The retired checkout plugin

The old site ran WP Invoicing and a Stripe checkout. All ten of those URLs go to
`/fees-and-payment/`, on the grounds that anyone landing on one was trying to
pay: `/wpi-checkout/` and its four children, `/stripe-checkout-result/`,
`/payment-confirmation/`, `/payment-failed/`, `/products/`,
`/asp-products/payment/`. Wildcards cover anything else under those trees.

Worth noting separately: the old site took card payments online. The new site
does not. For a private-pay practice that may be a feature worth keeping — it
is not in the brief, so it is not built.

### Feeds and old sitemaps

`/feed/` and `/comments/feed/` go to `/rss.xml`. `/sitemap_index.xml` and the
five Yoast child sitemaps go to `/sitemap.xml`. These are server-side only — a
stub cannot stand in for an XML file.

## Which config your host reads

| Host | File | Notes |
| --- | --- | --- |
| Apache / cPanel — most likely, given the current WordPress setup | `.htaccess` | Also does HTTPS and www canonicalization, clean URLs, and the 404 document. Must be in the web root. |
| Netlify | `_redirects` | Deploy from `site/`. |
| Vercel | `vercel.json` | May need to sit at the repository root rather than in `site/`, depending on the project's root directory setting. |
| GitHub Pages | none of them | Pages cannot issue a 301. The HTML stubs are the fallback. |

The old-site rules sit at the top of `.htaccess`, above the canonicalization
and clean-URL blocks, so every old URL reaches its destination in **one hop**.
A 301 that lands on another 301 leaks signal.

## The HTML stubs

Thirty-two folders — `about-us/`, `for-patients/`, `wpi-checkout/`, the dated
post paths and the rest — each hold an `index.html` carrying
`noindex, follow`, a canonical pointing at the destination, a zero-second meta
refresh, and a JS fallback. They exist so the old URLs still land somewhere on
a host that cannot issue a 301.

They are a fallback, not the plan. A meta refresh is slower than a 301 and
passes signals less reliably. On Apache the config wins and the stubs are never
served. They are deliberately **not** blocked in `robots.txt`: blocking them
would stop a crawler ever seeing the redirect.

## Before and after cutover

1. **Verify the map is still current.** These sitemaps were read in August 2026.
   Re-check `https://neuroaustin.com/sitemap_index.xml` at cutover in case
   pages were added.
2. **Cross-check against traffic.** Search Console → Performance → Pages, last
   16 months. Anything with impressions that is not in the map above needs a
   rule. Then Links → Top linked pages: an inbound link to a URL that starts
   404ing is the ranking you actually lose.
3. **Test before DNS moves.** `curl -sSI https://neuroaustin.com/about-us/` and
   confirm `HTTP/1.1 301` and the right `location:`. Check a few from each
   group, and confirm no chains.
4. **Submit the new `sitemap.xml`** in Search Console after cutover.
5. **Leave the redirects in place permanently.** A year is the usual advice; the
   cost of keeping them is nothing.
6. **Watch Search Console → Pages** for a spike in "Not found (404)" in the
   first fortnight. Each one is a URL missing from the map.
7. **Keep the old domain's DNS and certificate alive** through the transition.
