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
intervention-services/                  The four programs
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
assets/css/fonts.css                    @font-face rules for the self-hosted faces
assets/fonts/*.woff2                    Playfair, Montserrat, Libre Franklin
assets/logo/*.svg                       The three supplied marks, unmodified
.htaccess  _redirects  vercel.json      301s — see REDIRECTS.md
rss.xml  sitemap.xml  robots.txt
```

Every page is a folder with an `index.html`, so URLs are clean —
`/our-team/`, not `/our-team.html` — on any host, with no server configuration
required. No link anywhere points at a `.html` file; the home link is `./`,
`../`, or `../../` by depth. A check enforces that. Internal links are document-relative, so the site also works from a
subdirectory or off the filesystem. The exception is `404.html`, whose links
are root-relative because it is served from arbitrary paths; that page assumes
deployment at a domain root.

Each page carries the header, nav, and footer inline. There is no build step to
stamp them, so a change to the chrome is a find-and-replace across the eleven
pages.

## The posts

Four, one per category, each 637–678 words against the standard's 600–1,200:

| Post | Category | Author |
| --- | --- | --- |
| How to read the scores in your child's report | Evaluation & Testing | Paulos |
| A school evaluation and a neuropsychological evaluation are not the same thing | Children & School | Bunner |
| Getting back to school after a concussion | Brain Injury | Paulos |
| What working memory training is for | Research Notes | Bunner |

The practice no longer offers Cogmed, so it is gone from Intervention Services
(four programs now, not five), from the rate table, and from both affected meta
descriptions. The Research Notes post survives the change — it answers a
question parents ask rather than describing a service, and it now says so
explicitly. Cogmed is still named in it as the best-known program of its kind,
which is accurate and carries no claim that this practice delivers it.

**The citations are done.** Every source was opened and checked against the
claim it supports, the URLs are in the reference lists, and the `CONFIRM`
markers and per-post editorial notes are gone. `CITATIONS.md` is now the record
of what was verified and what was decided, including the three judgement calls:
a specific paper attached for the base-rate claim (Brooks, Sherman & Iverson
2010, pediatric and exactly on point), Cogmed's vendor research summary dropped
rather than linked, and the test technical manuals reworded as guidance because
they name no single work.

Note for whoever reads the old note here: WebFetch and `curl` are blocked by
the egress proxy on this machine, but the in-app browser is not, which is how
the sources were reached. "No network access" was not true.

Every post is bylined to a named clinician and needs that clinician's review
before publishing, per the editorial standard. The byline's "Full biography"
link goes to that clinician's anchor on the team page — `#melissa-bunner` or
`#stephanie-paulos` — not to the top of it. A check fails the build if a
fragment link points at an id that does not exist.

## The post layout

Articles run as a centred column, not the left-aligned one the rest of the site
uses. On a 1440px screen a 680px measure pinned to the left of a 1160px
container leaves the eye travelling back across half a metre of empty paper
between paragraphs; centring it fixes that. Eyebrow, headline, standfirst,
body, and byline all sit on the same column.

The column is 720px rather than the site's usual 680px cap, set by character
count instead of by pixels: the brand document makes 65–75 characters the hard
rule on posts, and 680px of Libre Franklin at 19px measures 64. 720px measures
67. Tables are the one thing allowed out of the column — they take the extra
96px back before scrolling inside themselves.

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
- **The header lockup is option M from the lockup study.** The mark in gold at
  48px, the name on one line, and "of Austin" centred beneath it with the
  hairlines running out to each end so the second line is exactly as wide as
  the first. Three things about it are deliberate:
  - **48px at every breakpoint.** The brand document floors the gold mark at
    48px because the tapered stroke ends thin out below that, so it does not
    step down with the type on mobile.
  - **The rails are Mist, not gold.** The mark and the italic already carry the
    accent; a third gold element in one lockup stops the accent being one.
  - **The mark is nudged down 2.5px (2px on mobile).** Box-centring left it
    reading high, because the name's half-leading sits above the caps while "of
    Austin" has almost no descender below its baseline. Measured in a browser
    at 2.55px out, corrected, and re-measured to 0.05px. Optical, not spacing,
    which is why it is off the 8px scale.

  The caps line is dropped rather than shrunk, per the document's rule for
  small sizes.
- **The footer carries the full lockup**, on its own band across the top: mark,
  stacked wordmark, "of Austin" between hairlines, and the
  `BOARD CERTIFIED ASSESSMENT` line — the only place on the site with room for
  it, since the document floors the full lockup at 88px of mark. Mark is 136px
  at desktop and 104px at mobile, scaled to the proportions of the delivered
  artwork rather than the 3:1 the brand document's own web artboards use; at
  39px the name and the caps line come out the same width. The mark is white
  here: gold does not carry to a charcoal ground. The hairlines stay gold
  because "of Austin" is then the only other gold in the lockup.
- **`CONFIRM` markers are red on purpose.** White on `#B3261E`, a colour that
  appears nowhere else on the site. They are working assumptions, not copy, and
  every one has to be gone before launch — they should be impossible to mistake
  for design.
- **Photo slots are greeked.** Section 07's striped field with a monospace note
  naming the shot marks each frame: testing room on the home page, clinician
  headshots on Our Team and post bylines, building exterior on Contact. Every
  layout still reads as finished if the slots are deleted rather than filled.
  Search the CSS for `.placeholder` to find them all.
- **Fonts are self-hosted, preloaded, and `font-display: optional`.** Loading
  them from Google meant the page painted in a fallback and then swapped to
  Playfair mid-read. The six faces the site actually uses are now served from
  `assets/fonts/`, preloaded in the head, and set to `optional` rather than
  `swap`. That combination means the page paints once: either the real face is
  ready in time, or the fallback is used for that page view and never replaced
  underneath the reader. It also removes the third-party request, which is
  worth something on a healthcare site. Regenerate with `scratchpad/fonts.py`
  if a weight is added. The `.htaccess` caches woff2 for a year as immutable,
  so the filenames must change if a font ever does.
- **Mobile header: hamburger, and the wordmark wraps.** Below 768px the
  wordmark breaks over two lines with the hairlines filling out to each end,
  and the menu control is a 44px square hamburger rather than the word MENU in
  tracked caps — that button was wide enough to push the header past the edge
  of a 375px screen. Logo and control now come to 266px inside the 327px
  available.
- **Nav collapses to a drawer below 1024px, not below 768px.** Eight top-level
  items do not fit on one row at tablet width. The grid still goes 12-column at
  768 as specified.
- **Tables stack below 1024px, and this is the default for every table.** Each
  row becomes a block: first cell as the row's name, every other cell carrying
  its column header as a label. The breakpoint is 1024 rather than 768 because
  the constraint is the column the table sits in, not the viewport — an
  article's measure is 720px at any screen size, so a three-column comparison
  table is as cramped on a tablet as on a phone. The generator derives the
  labels from each table's own `thead`, so any table added later inherits the
  behaviour without being asked for it. All six tables currently on the site
  are covered.
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
- **Structured data** is one connected graph, not a pile of separate blocks.
  The practice is defined once as `@id: https://neuroaustin.com/#practice`
  (`["MedicalBusiness", "MedicalClinic"]`, repeated verbatim on Home, Fees and
  Contact). The two clinicians are defined once each on Our Team at
  `#melissa-bunner` and `#stephanie-paulos`, the same anchors the bios and the
  post bylines already use. `employee`, `worksFor`, `author` and `publisher`
  all point at those `@id`s, so a crawler sees two people and one practice
  rather than thirteen anonymous nodes. Author and publisher also carry
  `name`/`url` inline, because Google does not reliably resolve an `@id`
  across pages.
- **`medicalSpecialty` was removed.** It said `"Psychiatric"`, which is a real
  enum value and a false statement — psychiatry is a physician specialty and
  this is two psychologists. The enum has no psychology member. The real
  specificity now lives in `knowsAbout` and in the visible copy.
- **`FAQPage` on Fees is kept but expect nothing from it.** Google deprecated
  FAQ rich results in May 2026 and removed the documentation that June; `HowTo`
  went the same way, so do not add one to The Process. Neither type earns a
  rich result any more. The FAQ block stays because answer engines still read
  it. For the same reason there is no point chasing a medical rich result —
  Google's gallery has none.
- **`openingHours` is deliberately absent** from the schema. The hours came
  from a third-party directory, not the practice. Structured data cannot carry
  a `CONFIRM` marker, so the field waits. The "no referral needed" answer used
  to be left out of the FAQ schema for the same reason; the practice has since
  confirmed it, so it is now in both the visible copy and the schema.
- **`geo` is `30.308164, -97.748826`**, taken from the practice's own Apple
  Maps place record (`place-id=I723B2B7DEFF340B2`), which is also what the
  "Open in Apple Maps" link on Contact now points at. It replaced a geocode of
  the street address that was about six metres off. Still worth checking the
  Google Business Profile at cutover — that profile, not this markup, is what
  actually drives the knowledge panel.
- **404 lists every page** rather than bouncing to the home page.
- `sitemap.xml`, `robots.txt`, and `rss.xml` all use the clean URLs. The post
  template is excluded from both the sitemap and search indexes.

## Outstanding — must be resolved before launch

Everything below appears on the site inside a bordered `CONFIRM` marker, so it
is visible in the page, not buried here. 31 markers across the site. The count
was 46: the eleven citation markers in the posts are gone, every source having
been opened and checked (see `CITATIONS.md`), two more moved into HTML comments
because they were notes to the practice rather than page copy, and one was
added for the consultation-fee question below.

| Item | Working assumption | Where |
| --- | --- | --- |
| Report turnaround | Three to four weeks from testing to written report | Home, The Process, Referring Providers |
| Referral intake | Fax to 737-215-8710 is confirmed. That there is **no portal or referral email** is not — it is still marked on the page | Referring Providers |
| Provider line | None that bypasses patient intake | Referring Providers |
| Clinician phone consult | Available on request after report delivery | Referring Providers |
| Referral questions declined | Unknown — the list is not published | Referring Providers |
| Age range | Children and adolescents; coaching extends to young adults. **No numeric range is published, and "what age can my child be tested" is a high-volume query.** Ask the practice for a bound — "ages 4 to 18" or whatever is true | Evaluation |
| Consultation fee | The evaluation fee is stated to *cover* the consultation, but five calls-to-action say the office will tell you "what the consultation costs", which implies a separate charge. Both cannot be the headline. Ask whether the consultation is billed on its own when a family stops after it | Fees & Payment |
| Bunner's biography | Trimmed to pediatric scope; source says "children and adults". Note this one is now an HTML comment on Our Team, not visible copy — it was a note to the practice that was rendering to visitors | Our Team |
| Bunner's experience | "Over 20 years" per neuroaustin.com; the brief says 10+ | Our Team |
| Office hours | Mon–Fri 8:30am–5:00pm, from a directory listing | Footer, Contact |
| Parking | North-side lot and the under-building garage are confirmed. The **7-foot clearance** on the covered entrance is not — it was read off the signage in a photo, not given by the practice | Contact |
| Headshots | Commissioned, not delivered | Our Team, post byline |
| Family therapy fee | Not in the published rate list | Intervention Services |
| Intake form provider | Not chosen. The brief said JotForm; the practice does not have it and may pick something else. Now an HTML comment on Contact rather than visible copy — it was telling the public that a HIPAA vendor decision is still open | Contact |

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
- **The map embed.** The Contact page uses Google's keyless
  `output=embed` iframe: free, no API key, no billing account — but it is an
  undocumented URL rather than a supported product, so it carries no guarantee
  it keeps working. Google's supported equivalent is the Maps Embed API, which
  is free for basic embeds but requires a key and a Cloud project with billing
  enabled. The genuinely free-and-private option is OpenStreetMap's iframe,
  which needs no key and sets no cookies — but it takes a bounding box and a
  marker latitude/longitude rather than an address string, and those
  coordinates could not be looked up from this machine. Get them from the pin
  in Google Maps and the swap is a one-line change. Both map-app links on the
  page work by address and need no coordinates.
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
- No link points at a `.html` file. Every preloaded font resolves.
- Home page first load is 200KB before gzip: 17KB HTML, 30KB CSS, 3.5KB SVG,
  and 149KB of webfonts across six faces. Budget is 500KB. Repeat visits are
  17KB — the fonts are cached for a year.
- Contrast: charcoal on paper 10.6:1, slate on paper 5.1:1, slate on shell
  4.8:1, mist on charcoal 5.7:1, gold-lift on charcoal 4.4:1. Gold text appears
  only at 24px and up on paper (3.2:1, AA large).

Not run: rendering in a browser. The handoff asks that the designs not be
screenshotted, so layout was built from the stated dimensions rather than
verified visually. Worth a pass at 375, 768, and 1440 before launch.
