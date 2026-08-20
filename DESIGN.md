---
name: Velan Concast
description: The yard at golden hour — a live precast concrete yard in WebGL, written over with opaque daylight-coloured plates.
colors:
  sky-high: "#7ea6c4"
  sky-low: "#f4c98a"
  sun: "#f2a03d"
  sun-light: "#ffd0a0"
  haze: "#eec89a"
  dust: "#e8d9be"
  concrete: "#c9c3b6"
  concrete-mid: "#a8a294"
  concrete-dark: "#8a8175"
  steel: "#6f6a63"
  earth: "#a08a6a"
  shadow: "#2b2622"
  maroon: "#4c1314"
  maroon-deep: "#350d0e"
  orange: "#f57900"
  orange-text: "#a85400"
  orange-deep: "#dd8b2c"
  ink: "#221e1a"
  ink-2: "#4c453d"
  ink-3: "#6b6259"
  paper: "#f6f1e7"
  paper-2: "#ece4d6"
  paper-3: "#ddd2be"
  rule: "#cabfa9"
  rule-strong: "#8a7f6b"
  plate: "#f6f1e7"
  plate-dark: "#221e1a"
typography:
  page-title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 4.4vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  section-title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "normal"
  sub-title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1rem + 1.2vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "normal"
  figure:
    fontFamily: "Azeret Mono, ui-monospace, SF Mono, monospace"
    fontSize: "clamp(2.25rem, 1.3rem + 4vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontFeature: "tabular-nums"
  lede:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Azeret Mono, ui-monospace, SF Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.15em"
rounded:
  none: "0"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "3rem"
  s-8: "4rem"
  s-9: "6rem"
  s-10: "8rem"
  gutter: "clamp(1.25rem, 4vw, 3.5rem)"
components:
  plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(1.5rem, 4vw, 4rem)"
  plate-dark:
    backgroundColor: "{colors.plate-dark}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "clamp(1.5rem, 4vw, 4rem)"
  action:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  action-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  action-call:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  action-call-hover:
    backgroundColor: "{colors.maroon-deep}"
    textColor: "{colors.paper}"
  action-sun:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.shadow}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  action-sun-hover:
    backgroundColor: "{colors.orange-deep}"
    textColor: "{colors.shadow}"
  leader:
    backgroundColor: "transparent"
    textColor: "{colors.orange-text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "44px"
  header:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    height: "76px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.75rem 0"
    height: "48px"
  capacity-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 0.75rem"
    height: "44px"
  capacity-chip-current:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.paper}"
---

# Design System: Velan Concast

## Overview

**Creative North Star: "The Yard at Golden Hour"**

The site is a working precast concrete yard in Coimbatore at five in the afternoon, and the visitor is standing in it. One persistent WebGL canvas (`components/scene/SceneRoot.jsx`) is fixed behind every page: rows of cast sumps stacked two high on compacted earth, a gantry crane crossing the haze at z −30, a maroon lorry loaded at the gate, dust drifting in the light, and a low sun off frame left throwing shadows toward the camera. Navigation never swaps a backdrop — it moves the camera to a different station in the same yard. The DOM is not part of that world: it writes on top of it, on opaque slabs of daylight-coloured card. This is the whole compositional idea, and every other rule in this file exists to protect it.

The tone is a contractor's drawing set, not a brochure. Everything is square (`--rounded: 0` everywhere; there is not one `border-radius` in the build except explicit `border-radius: 0` resets on form controls and range thumbs). Separation is done with hairlines and a maroon top rule, never with shadow, never with transparency. Every number in the interface — capacities, phone numbers, stats, step indices — is set in Azeret Mono with `font-variant-numeric: tabular-nums`, so figures read as measured quantities rather than marketing. Brand maroon `#4c1314` is the plate rule and the call stamp; the sun `#f2a03d` belongs to the render and is allowed into the DOM only on dark plates.

The build refuses the default WebGL product page — a spinning grey model on a studio sweep. Even the two small inline scenes (the casting sequence and the capacity configurator) mount a sky dome and exponential fog from `components/scene/Horizon.jsx` so a pour happens outdoors under the same sun. It also refuses decoration that carries no fact: no gradients, no glass, no photograph standing in for a product that has none.

