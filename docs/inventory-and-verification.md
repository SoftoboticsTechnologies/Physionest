# PhysioNest redesign: inventory and verification report

Original crawled on 2026-10-23 (WordPress 7.1.3, Elementor 4.3.5, Astra theme). Pages were found through the WordPress sitemaps, the REST API (`/wp-json/wp/v2/pages`) and internal links. There are no blog posts.

## 1. Page inventory

| Original URL | Original `<title>` | Rebuilt as | Status |
|---|---|---|---|
| https://physionest.in/ | Home - Physionet | `index.html` | Recreated |
| https://physionest.in/services/ | Services - Physionet | `services.html` | Recreated |
| https://physionest.in/booking/ | booking - Physionet | `booking.html` | Recreated |
| https://physionest.in/get-appointment/ | Get Appointment - Physionet | `get-appointment.html` | Recreated |
| https://physionest.in/customer-cabinet/ | Customer Cabinet - Physionet | `customer-cabinet.html` | Recreated |
| https://physionest.in/form/simple-contact-form/ | (redirects to Home) | n/a | SureForms form post; the same form is embedded on Home |
| `/?elementor_library=default-kit`, `default-kit-2` | n/a | n/a | Elementor internal theme kits, not content pages |
| WordPress search (`/?s=`) | n/a | `search.html` | Rebuilt as client-side search |

No page was inaccessible.

## 2. Navigation and links

**Header (all pages):** logo → Home · Home (`#home`) · About (`#about`) · Services · Contact (`#contact`) · **Get Appointment** button.
The original used bare `#about` / `#contact` anchors on every page, which did nothing outside Home. The rebuild links to `index.html#about` and `index.html#contact` from inner pages.

**Footer (all pages):** logo · *Call Now to Book*: +91 86608 11031, **Booking Page** button · *Reach Us*: Bangalore · *Open Hours*: Mon-Fri 09:00 – 19:00, Sat-Sun 10:00 – 14:00 · Copyright © 2026 Physionet · Powered by Physionet · floating "WhatsApp us" (`wa.me/918660811031`).

**External links preserved:** 9 × WhatsApp "Book Now" with pre-filled service text (Services, Booking) · `wa.me/+91%208660811031` (WhatsApp Consultation / WhatsApp Now) · `rzp.io/rzp/physionest` (Pay Online) · Google Maps embed `q=Bangalore` · WordPress Meta links (Log in, Entries feed, Comments feed, WordPress.org).

**Contact details on the original:** phone +91 86608 11031 (also shown as 8660811031 on Booking) · location Bangalore / Bengaluru. No email address or street address appears anywhere on the original site.

## 3. Heading and content outline

**Home:** Hero "Move Better, Live Pain-Free with Expert Physiotherapy Care" + form "Book a Free Consultation" · "Committed To Complete Physiotherapy Care" · consultation band + stats (18+, 4.9) · "✩ OUR SERVICES ✩ / Expert Physiotherapy & Rehabilitation Services" (12 cards) · "⭐ PATIENT SUCCESS STORIES ⭐ / Real Recovery. Real Results." (2 stories) · "FREQUENTLY ASKED QUESTIONS / Answers to Your Physiotherapy Questions" + "Frequently Asked Questions" (6 Q&A) · "Start Your Journey to a Pain-Free Life" · map.

**Services:** "★ SPECIALIZED PHYSIOTHERAPY SERVICES ★ / Expert Care For Every Stage Of Recovery" (9 photo cards) · "OUR PROCESS / Our Treatment Process" (5 steps).

**Booking:** "🏠 PHYSIOTHERAPY IN BENGALURU • HOME VISITS AVAILABLE / Professional Physiotherapy At Home In Bengaluru" + 2 badges, 3 buttons, trust card, 3 stats · services (same 9) · "HOW IT WORKS / Start Your Recovery In 4 Simple Steps" + "Talk To A Physiotherapy Expert" · "★ PATIENT TESTIMONIALS ★ / What Our Patients Say" (6) · "★ FREQUENTLY ASKED QUESTIONS ★ / Common Questions About Physiotherapy" (6 Q&A).

**Get Appointment:** WPForms form: Name * (First / Last), Phone *, Email *, Message *, Book Now.

**Customer Cabinet:** "Customer Cabinet" · "Customer Dashboard" · Search · Recent Posts · Recent Comments ("No comments to show.") · Archives ("No archives to show.") · Categories ("No categories") · sidebar: Search for:, Recent Comments, Archives, Categories, Meta.

## 4. Assets

