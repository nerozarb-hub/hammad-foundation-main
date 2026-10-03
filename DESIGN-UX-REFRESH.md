# Hammad Foundation — UI/UX redesign brief

**Scope:** public website, including home, school and story pages, gallery, transparency, contact, and support checkout.  
**Status:** design specification for implementation; no code changes are implied by this file.  
**Review basis:** the local Next.js project. The supplied Vercel deployment redirects to Vercel login, so visual conclusions about the deployed build still need a live review.

## 1. Design objective

Help a first-time visitor understand the school, see credible evidence of its work, and choose a support action with confidence. The site should feel **grounded, humane, and accountable**: like a carefully edited school publication with clear financial records. Preserve the existing facts, legal names, support amounts, routes, payment mechanics, and approved photography.

### Primary journeys

1. **Potential supporter:** understand the mission → see actual school activity → compare support options → review payment recipient → continue to PayPro.
2. **Trust-focused visitor:** identify the campus and operating entities → inspect transparency details → contact the team.
3. **Guardian or local visitor:** find school information, photographs, location, and a direct contact route.

## 2. What the current implementation needs

| Area | Current observation in source | Design response |
| --- | --- | --- |
| Identity | `DESIGN.md` specifies paper, charcoal, and school green, while `globals.css` defines a navy/blue palette and Inter. | Establish one visual system and use it on every public page. |
| Hero | Full-width slideshow places a long headline over a dark image gradient. | Use a stable editorial split so the school photograph and message both remain legible. |
| Navigation | Seven small, uppercase links compete with the support button; the menu remains collapsed until `xl`. | Reduce top-level choices to four clear groups, with secondary destinations in menus and footer. |
| Support options | Four equally weighted cards plus a custom card create a dense comparison task. | Lead with the recommended monthly option, then show concise alternatives in a simple comparison list. |
| Checkout | The support selection and donor form share a busy card; small labels and repeated trust copy add reading effort. | Create a guided sequence with a persistent summary and one clear payment handoff. |
| Typography | Heavy Inter headings, tiny uppercase labels, and multiple arbitrary sizes weaken hierarchy. | Introduce an editorial display face and a readable text face with a defined scale. |
| Trust | Payment identity appears in the top strip, hero, cards, checkout, and footer. | Keep it consistently worded, prominent at decision points, and quieter elsewhere. |

## 3. Visual direction

**Concept: “A school record with a warm front door.”** Use documentary photography, paper-like surfaces, dark ink, fine rules, and restrained green action color. The design should be editorial rather than promotional: purposeful white space, asymmetrical image placement, and text that reads easily. Avoid generic icon cards, fake impact counters, gradient text, decorative blur, and oversized shadows.

### Color roles

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#F7F4ED` | Main page background |
| `--surface` | `#FFFEFA` | Forms and important content surfaces |
| `--ink` | `#202824` | Primary text and dark panels |
| `--muted` | `#58645D` | Supporting copy; verify contrast in context |
| `--line` | `#D7DDD5` | Dividers and field borders |
| `--action` | `#147A4B` | Primary button, active states, links, focus |
| `--action-hover` | `#0D5E39` | Hover and pressed emphasis |
| `--soft-green` | `#E8F1E9` | Selected options and gentle callouts |
| `--warning` | `#99573F` | Error or caution content only |

Use the green as a scarce action signal. Most sections should rely on the canvas, ink, and typography. Check text and control contrast to WCAG AA before implementation.

## 4. Typography system

**Recommended pairing:** **Literata** for major editorial headings and selected pull quotes; **Source Sans 3** for navigation, body text, forms, labels, and data. Both need Latin support; if Urdu content is added, select and test a dedicated Urdu face rather than allowing a browser fallback. Load only the weights used, serve locally when practical, and use `font-display: swap` with suitable fallbacks.

| Role | Desktop | Mobile | Weight / line height | Notes |
| --- | --- | --- | --- | --- |
| Hero title | `clamp(3.25rem, 5.5vw, 5.75rem)` | same fluid rule | Literata 600 / 1.04 | Maximum 11–13 words per visual line group; no all caps. |
| Section title | `clamp(2.25rem, 3.6vw, 3.75rem)` | same | Literata 600 / 1.12 | Keep to about 16–20ch. |
| Subheading | `1.5rem` | `1.375rem` | Source Sans 3 700 / 1.25 | Use for programme and form group titles. |
| Lead text | `1.25rem` | `1.125rem` | Source Sans 3 400 / 1.5 | Maximum 55ch. |
| Body | `1.0625rem` | `1rem` | Source Sans 3 400 / 1.6 | Maximum 65ch. |
| Supporting | `0.9375rem` | `0.9375rem` | Source Sans 3 400 / 1.5 | Keep essential content above 16px. |
| Label | `0.875rem` | `0.875rem` | Source Sans 3 700 / 1.3 | Sentence case; no widely tracked uppercase form labels. |

Use 400, 600, and 700 weights consistently. Reserve uppercase and letter spacing for short section eyebrows only. Use tabular numbers for PKR amounts, registration IDs, and step numbers. Keep paragraphs left aligned; let headings wrap naturally without forced line breaks. Do not use color alone to distinguish links from body copy: provide an underline where a link appears within a paragraph.

## 5. Layout and spacing