**Key Characteristics:**
- One persistent 3D yard behind an opaque, scrolling DOM — never blur, never alpha
- Zero corner radius; hairline rules and a 3px maroon top rule instead of elevation
- Archivo for prose, Azeret Mono for every figure and every label
- Uppercase 0.15em-tracked mono labels as the only small-type voice
- The phone number is the primary action and is present at every scroll position
- Full function with zero 3D: WebGL, quality and reduced-motion are all gated

## Colors

A single palette serves both the render and the DOM: `PALETTE` in `components/scene/geometry.js` carries the same hex values as the `:root` custom properties in `app/globals.css`, because the sun in the scene and the sun in the CSS must be one colour.

### Primary
- **Brand Maroon** (`--maroon`): The plate's 3px top rule, every `.page-title` and `.section-title`, the filled call stamp (`.action--call`), the current capacity chip, the active nav link, form error text and invalid field underlines. Also the lorry body and the rebar in the render. It is the only colour allowed to mean "this is Velan".
- **Pressed Maroon** (`--maroon-deep`): Hover/press state of `.action--call` only.

### Secondary
- **Sun** (`--sun`): The raking 5pm light. In the render it is the directional-light key and the sky ramp; in the DOM it is the top rule of `.plate--dark`, the `.section-title` on dark plates, `.figure--sun`, the footer company name, and dark-plate leaders and links.
- **Signal Orange** (`--orange`): Interaction chrome only — the 2px focus outline (`--focus`), the active nav underline, range-slider thumbs, the underline beneath `.leader`, and the focused field's 2px bottom border.
- **AA-Safe Orange** (`--orange-text`): The text form of orange on light grounds — `.label--orange`, `.leader`, required-field asterisks, `.about-cap-no`, the brochure download link.
- **Pressed Sun** (`--orange-deep`): Hover/press state of `.action--sun` only.

### Tertiary — the yard's own materials
- **Concrete** (`--concrete`), **Concrete Mid** (`--concrete-mid`), **Concrete Dark** (`--concrete-dark`): The cast face in light, in half light, in shadow. Render-side (`MeshStandardMaterial` roughness 0.92–0.94, metalness 0).
- **Earth** (`--earth`): Compacted yard ground. Also the `<body>` background, so the page behind a failed canvas is still standing on the yard.
- **Sky High / Sky Low / Haze / Sun Light / Dust / Steel / Shadow** (`--sky-high`, `--sky-low`, `PALETTE.haze`, `PALETTE.sunLight`, `--dust`, `PALETTE.steel`, `--shadow`): Zenith, horizon, `fogExp2` colour, key-light tint, dust points and dark-plate labels, gantry steel, and the long-shadow near-black that `.action--sun` uses for its text.

### Neutral
- **Ink** (`--ink`): Body text on light plates; `.plate--dark` background.
- **Ink 2** (`--ink-2`): Ledes, secondary body, field labels, default nav link.
- **Ink 3** (`--ink-3`): `.label` default, table headers, captions, citations.
- **Paper** (`--paper`): Text on dark plates; the light plate surface itself.
- **Paper 2** (`--paper-2`): The only secondary fill — the empty-photo slot and chip hover.
- **Paper 3** (`--paper-3`): Secondary text on dark plates (dark-plate ledes, footer addresses, placeholders).
- **Rule** (`--rule`) / **Rule Strong** (`--rule-strong`): The two hairline weights. `--rule` divides items inside a block; `--rule-strong` divides a block from its neighbour and draws the border of every canvas stage and image frame.

### Named Rules

**The Opaque Plate Rule.** `--plate` and `--plate-dark` are fully opaque hex — no alpha channel, no `backdrop-filter`, no `opacity` on a plate, ever. Text over a live 3D scene must never be modulated by what the camera happens to be looking at, and blurring a running canvas is the single most expensive thing this site could do. Separation from the yard comes from the maroon top rule.

**The Orange Text Rule.** `--orange` is for chrome that is not read (focus rings, underlines, slider thumbs). Any orange that is *read* on a light ground uses `--orange-text`. Setting `--orange` as a text colour on `--paper` is a contrast failure.