| Original file (`/wp-content/uploads/…`) | Local file | Used on |
|---|---|---|
| 2026/05/cropped-3D-2.jpg-1-scaled-1.jpeg | images/brand/logo.jpg | Header, footer |
| 2026/05/3D-2.jpg-1-2.jpeg | (original only; same artwork with extra whitespace) | n/a |
| 2026/05/yt_EEN1Gdvh…QueP.jpg | images/home/physiotherapy-session.jpg | Home hero background, About |
| 2026/05/7DGPbctU…sCsAW.jpg | images/home/physiotherapy-care.jpg | Home About |
| 2026/06/WhatsApp-Image-2026-06-10-at-11.08.16-AM.jpeg | images/services/neurological.jpg | Services, Booking |
| …11.08.17-AM.jpeg | images/services/orthopedic.jpg | 〃 |
| …11.08.17-AM-1.jpeg | images/services/geriatric.jpg | 〃 |
| …11.08.18-AM.jpeg | images/services/pediatric.jpg | 〃 |
| …11.08.18-AM-1.jpeg | images/services/womens-health.jpg | 〃 |
| …11.08.18-AM-2.jpeg | images/services/post-rehabilitation.jpg | 〃 |
| …11.08.19-AM.jpeg | images/services/sports-injury.jpg | 〃 |
| …11.08.21-AM.jpeg | images/services/electrotherapy.jpg | 〃 |
| …11.08.22-AM.jpeg | images/services/cardio-pulmonary.jpg | 〃 |
| images.unsplash.com/photo-1584515933487-779824d29309 | images/booking/physiotherapy-at-home.jpg | Booking hero |

- Untouched originals are in `images/originals/`. The site uses resized, recompressed copies (2.5 MB of originals down to 0.9 MB).
- `images/favicon.png` and `apple-touch-icon.png` are crops of the logo symbol. The original site had no favicon (`/favicon.ico` returned 404).
- The service-card icons on Home were Font Awesome 6.5.1 classes (brain, bone, wheelchair, child, heartbeat, hospital-user, hand-holding-medical, running, heart-pulse, house-medical, lungs, person-walking). The same icons are now inlined as SVG.

**Missing on the original (not recreated):** `feedback1.jpg` and `feedback2.jpg` (Home success stories) were referenced with relative paths and return **404** on physionest.in. They have no source, so the story cards are shown without photos.

## 5. Deliberate deviations from the original

1. **Stray markup removed:** several sections of the original showed literal "```" / "```html" text (leftover code-fence characters). They are formatting debris, not content, so they were not carried over.
2. **Heading levels:** the original Home page used `h4` for the main hero title and `h1` for the FAQ heading. The rebuild gives each page a single `h1` with `h2`/`h3` below it. The heading text is unchanged.
3. **Get Appointment** had no visible heading. Its page title "Get Appointment" is now used as the `h1`.
4. **Image alt text:** the logo's original alt text was the filename ("3d (2).jpg (1)"). It is now "PhysioNest". The other alt texts are unchanged.
5. **Phone numbers** are now clickable `tel:` links. The displayed text is unchanged.
6. **Forms** hand off to WhatsApp instead of posting to WordPress (see the README). This adds one line of UI text that isn't on the original: "Opening WhatsApp to send your details to PhysioNest…". The search page also generates a result count ("N results for …").
7. **Footer social icons** (Facebook, LinkedIn, Google Reviews, Yelp) are shown with the original brand hover colours. Their links are still `#`, as on the original, until real profile URLs are added.
8. **Footer credit:** at the client's request, the original "Powered by Physionet" is replaced with "Powered By" plus the DripFunnel logo (`images/dripfunnel/dripfunnel-logo-white.png`), linking to https://www.dripfunnel.com/in/ in a new tab.
9. **Structured data** (SureRank JSON-LD) is copied verbatim, except that the SearchAction target now points to `/search.html?s=`. Existing typos such as "Bnagalore" are preserved.
10. Meta descriptions are copied exactly, including the original truncation. Get Appointment had none and still has none.

## 6. Verification performed

### Content (automated, all pages)
Every text node, label, placeholder, button and link label of each original page (429 strings) was checked against the rebuilt page.
- Found verbatim: all except the items below.
- Not in `<body>`, by design: page titles (present in `<title>`), and validation messages (present in the `data-msg-*` attributes that the JavaScript displays).
- Intentionally omitted: the "```" debris (section 5.1).

A reverse check confirmed no other new visible copy, apart from the items listed in section 5.6.

### Layout (automated, headless Chrome)
All 6 pages at 320, 375, 425, 768, 1024, 1280 and 1440 px (42 combinations): **no horizontal overflow, no JavaScript errors, no broken local images or files.** Two issues were found and fixed during QA: the Customer Cabinet sidebar overflowed at 1024 and 1280 px, and the honeypot field was positioned off-screen.

### Interaction (automated, 22 checks, all pass)
Mobile menu open, close, Esc (focus returns to the toggle) and anchor-link close · FAQ accordion open and close · Home form required, email and phone errors use the original messages · WhatsApp handoff URL contains the entered fields · Get Appointment shows 5 required errors · Carousel: prev disabled at start, next advances, dots update · Search finds results, pre-fills the query, and does not inject the query as HTML.

### Not verified
- The Google Maps iframe did not load in headless testing (it is lazy-loaded from an external site). Check it in a real browser.
- Real-device touch testing (iOS Safari, Android Chrome) was not done. Behaviour was emulated by viewport width only.
- Form delivery to a backend: none is configured (see the README).
