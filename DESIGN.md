# Hammad Foundation Design System

## 1. Visual atmosphere

A warm, editorial school interface with restrained confidence: paper-toned surfaces, charcoal ink, one school-green accent, generous spacing, and offset layouts that feel human without becoming chaotic. Variance is 6/10, motion is 4/10, density is 4/10. The home page opens with an asymmetric split: grounded copy and a documentary classroom image. Evidence labels, campus specificity, and clear payment identity are visual anchors.

## 2. Semantic color palette

- Paper canvas — #F7F4ED / oklch(97.8% 0.012 95): default page background.
- Warm surface — #FFFFFF / oklch(100% 0 0): readable content and elevated surfaces.
- Charcoal ink — #202824 / oklch(17% 0.018 155): primary text, dark panels, footer.
- Muted ink — #65706A / oklch(52% 0.02 155): secondary copy and metadata.
- Quiet border — rgba(32, 40, 36, 0.12): structural rules and input borders.
- School green — #15945A / oklch(58% 0.15 153): the single accent for calls to action, links, focus rings, verified states, and active indicators.
- Caution rust — #A45C43 / oklch(52% 0.14 36): reserved for urgent status labels only, never a competing CTA.
- Pure black, neon colors, and purple/blue gradients are banned.

## 3. Typography

- Display: Avenir Next with font-weight 800–900, letter-spacing -0.05em, and line-height 0.94–1.08 for headlines.
- Body: Avenir Next / Helvetica Neue stack, 16–18px, line-height 1.6–1.7, with a 65ch maximum for reading copy.
- Metadata: Same family at 10–12px, uppercase, letter-spacing 0.16–0.22em, font-weight 800.
- Scale: body 1rem; small 0.75rem; section title clamp(2.25rem, 5vw, 4rem); hero title clamp(3rem, 8vw, 5.8rem).
- Do not use Inter, Arial, default system-font-only stacks, generic serif faces, gradient text, or all-caps paragraphs.

## 4. Spacing and containers

- Use a 4px base rhythm: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 112px.
- Container max width is 1400px with 20px mobile, 32px tablet, and 48px desktop gutters.
- Reading columns stay between 45–75 characters.
- Sections use 80–112px vertical padding on desktop and 64–80px on mobile.
- Use CSS Grid for asymmetric compositions; do not use percentage-based flex math.

## 5. Layout principles

- Home hero is a left-aligned copy / right image split, never centered text over a dark image.
- Impact uses a 12-column editorial grid with the Guardian option as the visual anchor; no equal four-card row.
- School story uses unequal image weights and a student list that reads like a register.
- High-trust content uses horizontal rules and two-column records instead of nested rounded boxes.
- Mobile is strict single-column below 768px; all images keep aspect ratios; no horizontal scrolling.
- Full-height regions use min-height with safe viewport units, never h-screen.

## 6. Buttons, cards, forms, and states

- Primary button: school green fill, charcoal or white text, 10px radius, minimum 44px height, clear verb, arrow/icon only when it clarifies continuation.
- Secondary button: transparent or white surface with a quiet border; same height as primary.
- Active state: translateY(1px) and reduced shadow.
- Focus state: 2px green outline with 3px offset.
- Cards are rectangular or lightly rounded (10–14px) and used only where elevation or grouping helps. Avoid card-on-card nesting.
- Inputs use labels above controls, 12–16px padding, visible borders, clear helper text, inline recovery guidance, and no floating labels.
- Loading uses a layout-matched skeleton or concise status; never a decorative spinner alone.
- Empty states explain why content is absent and provide a next action.
- Errors state what went wrong and how to recover without blaming the user.
- Success confirms the completed action and what happens next.

## 7. Responsive rules

- Breakpoint for intentional collapse: 768px.
- Desktop: asymmetric grids, 64–112px section rhythm, nav visible.
- Tablet: preserve hierarchy but reduce image dominance and gaps.
- Mobile: one column, 20px gutters, 44px tap targets, 16px minimum body copy, compact nav drawer, no clipped labels or overflow.
- Images use object-fit cover within fixed aspect-ratio shells; no layout shift.

## 8. Motion and performance

- Use transform and opacity only for transitions, typically 180–300ms with an ease-out curve.
- Use a small entrance cascade where it improves orientation; no perpetual decorative motion.
- Keep animation isolated to the component that owns the state.
- Respect prefers-reduced-motion: reduce.
- Avoid large blur layers, animated backgrounds, custom cursors, scroll hijacking, and layout animation that changes document flow.

## 9. Accessibility

Use semantic headings in order, landmarks, descriptive alt text, keyboard-visible focus, aria-expanded on disclosures, labels above form fields, and status text for async actions. Maintain WCAG AA contrast for body copy and controls. Do not rely on color alone to communicate urgent/waiting status.

## 10. Image and asset rules

Prefer provided Hammad Foundation logo assets and verified school imagery. Keep source URLs stable and meaningful; use explicit width, height, loading, and alt attributes. Never use broken image URLs, generic avatar placeholders, or unverified learner imagery as proof. Do not use third-party imagery if a verified local asset is available.

## 11. Banned patterns

- Do not change the written content, factual claims, route structure, payment flow, or brand meaning.
- No neon purple/blue gradients, gradient text, glows, pure black, or fake counters.
- No Inter/Arial/system-font-only premium display, generic serif faces, emojis, or custom cursors.
- No equal three-column or four-column card grids as the default pattern.
- No excessive rounded cards, nested card stacks, decorative sparklines, fake testimonials, invented names, or filler copy.
- No h-screen hero, horizontal scroll, clipped mobile content, inaccessible focus states, or animation of top/left/width/height.
- No modal unless the action genuinely needs one; no vague button labels such as “Submit” or “Click here”.

## Do not change content

The redesign may change layout, spacing, typography, component styling, image treatment, and microcopy for clarity in labels, validation, loading, and errors. It must preserve the existing written content, claims, sections, route structure, payment disclosures, and functionality.