**The Sun-On-Dark Rule.** `--sun` may only be used on `--plate-dark`. On paper it fails contrast; on ink it is the point of the world.

**The One Palette Rule.** No hex literal may appear in a component. If the render needs a colour, it comes from `PALETTE`; if the DOM needs one, it comes from a `:root` token; and when the same material exists in both, the two values are identical by hand.

## Typography

**Text Font:** Archivo (`--font-text`, weights 400/500/600, via `next/font/google`, `display: swap`)
**Figure & Label Font:** Azeret Mono (`--font-fig`, weights 400/500)

**Character:** Archivo is a grotesque with enough width to survive uppercase at display size; Azeret Mono is a squarish mono whose digits look stamped rather than typeset. The pairing reads as a drawing sheet — prose in the notes, quantities in the schedule.

### Hierarchy
- **Page title** (`.page-title`, 600, `--t-h1` `clamp(2.5rem, 1.5rem + 4.4vw, 4.75rem)`, line-height 0.98, tracking −0.01em, uppercase, maroon): the one and only H1 treatment.
- **Section title** (`.section-title`, 600, `--t-h2` `clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)`, uppercase, maroon; `--sun` inside `.plate--dark`): every H2, always via `SheetHead`.
- **Sub-title** (`--t-h3` `clamp(1.25rem, 1rem + 1.2vw, 1.75rem)`): product names in the schedule, project titles, footer company name, pull-quotes.
- **Figure** (`.figure`, Azeret Mono 500, `--t-figure` `clamp(2.25rem, 1.3rem + 4vw, 4.5rem)`, line-height 0.9, tracking −0.02em, tabular): every headline quantity — stats, client count, selected capacity, phone numbers on the contact page.
- **Lede** (`.lede`, `--t-lead` 1.1875rem, `--ink-2`, `max-width: var(--measure)` = 64ch): the one paragraph under a section head.
- **Body** (`--t-body` 1.0625rem, line-height 1.6): running prose.
- **Small** (`--t-small` 0.8125rem): captions, footer addresses, step notes.
- **Micro** (`--t-micro` 0.625rem, Azeret Mono, tracking `--track-label`): the one step below Label — the CALL kicker in the header stamp and the two-digit step numbers on the scrub controls. Nothing else may use it.
- **Telephone** (`--t-tel` `clamp(1.75rem, 1rem + 3vw, 3rem)`, Azeret Mono, `white-space: nowrap`): the contact page's phone numbers. A separate step from `--t-figure` for one reason — at 375px `--t-figure` breaks "+91 97158 19000" across two lines, and a phone number that wraps is a phone number nobody dials.
- **Label** (`.label`, Azeret Mono 500, `--t-label` 0.6875rem, tracking `--track-label` 0.15em, uppercase, `--ink-3`; `--dust` inside `.plate--dark`): the only small-type voice in the system — section kickers, table headers, field labels, button text, hints, citations.

### Named Rules

**The Single H1 Rule.** Every page has exactly one `<h1>`, and it is `.page-title`. Four different H1 treatments across six pages was the loudest inconsistency in the first pass; a seventh page adds a seventh `.page-title`, not a seventh idea. (The home hero is the one live exception — see Known inconsistencies.)

**The Mono Figure Rule.** If it is a quantity — litres, years, a count, a phone number, a step index, a spec-sheet size — it is set in `--font-fig` with `font-variant-numeric: tabular-nums`. Prose never carries a figure in the text face.

**The Uppercase-Is-Mono Rule.** Uppercase in Archivo is reserved for titles (`.page-title`, `.section-title`). Every other uppercase string in the build is Azeret Mono at `--t-label` with 0.15em tracking. There is no third small-type style.

## Layout

Two wrappers do all the structural work:

- **`.sheet`** — `max-width: var(--sheet-max)` (82rem), centred, `padding-inline: var(--gutter)` (`clamp(1.25rem, 4vw, 3.5rem)`). The header inner row, the footer grid and every page section use it. Nothing sets its own page margin.
- **`.section`** — `padding-block: clamp(var(--s-8), 8vw, var(--s-10))`, i.e. 4rem–8rem. This vertical air *is* the gap between plates.

