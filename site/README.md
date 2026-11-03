# Neuropsychology Specialists of Austin — website

Static HTML and CSS. No build step, no dependencies, no JavaScript framework.
Upload the contents of this folder to any static host and it works.

Built from `../project/Brand Document.dc.html` (the system of record),
`../project/WEBSITE HANDOFF.md`, the `BUILD BRIEF.md` in `../project/uploads/`,
and, from v2, the client's "Website Text" document (its "New Outline and Text"
section only). Design values are read out of the brand document rather than
reinterpreted. Page copy is the client's, as written, apart from the swaps
listed in the v2 pull request.

**Scope: ages 3 through adulthood.** The client copy says so, and its FAQ sets
the detail: the clinic specializes in children and adolescents, and both
doctors assess adults for learning differences and neurodivergence, brain
injury (Dr. Paulos) and forensic cases or IMEs (Dr. Bunner). **Payment:
self-pay, $3,850 typical, superbill provided, CareCredit accepted.** Both
reverse v1 departures; see "Departures from the approved brief".

## Files

```
index.html                              Home
about/                                  Who we are, credentials, our story, our experts
services/                               What an evaluation covers, the process, the five core services
faqs/                                   Twelve questions, each a deep-linkable row
resources/                              Referral partners, guides, medical records and patients' rights
contact/                                Address, map, hours, parking, appointments, referrals
insights/                               Blog index, filterable by category
insights/<four posts>/
insights/post-template/                 Copy-me template (noindex, not in sitemap)
404.html                                Lists every page
neuropsychological-evaluation/ the-process/ our-team/ fees-and-payment/
intervention-services/ for-referring-providers/
                                        v1 pages, now redirect stubs
about-us/ for-patients/ wpi-checkout/ 2018/ 2021/ category/ author/ …
                                        Stubs for the old WordPress URLs
assets/css/site.css                     The whole design system
assets/css/fonts.css                    @font-face rules for the self-hosted faces
assets/fonts/*.woff2                    Playfair, Montserrat, Libre Franklin
assets/logo/*.svg                       The three supplied marks, unmodified
.htaccess  _redirects  vercel.json      301s, GENERATED (see REDIRECTS.md)
rss.xml  sitemap.xml  robots.txt

../tools/redirects/redirects.json       The one source list for every redirect
../tools/redirects/generate.mjs         Writes the three configs and all 38 stubs
../tools/check-site.mjs                 The checks listed at the end of this file
../tools/preview/widths.html            Dev-only width preview, not deployed
```

Every page is a folder with an `index.html`, so URLs are clean — `/about/`,
not `/about.html` — on any host, with no server configuration required. No link
anywhere points at a `.html` file; the home link is `./`, `../`, or `../../` by
depth. A check enforces that. Internal links are document-relative, so the site
also works from a subdirectory. A file preview, or a page opened from disk,
does not turn `about/` into `about/index.html`, so each page ends with a short
script that does, only when the page itself was opened by its file name. It
never fires on a real host, and the source keeps clean URLs. The exception is
`404.html`, whose links are root-relative because it is served from arbitrary
paths; that page assumes deployment at a domain root.

Each page carries the header, nav, and footer inline. There is no build step to
stamp them, so a change to the chrome is a find-and-replace across the thirteen
pages (six main pages, the Insights index, four posts, the template, 404).

## Navigation

Six items, no dropdowns at any breakpoint: Home, About, Services, FAQs,
Resources, Contact. What used to be sub-pages are sections with stable ids:

| Old sub-page | Now |
| --- | --- |
| Our Story, Our Experts | `/about/#our-story`, `/about/#our-experts`; each doctor keeps `#melissa-bunner` / `#stephanie-paulos` |
| The five core services | `/services/#neuropsychological-evaluations`, `#school-advocacy`, `#iee`, `#forensic-evaluations`, `#giftedness` |
| The process | `/services/#evaluation-process` |
| Beyond the Evaluation, Medical Records | `/resources/#beyond-the-evaluation`, `/resources/#medical-records` |
| Fees | `/faqs/#insurance` |
| Referring providers | `/contact/#referrals` |

