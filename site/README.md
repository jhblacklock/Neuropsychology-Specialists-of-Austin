# Neuropsychology Specialists of Austin — website

Static HTML and CSS. No build step, no dependencies, no JavaScript framework.
Upload the contents of this folder to any static host and it works.

Built from `../project/Brand Document.dc.html` (the system of record),
`../project/WEBSITE HANDOFF.md`, and the `BUILD BRIEF.md` in
`../project/uploads/`. Design values are read out of the brand document rather
than reinterpreted; the two content departures from it are listed below.

**Scope: pediatric.** The site presents the practice as serving children and
adolescents only. **Payment: private pay.** The practice does not bill
insurance and does not issue superbills. Both were directed after the brand
document was approved, and both contradict the source material — see
"Departures from the approved brief".

## Files

```
index.html                              Home
neuropsychological-evaluation/          Evaluation
intervention-services/                  The five programs
the-process/                            Consultation, testing, feedback
our-team/                               The two clinicians
fees-and-payment/                       Published rates, private pay
for-referring-providers/                Referral information
contact/                                Address, map, hours, forms
insights/                               Blog index, filterable by category
insights/school-evaluation-and-neuropsychological-evaluation/   Sample post
insights/post-template/                 Copy-me template (noindex, not in sitemap)
404.html                                Lists every page
about-us/ for-patients/ wpi-checkout/   Meta-refresh stubs for the old URLs
2018/ 2021/ category/ author/ …         (32 of them — see REDIRECTS.md)
assets/css/site.css                     The whole design system
assets/logo/*.svg                       The three supplied marks, unmodified
.htaccess  _redirects  vercel.json      301s — see REDIRECTS.md
rss.xml  sitemap.xml  robots.txt
```

Every page is a folder with an `index.html`, so URLs are clean —
`/our-team/`, not `/our-team.html` — on any host, with no server configuration
required. Internal links are document-relative, so the site also works from a
subdirectory or off the filesystem. The exception is `404.html`, whose links
are root-relative because it is served from arbitrary paths; that page assumes
deployment at a domain root.

Each page carries the header, nav, and footer inline. There is no build step to
stamp them, so a change to the chrome is a find-and-replace across the eleven
pages.

## Adding a post

1. Copy `insights/post-template/`, rename the folder to the post slug, replace
   every `TODO`.
2. Add a card to `insights/index.html`, newest first, with `data-category`
   matching one of the four fixed categories.
3. Add an `<item>` to `rss.xml` and a `<url>` to `sitemap.xml`.
4. If a category now has three or more posts, uncomment the related-posts block
   in the post and fill it in. Fewer than three: show none.

The home page's Insights module is a single `<section>` marked with comments.
Delete it and nothing else breaks.

## Departures from the approved brief

Two content decisions came in after the brand document was signed off, and both
override published source material. Flagging them because someone will
eventually diff this against the brief and wonder.

- **Pediatric only.** The brief and the brand document describe a practice
  serving children *and* adults. Adult conditions (Alzheimer's, Parkinson's,
  MS, dementia, MCI, stroke as a standalone), the "who should be evaluated —
  adults" content, adult referral questions, and return-to-work language are
  all cut. Dr. Bunner's published biography says she "assesses children and
  adults"; this site says children and adolescents, marked `CONFIRM`. The
  brand document's fixed category set loses **Adults & Aging**, leaving four.
- **Private pay, no superbill.** The brief's insurance content — "many carriers
  cover neuropsychological evaluations", "generally covered by most plans with
  a medical diagnosis of acquired brain injury", the referral and authorization
  sections — is gone. The page is now Fees & Payment. It states that the
  practice is not in network with any carrier, does not submit claims, and does
  not provide superbills or claim documentation.

## Design decisions taken while building

These extend the brand document rather than contradict it.

- **Gold is never used for text below 24px.** Gold on paper measures 3.2:1,
  which passes AA for large type only. Eyebrows, labels, and links are
  therefore charcoal or slate; gold does the signalling as hairline rules,
  italic display type at 24px and up, and the mark. The brand document sets
  gold eyebrows on its own artboards; on a site that has to clear AA, that does
  not carry over.
- **Gold text never sits on a Shell field.** Gold on Shell is 2.9:1, under the
  3:1 large-type floor. The home page's process module moved onto paper with a
  hairline for that reason.
- **Footer meta uses Mist, not Ash.** Ash on charcoal is 4.2:1, under AA for
  body-size text. Mist is 5.7:1.
- **The header logo is the mark plus the wordmark, without the caps line.** The
  document floors the full lockup at 88px of mark because the eyebrow line
  stops being readable below that. The compact header form drops that line
  rather than shrinking it, which is the rule the document states for small
  sizes. The full lockup with "of Austin" appears in the footer.
- **Photo slots are greeked.** Section 07's striped field with a monospace note
  naming the shot marks each frame: testing room on the home page, clinician
  headshots on Our Team and post bylines, building exterior on Contact. Every
  layout still reads as finished if the slots are deleted rather than filled.
  Search the CSS for `.placeholder` to find them all.
- **Nav collapses to a drawer below 1024px, not below 768px.** Eight top-level
  items do not fit on one row at tablet width. The grid still goes 12-column at
  768 as specified.
- **"Few board-certified neuropsychologists in Austin" is not published.** The
  brief states it, but it is an unverifiable comparative claim. The home page
  says instead that board certification is not required to practice in Texas
  and explains what ABPP certification takes, which is checkable.

## SEO