Inside those, spacing comes only from the `--s-1`…`--s-10` ramp (0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8 rem) applied through `.stack-2`…`.stack-7`, `.row`, or a grid `gap`. Plate padding is `clamp(var(--s-5), 4vw, var(--s-8))`.

Page composition is a vertical stack of `<section class="section"><div class="sheet"><div class="plate">…`. Plates never touch: the `.section` block padding leaves 4–8rem of open yard between them, which is where the 3D scene is actually seen. `/products` goes further — `.products-page` is a `3fr 2fr` grid above 64rem with every `.section` pinned to column 1, deliberately leaving the right 40% of the route empty so the yard shows down that side.

Breakpoints observed in the build: 560px (footer to one column), 640px (form and two-up grids collapse), 720px (casting steps 6→3 columns), 860px (configurator stacks), 900px (hero figures and home proof stack; also the `pickQuality` "narrow" cutoff), 980px (header nav → drawer), 40rem/48rem/64rem in page-level CSS. There is no breakpoint token; each stylesheet writes its own.

Two edge-to-edge escapes exist and both are deliberate: `.contact-numbers` bleeds with `margin-inline: calc(-1 * var(--gutter))` to buy a 15-character phone number a single line at 375px, and `.tb` (the footer) spans the full viewport width with its content still inside a `.sheet`.

### Named Rules

**The Gap Rule.** Plates must leave gaps. A page whose plates run edge to edge with no `.section` breathing space has hidden the product; the yard between the plates is what the site is selling.

**The Narrow Plate Rule.** A plate that carries reading matter stays narrow — `.lede` is capped at 64ch, `.hero-plate` at 40rem, notes at 34–56ch. Wide plates are reserved for schedules and grids.

## Elevation & Depth

**There are no shadows in the DOM.** Not one `box-shadow` in any stylesheet (the enquiry form explicitly sets `box-shadow: none` on focus). Depth in the interface is entirely tonal and structural: a light plate (`--plate`) or a dark plate (`--plate-dark`) laid on the live 3D yard, separated from it by a 3px top rule, and divided internally by 1px hairlines in `--rule` or `--rule-strong`.

All real shadows live in the render, where they are physical: a single `directionalLight` at `[-26, 6.2, 10]`, intensity 4.2, colour `PALETTE.sunLight`, `castShadow`, `shadow-bias -0.0006`, ortho frustum ±20 × ±12 × far 60, map 1024² at high quality and 512² otherwise, plus a `hemisphereLight` (sky over earth, 0.8) and a weak warm bounce from below. Tone mapping is `ACESFilmic` at exposure 1.32 on the main canvas.

### Named Rules

**The Flat-DOM Rule.** Elevation is a property of the yard, not of the page. If a DOM element needs to feel lifted, it becomes a plate — it never grows a shadow.

**The Two-Weight Hairline Rule.** Exactly two rule weights exist. `--rule` (1px, `#cabfa9`) separates rows inside a block; `--rule-strong` (1px, `#8a7f6b`) separates blocks and frames canvases and images. A third weight is a new decision, not a tweak.

## Shapes

Zero radius everywhere. Buttons, chips, plates, inputs, canvas frames, range thumbs and the empty-photo slot are all square; the only `border-radius` declarations in the build are `0` resets that undo UA styling on `input`, `select` and slider thumbs.

Borders carry all the form language, and they are directional by intent:
- **Top rule, 3px:** `.plate` (maroon) and `.plate--dark` (sun). This is the plate's signature.
- **Bottom rule, 2px:** the sticky header (maroon), the active nav link (orange), a focused field (orange).
- **Hairline, 1px:** everything else — table rows, list items, canvas stages, image tops, footer cell dividers, chip outlines.

Image and canvas aspect ratios are fixed rather than intrinsic: `16/10` for the casting stage, `4/3` for the configurator stage and the mobile map, `16/9` for the map above 48rem, `1200/573` for product thumbnails and their empty slots.

The recurring silhouette in the render is the product itself: `makeTankGeometry()` builds a tank as one extruded ring with a hole plus a base slab cast in the same pour — never a box assembled from six planes — because a single continuous mould is the entire sales claim.

### Named Rules

