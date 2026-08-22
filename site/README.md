# Neuropsychology Specialists of Austin — website

Static HTML and CSS. No build step, no dependencies, no JavaScript framework.
Upload the contents of this folder to any static host and it works.

Built from `../project/Brand Document.dc.html` (the system of record),
`../project/WEBSITE HANDOFF.md`, and the `BUILD BRIEF.md` in
`../project/uploads/`. Values are read out of the brand document rather than
reinterpreted.

## Files

```
index.html                        Home
neuropsychological-evaluation.html
intervention-services.html
the-process.html
our-team.html
fees-and-insurance.html
for-referring-providers.html
contact.html
insights/index.html               Blog index, filterable by category
insights/normal-memory-change-and-what-is-not.html   Sample post
insights/post-template.html       Copy-me template (noindex, not in sitemap)
assets/css/site.css               The whole design system
assets/logo/*.svg                 The three supplied marks, unmodified
rss.xml  sitemap.xml  robots.txt
```

Each page carries the header, nav, and footer inline. There is no build step
to stamp them, so a change to the chrome is a find-and-replace across the ten
published pages.

## Adding a post

1. Copy `insights/post-template.html`, rename it to the slug, replace every
   `TODO`.
2. Add a card to `insights/index.html`, newest first, with
   `data-category` matching one of the five fixed categories.
3. Add an `<item>` to `rss.xml` and a `<url>` to `sitemap.xml`.
4. If a category now has three or more posts, uncomment the related-posts
   block in the post and fill it in. Fewer than three: show none.

The home page's Insights module is a single `<section>` marked with comments.
Delete it and nothing else breaks.

## Decisions taken while building

These extend the brand document rather than contradict it. Flagging them
because they were judgment calls.

- **Gold is never used for text below 24px.** Gold on paper measures 3.2:1,
  which passes AA for large type only. Eyebrows, labels, and links are
  therefore charcoal or slate; gold does the signalling as hairline rules,
  italic display type at 24px and up, and the mark. The brand document sets
  gold eyebrows on its own artboards; on a site that has to clear AA, that
  does not carry over.
- **Gold text never sits on a Shell field.** Gold on Shell is 2.9:1, under the
  3:1 large-type floor. The home page's process module moved onto paper with a
  hairline for that reason.
- **Footer meta uses Mist, not Ash.** Ash on charcoal is 4.2:1, under AA for
  body-size text. Mist is 5.7:1.
- **The header logo is the mark plus the wordmark, without the caps line.**
  The document floors the full lockup at 88px of mark because the eyebrow line
  stops being readable below that. The compact header form drops that line
  rather than shrinking it, which is the rule the document states for small
  sizes. The full lockup with "of Austin" appears in the footer.
- **No striped image placeholders anywhere.** Section 07 asks that every layout
  read as finished without photography and names a typographic fallback for
  each slot. The team page and post bylines use the Shell-field fallback.
- **Nav collapses to a drawer below 1024px, not below 768px.** Eight top-level
  items do not fit on one row at tablet width. The grid still goes 12-column at
  768 as specified.
- **"Few board-certified neuropsychologists in Austin" is not published.** The
  brief states it, but it is an unverifiable comparative claim. The home page
  says instead that board certification is not required to practice in Texas
  and explains what ABPP certification takes, which is checkable.
- **`openingHours` is deliberately absent from the local business schema.** The
  hours came from a third-party directory, not the practice. Structured data
  cannot carry a `[CONFIRM]` marker, so the field waits until the hours are
  confirmed. The visible hours are marked.

## Outstanding — must be resolved before launch

Everything below appears on the site inside a bordered `CONFIRM` marker, so it
is visible in the page, not buried here. 28 markers across the site.

| Item | Working assumption | Where |
| --- | --- | --- |
| Report turnaround | Three to four weeks from testing to written report | Home, The Process, Referring Providers |
| Referral intake | Fax to 737-215-8710; no portal or referral email | Referring Providers |
| Provider line | None that bypasses patient intake | Referring Providers |
| Clinician phone consult | Available on request after report delivery | Referring Providers |
| Referral questions declined | Unknown — the list is not published | Referring Providers |
| Office hours | Mon–Fri 8:30am–5:00pm, from a directory listing | Footer, Contact |
| Parking | Nothing known; the block is reserved and empty | Contact |
| Bunner's experience | "Over 20 years" per neuroaustin.com; the brief says 10+ | Our Team |
| Headshots | Commissioned, not delivered | Our Team, post bylines |
| Family therapy fee | Not in the published rate list | Intervention Services |
| JotForm link | The live intake form URL is not in the handoff | Contact |

Also outstanding, and not marked in the page because they are technical:

- **Domain.** Canonical URLs, `og:url`, `rss.xml`, `sitemap.xml`, and
  `robots.txt` use `https://neuroaustin.com/`. If the rebrand moves to a new
  domain, find and replace that string. All internal links are relative and are
  unaffected.
- **`og:image`.** No OpenGraph image exists yet — the commissioned photography
  has not been delivered and there is no brand OG card. Each page carries a
  commented placeholder in `<head>`.
- **Citation links in the sample post.** The sources are named in full but not
  linked: the machine this was built on had no outbound network access, and the
  editorial standard forbids publishing a citation that has not been checked.
  Insert and verify the three URLs before publishing that post.
- **Fonts load from Google Fonts.** Self-host them if you would rather not have
  a third-party request on a healthcare site.
- **The Contact page embeds Google Maps** in a lazy-loaded iframe, as the brief
  asks. It is a third-party embed; if that matters for your cookie posture,
  replace it with the static address block and the "Open in Google Maps" link
  that already sit beside it.

## Checks that were run

- Every internal link and image resolves. No dead links.
- One `<h1>` per page, no skipped heading levels.
- `tel:` link on every page, in the utility bar and in the closing block.
- Per-page `<title>` and meta description, all within length.
- Banned words and retired facts absent: journey, empower, holistic,
  cutting-edge, state of the art, passionate, dedicated team, comprehensive
  suite, trusted partner, "Austin Neuropsychology", 711 W 38th, the temp
  domain, David Tucker, "75+ years".
- Home page transfer set is 43KB before gzip: 16KB HTML, 24KB CSS, 3.5KB SVG.
  Budget is 500KB.
- Contrast: charcoal on paper 10.6:1, slate on paper 5.1:1, slate on shell
  4.8:1, mist on charcoal 5.7:1, gold-lift on charcoal 4.4:1. Gold text appears
  only at 24px and up on paper (3.2:1, AA large).

Not run: rendering in a browser. The handoff asks that the designs not be
screenshotted, so layout was built from the stated dimensions rather than
verified visually. Worth a pass at 375, 768, and 1440 before launch.