- **Redirects are the whole ballgame** on a rebuild that changes every URL.
  The map is complete against the live Yoast sitemaps — all 33 old URLs, each
  with a rule in `.htaccess`, `_redirects`, and `vercel.json`, plus an HTML
  fallback stub. All three configs and the stubs are generated from one source
  list so they cannot drift. `REDIRECTS.md` has the full table, the reasoning
  per destination, and the cutover checklist. **Two entries there need your
  decision before launch.**
- **Clean URLs**, canonical on every page, `https` and non-`www` enforced in
  `.htaccess`.
- **Titles and descriptions** are written for the pediatric queries the brief
  named — "neuropsychological evaluation Austin", "ADHD testing Austin" — plus
  the ones the fee transparency can actually win, like the cost of a pediatric
  evaluation in Austin.
- **Structured data**: `MedicalBusiness` with the address on Home, Fees, and
  Contact; `BlogPosting` on the post; `FAQPage` on Fees, covering insurance,
  cost, and testing duration. Every schema answer is a verbatim claim from the
  visible page.
- **`openingHours` is deliberately absent** from the schema. The hours came
  from a third-party directory, not the practice. Structured data cannot carry
  a `CONFIRM` marker, so the field waits. The "no referral needed" answer is
  left out of the FAQ schema for the same reason.
- **404 lists every page** rather than bouncing to the home page.
- `sitemap.xml`, `robots.txt`, and `rss.xml` all use the clean URLs. The post
  template is excluded from both the sitemap and search indexes.

## Outstanding — must be resolved before launch

Everything below appears on the site inside a bordered `CONFIRM` marker, so it
is visible in the page, not buried here. 35 markers across the site.

| Item | Working assumption | Where |
| --- | --- | --- |
| Report turnaround | Three to four weeks from testing to written report | Home, The Process, Referring Providers |
| No referral needed | Follows from private pay, but not confirmed by the practice | Fees & Payment |
| Referral intake | Fax to 737-215-8710; no portal or referral email | Referring Providers |
| Provider line | None that bypasses patient intake | Referring Providers |
| Clinician phone consult | Available on request after report delivery | Referring Providers |
| Referral questions declined | Unknown — the list is not published | Referring Providers |
| Age range | Children and adolescents; coaching extends to young adults | Evaluation |
| Bunner's biography | Trimmed to pediatric scope; source says "children and adults" | Our Team |
| Bunner's experience | "Over 20 years" per neuroaustin.com; the brief says 10+ | Our Team |
| Office hours | Mon–Fri 8:30am–5:00pm, from a directory listing | Footer, Contact |
| Parking | Nothing known; the block is reserved and empty | Contact |
| Headshots | Commissioned, not delivered | Our Team, post byline |
| Family therapy fee | Not in the published rate list | Intervention Services |
| JotForm link | The live intake form URL is not in the handoff | Contact |

Also outstanding, and not marked in the page because they are technical:

- **A page with no equivalent.** The old site's
  `/for-patients/patients-medical-records-and-patients-rights/` is live and
  maintained, and nothing on the new site corresponds to it. It currently
  redirects to `/contact/` as a placeholder. Write the page, or confirm that
  destination. Details in `REDIRECTS.md`.
- **Three retired clinicians in the redirect map**, including the one the brand
  document says must never appear. They are paths in config files, not rendered
  copy, and a 301 retires the URL — but it is your call. `REDIRECTS.md`
  explains how to drop them.
- **The old site took card payments online** through WP Invoicing and Stripe.
  The new site does not. Not in the brief, so not built, but worth a decision
  for a private-pay practice.
- **`og:image`.** No OpenGraph image exists yet — the commissioned photography
  has not been delivered and there is no brand OG card. Each page carries a
  commented placeholder in `<head>`.
- **Citation links in the sample post.** The three sources are named in full
  but not linked: no outbound network access here, and the editorial standard
  forbids publishing a citation that has not been checked.
- **Fonts load from Google Fonts.** Self-host them if you would rather not have
  a third-party request on a healthcare site.
- **The Contact page embeds Google Maps** in a lazy-loaded iframe, as the brief
  asks. It is a third-party embed; if that matters for your cookie posture,
  replace it with the static address block and the "Open in Google Maps" link
  that already sit beside it.
- **GitHub Pages preview caveat.** Pages cannot issue 301s, and it serves this
  site from a subdirectory, so the redirect configs are inert there and
  `404.html`'s root-relative links will not resolve. Both are correct for
  neuroaustin.com.

## Checks that were run

- Every internal link and image resolves. No dead links.
- One `<h1>` per page, no skipped heading levels.
- `tel:` link on every page, in the utility bar and in the closing block.
- Per-page `<title>` and meta description, all within length.
- Banned words absent: journey, empower, holistic, cutting-edge, state of the
  art, passionate, dedicated team, comprehensive suite, trusted partner.
- Retired facts absent: "Austin Neuropsychology", 711 W 38th, the temp domain,
  David Tucker, "75+ years".
- Adult-scope terms absent site-wide, now that the scope is pediatric.
- Home page transfer set is 45KB before gzip: 17KB HTML, 24KB CSS, 3.5KB SVG.
  Budget is 500KB.
- Contrast: charcoal on paper 10.6:1, slate on paper 5.1:1, slate on shell
  4.8:1, mist on charcoal 5.7:1, gold-lift on charcoal 4.4:1. Gold text appears
  only at 24px and up on paper (3.2:1, AA large).

Not run: rendering in a browser. The handoff asks that the designs not be
screenshotted, so layout was built from the stated dimensions rather than
verified visually. Worth a pass at 375, 768, and 1440 before launch.