**The Square Rule.** Radius is zero. A rounded corner in this world is a different product being sold.

**The One-Sided Border Rule.** A border may be one-sided, but only as a hairline or as the plate's 3px top rule. A thick coloured bar down one side of a block is decoration the system never asked for — a 3px maroon left border was removed from `.about-testimonial` for exactly this, and replaced with the hairline `border-top` every other block uses.

## Components

### Plates (`.plate`, `.plate--dark`)
The system's only container. Light plate: `--plate` background, 3px maroon top rule, `clamp(1.5rem, 4vw, 4rem)` padding. Dark plate: `--plate-dark` background, 3px sun top rule, `--paper` text, and it re-colours its own contents (`.label` → `--dust`, `.lede` → `--paper-3`, `.section-title` → `--sun`, and the whole enquiry form inverts). `.plate--dark` is standalone-safe: it carries its own background and padding whether or not `.plate` is on the same element. Both spellings appear in the build (`plate plate--dark` and bare `plate--dark`) and both are correct.

Dark plates are rationed to one per page and reserved for the thing that must be answered: the contact numbers, the home proof figure, the about stat band, the brochure CTA.

### Buttons (`.action`)
- **Shape:** square, 1px border, `min-height: 48px`, `padding: var(--s-3) var(--s-5)`, label typography (mono, 0.6875rem, 0.15em, uppercase).
- **Default:** transparent on `--ink` border and text; on hover it fills `--ink` with `--paper` text (140ms `--ease` `cubic-bezier(0.22, 0.61, 0.36, 1)`).
- **`.action--call`:** filled maroon with paper text — the phone number, the primary action of the whole site. Hover fills `--maroon-deep`. It appears in the sticky header at every scroll position.
- **`.action--sun`:** filled `--sun` with `--shadow` text, hover `--orange-deep`. For a dark plate only.
- **`.leader`:** the text link form — mono label in `--orange-text` (or `--sun` on dark) with a 1px `--orange` bottom border, `min-height: 44px`. Used for "read more" navigation, never for the primary action.

### Navigation (`.hdr`)
Sticky at `top: 0`, `z-index: 20`, opaque `--plate-solid` with a 2px maroon bottom rule and `min-height: 76px`. A three-column grid: logo, centred nav, call stamp + WhatsApp. Links are mono labels in `--ink-2`, 44px tall, with a transparent 2px bottom border that becomes `--rule-strong` on hover and `--orange` when active (active also turns the text maroon and sets `aria-current="page"`). Below 980px the nav and WhatsApp link disappear, a 48×48 `.hdr-toggle` appears, and a `hidden`-toggled drawer lists the pages plus all three phone numbers as 52px rows.

### Title block (`.tb`, the footer)
The last plate of the page, styled as a drawing's title block: dark plate, 3px sun top rule, a `1.4fr 1fr 1fr 1fr` grid of four cells (Manufacturer / Telephone / Pages / Supplied across) divided by vertical rules, collapsing to 2 columns at 900px and 1 at 560px. The nav's sheet numbers (`A-01`…`A-06` in `lib/site.js`) are carried in the markup but hidden (`.tb-set .sheet-no { display: none }`).

### Fields (`.ef`)
The enquiry form reads as a filled-in schedule, not a set of boxes: mono uppercase label above, value written on a 1px ruled line, no box, no radius, `min-height: 48px`, transparent background. Hover darkens the rule to `--ink-2`; focus replaces it with a 2px `--orange` bottom border and keeps a real `:focus-visible` outline at 6px offset for keyboard users who never hover. `[aria-invalid='true']` turns the rule 2px maroon and an `.ef-error` mono line appears beneath. Two columns above 640px, one below; `.ef--compact` is always one column.

### Chips (`.cfg-cap`)
Capacity selectors: 44px tall, square, 1px `--rule-strong` outline, mono label in `--ink-2`. Hover fills `--paper-2`. The current one fills `--maroon` with `--paper` text and sets `aria-pressed`.

### Schedule (`.schedule`, `.schedule-list`)
Tabular data with `border-collapse: collapse`, no zebra: mono uppercase headers over a `--rule-strong` line, rows divided by `--rule`, figures in `.figure-cell` (mono, tabular, maroon). The product list is the same idea as flex rows — an index number in `--rule-strong` at `--t-h3`, the body, and a 140px thumbnail.

