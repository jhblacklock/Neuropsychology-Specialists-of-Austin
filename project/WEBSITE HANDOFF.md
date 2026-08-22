# Session handoff — Neuropsychology Specialists of Austin (website build)

Paste this at the start of a new session. Attach `BUILD BRIEF.md`, the three
logo SVGs, and `Brand Document.dc.html` alongside it.

---

I'm building the website for **Neuropsychology Specialists of Austin**, a
board-certified neuropsychology practice in Austin, TX. The brand document is
written and approved. Treat it as the system: read values out of it, do not
reinterpret it, do not restyle. `BUILD BRIEF.md` holds the sitemap and all page
content. Deliverable 1 is done — start at deliverable 2.

## The system (approved, from the brand document)

Colors — gold `#B8842F` (accent only: hairline rules, italic display type 24px+,
one word of emphasis, the mark — never a large fill, never a gold button),
charcoal `#383A44` (body copy, headlines, dark grounds), paper `#FDFCFA`.
Neutrals, all derived from the charcoal: slate `#676A78` (secondary text, 5.1:1),
ash `#9B9EA9` (disabled, meta on dark — never body), mist `#B6B8C0` (table rules,
input borders), haze `#E6E6E9` (dividers, hairlines), shell `#F2F1F0` (quiet
backgrounds, table headers, cards). No other hues.

Type — Playfair Display Bold for headlines and the practice name; Playfair
Display Italic SemiBold in gold for "of Austin" and pull quotes, nowhere else;
Montserrat SemiBold caps at `0.24em` for eyebrows, labels, table headers, four
words maximum; **Libre Franklin** 400/500 for all body copy, lists, tables,
forms, navigation.

Scale, desktop / mobile below 768px — h1 56/36, h2 39/28, h3 27/22, h4 21/19,
lead 23/19, body 19/17, pull quote 31/24, caption 15/15 (single-line labels
only, never sentences), eyebrow 12/11. Tracking: Playfair −0.015em at h1,
−0.01em at h2/h3; Montserrat 0.24em always; Libre Franklin none. Measure 65–75
characters, text column 680px.

Spacing — base 8, multiples only: 8, 16, 24, 32, 48, 64, 96, 128, 192. Gaps come
from flex and grid `gap`, not margins on children. 12 columns at 1440 and 768,
24px gutters, single column below. Content column maxes at 1160px. Tap targets
44px minimum, so buttons 48px and nav rows 56px. **Radius 0 throughout, no
shadows** — separation is hairlines and shell fields.

Logo — the three SVGs are final. Use as supplied; do not re-vectorize, redraw,
or regenerate from a raster. Mark alone below 40px, full lockup at 88px of mark
or more. Clear space equals half the mark's height on all four sides. In the
lockup, the hairline rules sit at `top: 0.157em` and their flex row sets its own
`font-size` so the em resolves against the italic — this centers them on the
x-height of the "o" in "of". On charcoal, "of Austin" lifts to `#C79A4B`.

Photography — real rooms, real light, the actual office. No stock, no glowing
brain renders, no patients, no filler. Photos are commissioned but not yet
delivered: every layout must read as finished without them, and the brand
document names the typographic fallback for each slot.

## Voice

Explain, don't reassure. Precision is the reassurance. Short plain sentences,
"you," name the specific worry, say what a thing is, how long it takes, and what
it costs. Numbers over adjectives. Banned: journey, empower, holistic,
cutting-edge, state of the art, passionate, dedicated team, comprehensive suite,
trusted partner. No invented patient quotes, outcome statistics, or credentials.

## Practice facts

```
Neuropsychology Specialists of Austin
1500 W 38th Street, Suite 23, Austin, TX 78731
Phone 512-637-5865   Fax 737-215-8710
```

Two clinicians, both board certified in clinical neuropsychology by the American
Board of Professional Psychology; practice has held ABPP membership in Clinical
Neuropsychology since 2004. Full bios are in section 10 of the brand document —
use those, they are already trimmed from the live site.

Never appears anywhere: the old practice name "Austin Neuropsychology", the old
address at 711 W 38th St, any `box5660.temp.domains` URL, David Tucker PhD, or
the "combined 75+ years" figure. State per-clinician experience, not a combined
number.

## Still unconfirmed — carry the `[CONFIRM]` marks through

Section 11 of the brand document is the live list. Design at full length using
these working assumptions and keep the marker visible in the copy:

- Report turnaround — assumed three to four weeks from testing to written report.
- Referral intake — assumed fax to 737-215-8710; no dedicated portal or email.
- Provider line — none that bypasses patient intake; using the main number.
- Clinician phone consult — assumed available on request after report delivery.
- Office hours — Mon–Fri 8:30am–5:00pm, from a third-party directory, not the practice.
- Parking — nothing known. Block is reserved and stays empty.
- Bunner's experience — neuroaustin.com says over 20 years, the brief says 10+.
- Referral questions the practice declines — unknown, needed for the referrer page.
- Headshots — commissioned, not delivered.

## What I want from you now

Deliverable 2 from the brief: the **home page and one interior page** as full
designs, built from the brand document. Stop there for approval before the
remaining pages.

Home leads with what the practice does and who it's for — not a definition of
neuropsychology. It carries the three-step process with real durations as the
centerpiece, board certification stated early and explained rather than badged,
the conditions addressed, one call to book a consultation, address and phone.

For the interior page, my pick is **Fees & Insurance** — published rates as a
real table are the strongest trust signal in this category and almost no
competitor does it, so it is the page most worth getting right first. Say if
you'd rather start with For Referring Providers or The Process.

Remaining afterward: Neuropsychological Evaluation, Intervention Services, The
Process, Our Team, For Referring Providers, Insights index and post template
(populated with one real sample post), Contact & Directions. Then responsive
behavior at 375, 768, 1440.

Technical constraints from the brief still apply: mobile-first, semantic HTML
with correct heading order, AA contrast throughout, home page under 500KB, `tel:`
links everywhere, per-page title and meta description, local business schema, no
carousel, no chat widget, and no patient data collected outside the existing
JotForm integration.

Repo: `jhblacklock/Neuropsychology-Specialists-of-Austin`, branch `main`.