Insights is not in the top nav. It is linked from the footer, from Resources
("From our clinicians"), and in context from Home, Services and FAQs.

**No standalone service pages.** Each core service has 60 to 250 words of
client copy, and the client asked for them as expand/collapse rows on one page.
A page per service would be thin and would duplicate the row. The client's own
outline plans service and condition sub-pages later; when that copy exists,
`/services/forensic-neuropsychology/` and `/services/iee/` are the two worth
building first, linked from the row, the footer and in context, not the nav.

## The posts

Four, one per category, each 637–678 words against the standard's 600–1,200:

| Post | Category | Author |
| --- | --- | --- |
| How to read the scores in your child's report | Evaluation & Testing | Paulos |
| A school evaluation and a neuropsychological evaluation are not the same thing | Children & School | Bunner |
| Getting back to school after a concussion | Brain Injury | Paulos |
| What working memory training is for | Research Notes | Bunner |

The practice does not provide intervention services, Cogmed included. The
Research Notes post survives that: it answers a question parents ask rather
than describing a service, and it says so. Cogmed is still named in it as the
best-known program of its kind, which is accurate and carries no claim that
this practice delivers it. The Cogmed check exempts this post.

**The citations are done.** Every source was opened and checked against the
claim it supports, the URLs are in the reference lists, and the citation links
carry `rel="noopener"`. `CITATIONS.md` is the record of what was verified and
what was decided.

Note for whoever reads the old note here: WebFetch and `curl` are blocked by
the egress proxy on this machine, but the in-app browser is not, which is how
the sources were reached. "No network access" was not true.

Every post is bylined to a named clinician and needs that clinician's review
before publishing, per the editorial standard. The byline's biography link goes
to that clinician's anchor on About — `#melissa-bunner` or `#stephanie-paulos`
— not to the top of it. Each post ends with three "Related on this site" links
into Services and FAQs. A check fails if a fragment link points at an id that
does not exist.

## Photographs

Three have arrived: the partners together (Home, Our Providers) and both
doctors' headshots (About, and the bylines of each doctor's posts). The originals are in the
design project's `uploads/`; the site carries web copies in
`assets/images/`, each at two widths for `srcset`: the partners at 1200 and
600px (69KB and 22KB), and each doctor cropped 4:5 at 640 and 320px (Dr. Paulos 56KB and 18KB,
Dr. Bunner 57KB and 17KB), framed alike. Every other slot is a labelled placeholder.

**Sharing image.** Every page's `og:image` is `assets/images/og-partners.jpg`:
the partners' photo cropped to 1200×630, the size link previews expect, with
`twitter:card` set to `summary_large_image`. The URL is absolute
(`https://neuroaustin.com/…`), so previews only work once the site is live
on that domain.

**Do not use map captures.** Two building exteriors were briefly published here
and then removed: they were views pulled from Apple Maps. Apple Maps and Google
Street View imagery is licensed to its providers and cannot be republished on a
commercial site, however good the framing is. This is a licensing question, not
a quality one — the only fix is a photograph the practice owns.

| Slot | Where | Status |
| --- | --- | --- |
| Both doctors | Home, Our Providers | Delivered |
| Dr. Paulos | About, her post bylines | Delivered |
| Dr. Bunner | About, her post bylines | Delivered |
| Testing room | Home hero | Outstanding |
| Four rooms | Services | Outstanding |
| Parking | Contact | Outstanding: the north lot, with the clearance canopy and the ramp down to the garage both in frame |
| The building | Contact | Outstanding: 1500 W 38th from the street, entrance visible |

When more files arrive, two rules learned the hard way:

**Originals never go in `site/`.** Everything under `site/` is uploaded to the
host verbatim. Keep originals in `project/photos-source/` — gitignored, because
git carries every version of a binary forever — and commit only the web-sized
JPEG. On macOS, no dependencies:

```
sips -Z 1200 -s format jpeg -s formatOptions 60 \
  project/photos-source/NAME.png --out site/assets/images/NAME.jpg
```

1200px is sized off the real render width of about 530px, so it covers a 2x
display with nothing spare, and lands near 200KB a photograph.

**Every `<img>` needs `width`, `height`, `loading` and `alt`.** Without the
dimensions the figure has no height until the image arrives, and everything
below it jumps as it loads.

## The post layout

Articles run as a centred column, not the left-aligned one the rest of the site
uses. On a 1440px screen a 680px measure pinned to the left of a 1160px
container leaves the eye travelling back across half a metre of empty paper
between paragraphs; centring it fixes that.

The column is 720px rather than the site's usual 680px cap, set by character
count instead of by pixels: the brand document makes 65–75 characters the hard
rule on posts, and 680px of Libre Franklin at 19px measures 64. 720px measures
67. Tables are the one thing allowed out of the column.

## Adding a post

1. Copy `insights/post-template/`, rename the folder to the post slug, replace
   every `TODO`.
2. Add a card to `insights/index.html`, newest first, with `data-category`
   matching one of the five fixed categories. **Adults & Aging is back in the
   set** now that adults are in scope, but it has no filter button until its
   first post exists: add the button with that post, never before.
3. Add an `<item>` to `rss.xml` and a `<url>` to `sitemap.xml`.
4. Fill in the post's three "Related on this site" links.
5. If a category now has three or more posts, uncomment the related-posts block
   in the post and fill it in. Fewer than three: show none.

The home page's Insights module is a single `<section>` marked with comments.
Delete it and nothing else breaks.

## Departures from the approved brief

v1 made two departures from the brief. The client copy in v2 reverses both
and adds one of its own, and the client's moodboard adds a fourth.

- **Ages 3 through adulthood.** v1 was pediatric only. The client copy states
  "aged 3 through adulthood" (an older draft said 5; 3 is used), which is
  close to the brief's original children-and-adults scope. Adult evaluations
  are as the FAQ "Do you offer adult testing?" describes them, not general
  adult practice: there is still no dementia, MCI or aging content, and the
  old Alzheimer's post redirects to the evaluation service rather than to an
  aging page.
- **Self-pay with a superbill.** v1 said no superbill. The practice now
  provides one for out-of-network reimbursement and accepts CareCredit. The
  fee is $3,850 typical, in three payments ($350, $3,150, $350). It does not
  bill insurance. The CareCredit link is the only `rel="nofollow"` on the site.
- **No intervention services.** The brief's intervention programs are gone.
  The practice refers out, and Resources lists the referral partners.
  `/intervention-services/` redirects to the FAQ that says so.
- **Colour: the client's moodboard replaces the brand document's palette.**
  Deep Navy `#1F2D3D`, Sage Green `#5D7A6E`, Warm Gold `#C28A33`, Warm
  Ivory `#F3EDE2`, Soft Blue Gray `#DCE3E8` and White replace charcoal and
  its neutrals (Slate, Ash, Mist, Haze, Shell). Type, spacing, the marks and
  the lockups are unchanged. `Brand Document.dc.html` is now version 2, on
  the new palette; version 1 is kept as `Brand Document v1.dc.html`. The
  supplied gold mark is `#B8842F`, a shade darker than Warm Gold; the SVGs
  are untouched.

## Design decisions taken while building

These are recorded in brand document version 2.

- **Colour roles.** Navy carries the text, the header, the footer and the
  closing panel. Ivory is the hero, the page heads and the quiet sections.
  Sage and blue gray are feature bands: sage for What We Do (Home) and Who
  This Is For (Services), blue gray for the conditions (Home) and Credentials
  (About). Components take their colours from role variables (`--ink`,
  `--ink-2`, `--accent-text`, `--mark`, `--line`), and each ground resets
  them, so nothing needs a dark-ground variant of its own.