### The empty photograph slot (`.schedule-row__empty`)
The signature honesty component. Five of the twelve products carry `image: null` in `lib/site.js`; those rows render a 140px × `1200/573` box filled `--paper-2` with a `--rule-strong` outline and one centred mono label reading "No photograph published". It occupies the exact footprint a real photograph would. Never fill it with a stock image, a stand-in from another product, or a gradient.

### Scene stages (`.cast-stage`, `.cfg-stage`)
An inline canvas is framed like a plate detail: 1px `--rule-strong` border, fixed aspect ratio, `overflow: hidden`, `touch-action: pan-y` on the canvas so a drag never steals the page scroll, and `max-width: 100%` on both frame and canvas so a canvas can never widen the page. A mono `.label` hint on an opaque `--plate-solid` chip sits in a bottom corner ("Drag to look around", "figure is 1.7 m"). Range scrubs are 44px tall with a 2px `--rule-strong` track and a 4×28px square `--orange` thumb.

### The persistent yard (`.scene-layer`)
`position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none`, `aria-hidden="true"`, with `.page` at `z-index: 1` scrolling over it. `overflow: hidden` because a canvas must never become a scroll source; `pointer-events: none` because the yard is scenery, not a control.

## The 3D system

**One persistent canvas, plus at most one lazily-mounted inline canvas.** `SceneRoot` owns the fixed yard. Inline scenes (`CastingSequence`, `Configurator`) each wrap their `<Canvas>` in `LazyCanvas`, which mounts children only when an `IntersectionObserver` with `rootMargin: '200px 0px'` reports them near the viewport and unmounts them when they leave. Three live WebGL contexts on one page collapsed the frame rate to single digits; that is the reason, and it is why a seventh page may add at most one more inline scene.

**Camera stations.** `STATIONS` in `SceneRoot.jsx` maps each route to `{ pos, look }`, chosen so the page's plate never sits over the busiest part of the frame:

| Route | position | look at |
|---|---|---|
| `/` | `[-1.4, 1.62, 4.2]` | `[2.2, 1.35, -9]` — eye height, standing in the aisle |
| `/products` | `[4.4, 1.55, 6.4]` | `[1.6, 1.05, 2.2]` — on the hero unit |
| `/projects` | `[-5.5, 2.4, -4]` | `[-2, 6.5, -30]` — up at the gantry |
| `/about` | `[2, 9.5, 16]` | `[0, 0.5, -14]` — high, the whole yard |
| `/brochure` | `[3.8, 1.5, 5.6]` | `[1.6, 1.0, 2.2]` |
| `/contact` | `[11.5, 1.7, 2.5]` | `[7, 1.4, -12]` — over by the lorry and the gate |

Camera is `fov: 42, near: 0.1, far: 220`. A new page adds a station; an unmapped route falls back to `/`. The spine lerps toward the station at `1 - 0.0015^delta` and walks the camera further into the yard on scroll (`z -= scroll × 7`, `y += scroll × 1.6`), with `scrollHeight` cached on resize so no scroll frame forces layout.

**Frameloop.** The persistent canvas runs a continuous loop (drifting dust, camera easing). Both inline canvases use `frameloop="demand"` and must call `invalidate()` themselves: on state change (`useEffect` on `stage` / `litres`) and again every frame while a value is still settling. A demand canvas that changes state without an `invalidate()` renders nothing.

**Quality tiers** (`pickQuality()` in `capability.js`, from `hardwareConcurrency`, `deviceMemory` and a 900px width check):

| Tier | condition | drops |
|---|---|---|
| `low` | width < 900, or ≤4 cores, or ≤4 GB | shadows off, `dpr [1,1]`, antialias off, 3 rows × 6 units instead of 6 × 9, 60 dust points instead of 260 |
| `medium` | ≤8 cores | hard shadows (`shadows` true) at 512² map, `dpr [1,1.5]` |
| `high` | otherwise | soft shadows at 1024² map |

