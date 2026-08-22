# Product content gaps

What the current site publishes per product, and where the new product sheets
(`/products/<slug>`) have nothing true to show. Nothing here was invented to
fill a gap, and nothing wrong was carried across — see `lib/product-detail.js`.

These need the owner, not the build.

## 1. No description exists for any product

All twelve product pages share **one identical paragraph** ("VELAN CONCAST has
compiled traditional civil engineering parameters…"). There is no per-product
description anywhere on the site. The new sheets lead with the short product
note from `lib/site.js` instead.

**Needs:** two or three sentences per product, in the owner's words.

## 2. Three products publish nothing

| Product | What the source page has |
| --- | --- |
| `concast-house` | 8 photographs, no copy of any kind |
| `box-culverts` | nothing — no copy, and no photographs of its own |
| `staircase` | nothing on its own page |

The staircase copy does exist, but it sits on the **Other Products** page, not
the staircase page. It has been carried onto the staircase sheet where it
belongs.

**Needs:** advantages and specification for all three, and photographs for
`box-culverts`.

## 3. The bus shelter page carries the wrong specification

`precast-concast-bus-shelter-in-coimbatore.php` publishes the **septic tank**
specification verbatim — wall thickness 175/150 mm, bottom slag, top slab,
steel reinforcement, manhole 600 mm × 600 mm, baffle wall thickness, and
"inlet and outlet holes are provided at site as per needs".

A bus shelter has no baffle wall, manhole, or inlet and outlet holes. This is a
copy-paste error on the live site. It is **not** reproduced on the new sheet,
which says the specification is not published and asks for a call.

**Needs:** the real bus shelter specification, or confirmation to leave it off.

## 4. Image filenames do not describe their contents

Several product photographs are filed under unrelated names — the bus shelter
images are stored as `precast electrical-chambers-in-*.webp`, and the toilet
images as `precast-concast-house-in-*.webp`. The pictures themselves are
correct; only the filenames are wrong. Do not reason about these images from
their filenames.

Some product images are also 3D renders rather than photographs, so the sheets
title that section "Views" rather than "Photographs".