- **Warm Gold is text only on navy** (4.6:1). On white it is 3.0:1 and on
  ivory 2.6:1, so gold type on light grounds is Gold Deep `#845C1E`, derived
  from it: 5.9:1 on white, 5.1:1 on ivory, 4.6:1 on blue gray. Eyebrows, step
  labels and pull quotes use it. Rules, underlines and list dashes stay Warm
  Gold.
- **Buttons are Warm Gold with a Deep Navy label**, in spaced Montserrat
  capitals, as the moodboard draws them. The moodboard's white label is 3.0:1
  on that gold, under AA; navy is 4.6:1, and 6.0:1 on the lighter hover gold.
- **Sage takes white text only** (4.7:1); navy on sage is 3.0:1. Links in a
  sage band are underlined in ivory.
- **Secondary text is Navy Soft `#4B5A69`**, derived from the navy: 7.1:1 on
  white, 6.1:1 on ivory, 5.5:1 on blue gray. On navy it is Soft Blue Gray,
  10.8:1.
- **The home hero sets the testing-room photograph beside the text** from
  1024px, as the moodboard's hero does. Below that it stacks, text first.
- **The header lockup is option M from the lockup study.** The mark in gold at
  48px, the name on one line, and "of Austin" centred beneath it with the
  hairlines running out to each end. 48px at every breakpoint (the brand
  document's floor for the gold mark); on the navy header the name is white and the rails slate blue, not gold; the mark nudged
  down 2.5px (2px on mobile), measured in a browser. The caps line is dropped
  rather than shrunk, per the document's rule for small sizes.
- **The footer carries the full lockup**, on its own band across the top, the
  only place on the site with room for it. White mark on navy; gold
  hairlines.
- **`CONFIRM` markers are red on purpose.** White on `#B3261E`, a colour that
  appears nowhere else on the site. They are working assumptions, not copy, and
  every one has to be gone before launch.
- **Photo slots are greeked.** Section 07's striped field, in blue gray, with a monospace note
  naming the shot. The three review slots on Home use the same monospace note
  inside an outlined card, so they read as slots, never as reviews.
- **Fonts are self-hosted, preloaded, and `font-display: optional`.** The page
  paints once: either the real face is ready in time, or the fallback is used
  for that page view and never replaced underneath the reader. No third-party
  font request. The subsetting script, `scratchpad/fonts.py`, is not committed;
  commit it before a weight is added. The `.htaccess` caches woff2 for a year
  as immutable, so the filenames must change if a font ever does.
- **Mobile header: hamburger, and the wordmark wraps.** Below 768px the
  wordmark breaks over two lines and the menu control is a 44px square
  hamburger. Logo and control come to 266px inside the 327px available.
- **The nav collapses to a drawer below 768px.** v1 collapsed below 1024px
  because eight items did not fit at tablet width. Six do, with room to spare,
  so the row now starts at 768.
- **Patient Portal is a secondary action.** The existing `.btn--ghost`, at the
  right-hand end of the header from 768px, after the primary "Make an
  Appointment" (shown from 1024px). Below 768px the bar has no room for it, so
  it is the last item in the drawer, full width. It is also in the footer.
- **Every answer is open.** The five core services and the twelve FAQs are
  entries, not expand/collapse rows: the heading on the left and the text on
  the right from 1024px, as section heads sit, with blue-gray hairlines
  between. Each entry keeps its id, so deep links such as `/faqs/#insurance`
  land on it with nothing to open. The client asked for "drop down when hover
  over"; it was built as a disclosure in review and then removed, because the
  answers are short enough to read in full.
- **Process rows use `.rows--wide`.** "Neuropsychological" at 27px is about
  260px, wider than the default 200px label column, and ran into the text at
  1440. The modifier widens the column to 280px from 768.
- **Tables stack below 1024px, and this is the default for every table.** The
  constraint is the column the table sits in, not the viewport — an article's
  measure is 720px at any screen size. The nav now collapses below 768, so
  1024 is a content-width breakpoint only.
- **"Few board-certified neuropsychologists in Austin" is not published.** It
  is an unverifiable comparative claim. The home page explains what board
  certification takes instead, and links ABPP's own description of it.

## SEO

- **Redirects are generated from one list.** `../tools/redirects/redirects.json`
  feeds `generate.mjs`, which writes `.htaccess`, `_redirects`, `vercel.json`
  and the stubs, so the four cannot drift. Never hand-edit the outputs.
  `REDIRECTS.md` has the full table, the reasoning per destination, the
  decisions still open, and the cutover checklist.
- **Every old URL reaches its final page in one hop.** The WordPress URLs that
  pointed at v1 pages now point straight at the v2 destination. The six v1 page
  URLs redirect too; they were only ever served from the GitHub Pages preview,
  never from neuroaustin.com, so those rules are insurance for anyone holding a
  preview link.
- **Clean URLs**, canonical on every page, `https` and non-`www` enforced in
  `.htaccess`.
- **Titles are 60 characters or fewer and descriptions 155 or fewer**, written
  for "neuropsychological evaluation Austin", "ADHD testing Austin" (children
  and adults), "autism evaluation Austin", "dyslexia testing Austin", "IEE
  Austin", "forensic neuropsychologist Austin", "giftedness testing Austin" and
  "cost of neuropsychological evaluation Austin". The cost query is carried by
  the FAQs title and its first answer. Titles no longer carry the practice name
  as a suffix — it does not fit in 60 — and the `WebSite` node supplies the
  site name instead.
- **Structured data is one connected graph.** The practice is defined once as
  `@id: https://neuroaustin.com/#practice` and repeated verbatim on Home, FAQs
  and Contact. It now carries `email`, `legalName`, `foundingDate` 2026, and
  `audience` with `suggestedMinAge: 3`; `knowsAbout` follows the client's
  conditions and services, with no intervention terms. The two clinicians are
  defined once each on About at `/about/#melissa-bunner` and
  `/about/#stephanie-paulos`, as `Ph.D., ABPP-CN`, with `memberOf` the five
  organizations the Credentials section names. `employee`, `worksFor`,
  `author` and `publisher` all point at those `@id`s. Every non-home page has a
  `BreadcrumbList`.
- **`FAQPage` is on FAQs, built from the visible answers.** All twelve, in the
  client's order, generated from the page's own rows so the markup cannot
  drift from the text. Google stopped showing FAQ rich results in 2026; the
  block stays because answer engines still read it. Do not add `HowTo`.
- **No `Review` or `AggregateRating` until real reviews are published.**
- **`medicalSpecialty` stays out.** `"Psychiatric"` is a false statement about
  two psychologists, and the enum has no psychology member.
- **`openingHours`** is Monday to Friday, 8:30am to 5:00pm, as the practice
  confirmed. The client copy does not state hours; an older draft says 8 to 4,
  which was not used.
- **`geo` is `30.308164, -97.748826`**, from the practice's own Apple Maps
  place record. Check the Google Business Profile at cutover — that profile,
  not this markup, drives the knowledge panel.
- **404 lists every page** rather than bouncing to the home page.
- `sitemap.xml` lists the eleven live pages only. `robots.txt` and `rss.xml`
  use the clean URLs. The post template is excluded from both.

## Outstanding — must be resolved before launch

Each item marked in the page carries a red `CONFIRM`: **11 markers** across
Home (5), About (1), Services (2), Contact (2) and Resources (1).

| Item | Working assumption | Where |
| --- | --- | --- |
| Photography | Four slots, listed under Photographs | Home, About, Services, Contact |
| Reviews | Three slots, no quotes supplied. Never write placeholder testimonials | Home |
| Google review link | A Maps search stand-in, which may land on the old practice's profile. Needs the Business Profile review URL | Home |
| Dr. Paulos's services | Her bio lists cognitive rehabilitation, executive function coaching and Cogmed, which the FAQ says the practice does not provide. Kept as written | About |
| Giftedness Evaluations | No body copy supplied. The row holds the one sentence the doc gives, from "Who This Is For" | Services |
| Records fee rule | The client copy cites the Texas Medical Board, which licenses physicians. The practice's board is TSBEP, part of BHEC | Resources |

Notes to the practice, kept as HTML comments rather than visible copy:

- **Intake and appointments.** "Make an Appointment" goes to
  `/contact/#make-an-appointment` (email or phone). No form vendor is wired up;
  whatever is chosen must be HIPAA-compliant and sign a BAA. The patient
  portal, Jane, can also do intake forms and online booking: ask whether it
  should be the appointment route.
- **The CVs** link to the old WordPress uploads and die at cutover. Download
  both and self-host them under `assets/cv/`.

Also outstanding, and not marked in the page:

- **Client links that look stale** (CDC child development, Dell Children's,
  the 2022 BHEC complaint form). Listed with suggested replacements in the v2
  pull request; not swapped.
- **"Neuropsychologist is not a protected title in Texas"** is published as
  the client wrote it, uncited: no official page states the negative directly.
  BHEC licenses the title "psychologist".
- **Three retired clinicians in the redirect map**, including the one the brand
  document says must never appear. Paths in config files, not rendered copy.
  `REDIRECTS.md` explains how to drop them.
- **The old site took card payments online** through WP Invoicing and Stripe.
  The new site does not. CareCredit covers financing; online payment for the
  three instalments is a decision for the practice.
- **The map embed** uses Google's keyless `output=embed` iframe — free, but an
  undocumented URL with no guarantee. OpenStreetMap's iframe is the free,
  cookie-free alternative and now has coordinates to use (`geo` above).
- **GitHub Pages preview caveat.** Pages cannot issue 301s, and it serves this
  site from a subdirectory, so the redirect configs are inert there and
  `404.html`'s root-relative links will not resolve. Both are correct for
  neuroaustin.com.

## Checks

`node tools/check-site.mjs` from the repository root runs these and exits
non-zero on any error. Add `--external` to request every outbound URL.

- Every internal link and fragment resolves (template `TODO` links excepted).
- No link points at a `.html` file.
- One `<h1>` per page, no skipped heading levels.
- Titles 60 characters or fewer; descriptions 50 to 155.
- At least three in-context internal links in every indexable page's `<main>`.
- `tel:` link on every page.
- Banned words absent: journey, empower, holistic, cutting-edge, state of the
  art, passionate, dedicated team, comprehensive suite, trusted partner.
- Retired facts absent: "Austin Neuropsychology" (allowed inside `#our-story`
  only, where it is the practice's history), 711 W 38th, David Tucker, "75+
  years", the Texas Psychological Association.
- Cogmed: allowed in the working memory post; reported as a warning on About
  (the marked bio) and Resources (an outside referral partner the client
  listed).
- External links carry `rel="noopener"` and open in the same tab, except
  documents (CVs, the BHEC form). `rel="nofollow"` on CareCredit only.
- Every photograph under `assets/images/` has `width`, `height`, `loading`
  and `alt`.
- `CONFIRM` count per page.

The adult-scope check from v1 is gone with the pediatric scope.

Last run: no errors, the two Cogmed warnings, 11 `CONFIRM` markers. Home first
load is about 213KB before gzip (24KB HTML, 36KB CSS, 3.5KB SVG, 149KB of
fonts) against a 500KB budget. Contrast with the moodboard palette: navy on white 14.0:1, on ivory 12.0:1,
on blue gray 10.8:1; Navy Soft 7.1, 6.1 and 5.5:1 on the same three; Gold Deep
5.9, 5.1 and 4.6:1; white on sage 4.7:1; navy on Warm Gold 4.6:1; Warm Gold on
navy 4.6:1; blue gray on navy 10.8:1.

**Rendered at 375, 768 and 1440** (Home, Services, FAQs, the drawer, open and
closed rows). This replaces v1's "not rendered" note; the instruction it cited
no longer applies. The preview pane is about 924px wide, so 375 and 1440 were
emulated by rewriting the stylesheet's width queries and scaling the page.
That is faithful to the CSS but not to a device: check on a real phone before
launch.