**Determinism.** Nothing in the yard uses `Math.random()`. Unit placement jitter is `(((r*7 + i*13) % 7) - 3) * 0.014` and dust scatter is index arithmetic, so the scene is byte-identical on every load — a screenshot taken today matches one taken tomorrow.

**Everything is procedural.** No downloaded models, no HDRI, no textures. The sky is one inverted 160-unit sphere carrying the 5pm ramp in vertex colour with `fog={false}` and `toneMapped={false}`; atmosphere is `fogExp2` at density 0.014 (0.02 for inline scenes).

### Named Rules

**The Same Yard Rule.** Navigation moves the camera; it never swaps a scene. Any new page gets a station in the existing yard.

**The Same Sun Rule.** Every canvas in the build mounts `GroundAndSky` (or the main `SkyDome`) and lights with `PALETTE.sunLight` from a low angle. A studio sweep behind a floating grey model is the exact artifact this world exists to refuse.

## Accessibility and fallback contract

The site is fully usable with zero 3D. Nothing — no fact, no navigation, no call to action — exists only inside a canvas.

- **`hasWebGL()` gates every canvas.** `SceneRoot` renders `ScenePoster` (a real photograph of the real yard, `object-fit: cover`, `alt=""`, `aria-hidden`) both before hydration and whenever WebGL is unavailable. `CastingSequence` and `Configurator` render *no* canvas at all when it is unavailable — the scrub, the six named stages with their notes, the capacity chips, the caveat and the spec-sheet download all remain, because the DOM carries the information and the canvas only illustrates it.
- **`prefersReducedMotion()`** freezes the drifting dust, sets the camera lerp factor to 1 so a route change snaps to its station instead of flying across the yard, and makes the pour and the resize arrive instantly. CSS additionally clamps all animation and transition durations to 1ms under `prefers-reduced-motion: reduce`.
- **Opaque plates** are an accessibility rule, not a stylistic one: contrast is measurable only because the background is a known constant.
- **44px minimum targets**, 48px for anything typed into or pressed hard: `.action` 48, `.leader` 44, nav links 44, drawer rows 52, the mobile toggle 48×48, range scrubs 44, chips 44, and `a[href^='tel:']` is globally forced to a 44px inline-flex target so a phone number is never running text.
- **One `<h1>` per page**, `.page-title`, plus a `.skip-link` that parks off-screen and lands at `--s-4` on focus.
- **Real labels.** Every form field has a visible `<label>`; every range has a `<label>` (visually hidden on the configurator) and an `aria-valuetext`; live regions (`aria-live="polite"`) announce the stage note and the selected capacity; errors are wired with `aria-invalid` and `aria-describedby`.
- **Focus is never removed.** `--focus` is `2px solid var(--orange)` at 3px offset globally, 6px inside the form.
- **`aria-hidden="true"` on `.scene-layer`** — the yard is decorative to a screen reader by construction.

## The honesty rules

- **`lib/site.js` is the single fact source.** Every figure, phone number, capacity, product name and address on the site is carried verbatim from the business's own published material. Nothing in that file may be invented, rounded or embellished, and no component may hard-code a fact that belongs there.
- **`image: null` means no photograph exists.** Five products (bus shelter, toilets & urinals, box culverts, staircase, traffic barriers) carry it and render the labelled empty slot. A stand-in photograph is a lie about the product.
- **The configurator shows published capacity only.** The six `specSheets` entries and their downloadable PDFs are real. `tankForCapacity()` derives a plausible transportable cuboid from the volume, and the DOM says so out loud in `.cfg-caveat`: "Capacity is the published figure. The shape shown is indicative — the specification sheet carries the dimensions." No width, depth or height is ever stated as spec.
- **The render may not assert a fact the business has not published.** The yard's stock count, the gantry and the lorry are scenery at yard scale, not an inventory claim; the 1.7 m figure is labelled as such.

## Do's and Don'ts