- **Content width:** 80rem maximum for general sections; 44rem maximum for long reading pages.
- **Grid:** 12 columns on desktop, 6 on tablet, one column on mobile. Use a 5:7 split for hero copy and image, and a 7:5 split for story and evidence sections.
- **Gutters:** 1.25rem mobile, 2rem tablet, 3rem desktop.
- **Spacing scale:** 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, and 6rem. Use larger gaps between sections than between a heading and its paragraph.
- **Section rhythm:** 4.5–6rem vertical padding on desktop and 3–4rem on mobile. Alternate visual density: image-led section → compact evidence section → open reading section.
- **Surface treatment:** fine rules and background changes first; cards only for true selectable options or grouped records. Use 0–0.75rem radius, not large rounded tiles everywhere.
- **Photography:** one purposeful crop per section. Keep faces visible, avoid text overlays over faces, provide captions when an image documents a specific school moment, and use explicit aspect ratios to prevent layout shift.

## 6. Navigation and page architecture

### Global header

- Use the real logo asset instead of the placeholder “H” monogram if the asset remains legible at 36–44px.
- Desktop primary navigation: **Our School**, **Our Story**, **Transparency**, **Contact**. Put Gallery, Updates, FAQ, and detailed support information in contextual links and footer. Keep **Support the school** as the single persistent primary action.
- Replace the tiny all-caps navigation with 0.9375–1rem sentence-case labels. Show current-page state with an underline or rule.
- Keep the payment recipient disclosure accessible from the header through a clearly named link or short disclosure, but do not let a long legal sentence consume the entire mobile viewport.
- Mobile menu: full-width panel below the header, large tap targets, visible close control, keyboard focus management, and the same support action at the bottom.

### Home page order

1. **Hero:** school identification, one clear promise, two actions (“Support a student” and “Explore the school”), and a documentary image with a short caption.
2. **Proof snapshot:** campus location, what support provides, and a direct route to evidence. Use verified facts only.
3. **Ways to support:** recommended Guardian option plus other amounts in a comparison layout. Explain monthly versus one-time before choice.
4. **School story:** students and campus presented through photographs and concise narrative.
5. **Gallery preview:** a small, varied image composition; link to the full gallery.
6. **How support works:** choose designation → enter donor details → continue to PayPro; name the receiving entity at this point.
7. **Transparency:** operator relationship, registration record, and link to the full transparency page.
8. **FAQ:** answer genuine objections about the school, payment recipient, recurrence, and contact.
9. **Closing invitation:** one primary support action and one human contact route.

## 7. Key component behavior

### Hero

Use a calm, static image on first load. If a gallery control is retained, make it manual by default; automatic rotation can distract from the message. On desktop, place copy on the paper canvas and an image to the right at about 55% width. On mobile, show the copy and actions first, then the image. The primary action should appear without scrolling at common laptop heights and without covering the school image.

### Support selection

Present the monthly Guardian option as a featured row or larger panel, followed by other one-time options in a clean list. Show **amount**, **frequency**, **designation**, and a one-sentence description in that order. Make the whole option selectable, with a visible radio state. “Custom amount” reveals its amount field inline. The CTA should say **Continue with PKR [amount]** so the next action is explicit.

### Donation checkout

Use a two-column desktop layout: form at left, sticky summary at right. On mobile, place a compact summary immediately above the final CTA. Divide the flow visibly into **1. Choose support**, **2. Your details**, **3. Review and continue**. Keep required fields obvious; explain why optional contact fields are requested. Surface validation next to each field and preserve entered values after errors. Before the handoff, show the payment recipient **YZ Educational Services**, designation **Hammad Foundation**, selected amount/frequency, and that PayPro hosts the next step. Do not imply a recurring charge unless the payment integration actually supports it.

### Transparency and contact

Use a plain records layout with aligned labels and values, dates where verified, and direct links to source documents. Keep the organisation and payment relationship in consistent wording. Contact should separate **school/campus questions** from **payment questions**, with specific response expectations only if the team can meet them.

## 8. Responsive and accessibility requirements

- Design at 360, 390, 768, 1024, and 1440px widths; no horizontal scrolling or clipped controls.
- Maintain 44px minimum touch targets and visible focus on links, buttons, gallery controls, and form options.
- Preserve meaningful heading order, labelled form fields, descriptive image alt text, and an accessible status message during checkout loading/errors.
- At 200% browser zoom, navigation, text, and payment controls must remain usable.
- Avoid automatic carousels; if retained, provide pause, previous/next, and reduced-motion behavior.
- Use a single-column donation form on mobile; never place amount and frequency so tightly that they become hard to scan.
- Keep loading, error, success, and empty states written in plain language with a clear next step.

## 9. Implementation priority

1. **P0 — unify design tokens and typography.** Replace the conflicting navy/Inter system with the approved paper/ink/green direction and the type scale above.
2. **P0 — simplify hero and navigation.** These establish comprehension and the first support action.
3. **P1 — redesign support selection and checkout summary.** Make amount, frequency, recipient, and next step unmistakable.
4. **P1 — improve proof and transparency presentation.** Use readable records, captions, and consistent entity wording.
5. **P2 — refine gallery, FAQ, footer, microcopy, and responsive details.** Finish with keyboard and zoom review.

## 10. Acceptance criteria

- A new visitor can identify the school, its location, and the primary support path in the first screen.
- Navigation has one obvious primary action and no more than four top-level content choices.
- Every support option makes amount and frequency readable before selection.
- The PayPro handoff states the recipient, designation, amount, and next step without requiring a visitor to hunt through the footer.
- Body copy is at least 1rem, reading lines stay near 45–75 characters, and headings form a clear hierarchy.
- The site passes keyboard-only navigation, 200% zoom, and mobile overflow checks on the listed widths.
- No new factual claim, student identity, testimonial, impact number, or payment promise is introduced without verification.