### Do:
- **Do** put every new surface on a `.plate` inside `.sheet` inside `.section`, and let the section padding leave 4–8rem of open yard between plates.
- **Do** add a camera station to `STATIONS` for any new route, and pick `pos`/`look` so the plate does not cover the busiest part of the frame.
- **Do** set every quantity in `--font-fig` with `font-variant-numeric: tabular-nums`.
- **Do** use `.page-title` for the page's single `<h1>` and `SheetHead` for every section head.
- **Do** gate any new canvas on `hasWebGL()`, wrap it in `LazyCanvas`, run it `frameloop="demand"`, and call `invalidate()` on every state change and every settling frame.
- **Do** honour `prefersReducedMotion()` by arriving at the end state immediately rather than by animating faster.
- **Do** keep every interactive target at 44px minimum, 48px for buttons and fields.
- **Do** take colours from `:root` in the DOM and from `PALETTE` in the render, and keep the two identical for any material that exists in both.
- **Do** render a labelled empty slot when a fact or an asset does not exist.

### Don't:
- **Don't** use `backdrop-filter`, `blur()`, or any alpha on a plate over the canvas. Text legibility would then depend on the current camera frame, and blurring a live canvas is the most expensive effect this site could ship.
- **Don't** add a `box-shadow` anywhere in the DOM. Shadows belong to the sun in the render; the interface is flat by construction.
- **Don't** put a thick one-sided coloured border on a block. A 3px maroon left border was removed from `.about-testimonial` for exactly this — it was decoration that carried no information, and the hairline `border-top` every other block uses replaced it.
- **Don't** use a gradient as decoration. The only ramp in the build is the sky dome's vertex colour, which is the physical sky.
- **Don't** hard-code a colour, a font stack or a spacing value in a component. If the value does not exist as a token, decide whether it should.
- **Don't** state a dimension, a capacity, a client count or a year that is not in `lib/site.js`.
- **Don't** substitute a photograph for a product that has none, and don't crop another product's photo to fill the gap.
- **Don't** put `--orange` on light-ground text (use `--orange-text`) or `--sun` on a light plate (dark plates only).
- **Don't** mount a second inline canvas on a page that already has one, and don't let the persistent yard become a third live context on the same route.
- **Don't** give anything a `border-radius`.
- **Don't** let a canvas take pointer events outside a marked interactive stage, or become a scroll or width source.

## Known inconsistencies

These are real in the shipped build. They are recorded as defects, not as rules to inherit.

1. **`--rule-thin` does not exist.** `components/enquiry-form.css:36` sets `border-bottom: 1px solid var(--rule-thin)`, and no such token is defined in `app/globals.css`. The invalid custom property makes the whole shorthand fall back to `none`, so the resting underline of every field on a light plate is missing until hover or focus. Fix by using `--rule-strong` (or defining the token), not by documenting the missing line as a style.
2. **The home page's `<h1>` bypasses `.page-title`.** `app/page.jsx` uses `.hero-h1` (`app/home.css`), which duplicates `.page-title`'s size, colour, tracking and line-height. The rendered result matches, but the rule has a second implementation that can drift. `.hero-h1` should be `.page-title hero-plate-title` or simply `.page-title`.
3. **`--paper`, `--plate` and `--plate-solid` are three names for `#f6f1e7`**, and `--ink` and `--plate-dark` are two names for `#221e1a`. Component CSS picks among them inconsistently (`.hdr` and `.cast-hint` use `--plate-solid`; `.plate` uses `--plate`).
4. **Hard-coded colours survive in two places** despite the ban: `rgba(246, 241, 231, 0.16)` for the footer's internal dividers in `components/title-block.css`, and `#3b3630` for the sling line in `CastingSequence.jsx`. Both should be tokens (`--paper` at alpha, `PALETTE.shadow`).
5. **`--rule` (a light-ground hairline) is used on a dark plate** in `app/contact/contact.css` (`.phone-row + .phone-row`). It reads, but it is the wrong token for that ground.
6. **The quality tier does not reach the gantry or the lorry.** `Gantry` and `Lorry` in `Yard.jsx` accept a `quality` prop and never use it; only the stock rows and the dust count actually respond to the tier.
7. **`--orange-deep` is declared in the "Surfaces the DOM writes on" block** in `globals.css` although it is a brand hover colour; grouping only, no visual effect.
8. **Breakpoints are not tokenised.** Nine distinct media-query widths appear across the stylesheets in both `px` and `rem`. Match a neighbouring file rather than inventing a tenth.
