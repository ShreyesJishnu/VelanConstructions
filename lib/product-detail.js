// Per-product detail, curated from the pages the current site publishes.
// Every string here is VERBATIM from those pages (see PRODUCT.md: facts are
// carried, never restated, rounded or embellished). The only editorial act is
// sorting each line into the bucket the old site itself used — Applications,
// Advantages, Specifications — and splitting a spec line into label + value
// where the source sentence is already in "Label value." form.
//
// `gap` marks a product whose source page publishes nothing usable. Those
// pages render a sparse sheet that asks for a call. Nothing is invented to
// fill them, and nothing wrong is carried over. See PRODUCT-GAPS.md.

const IMG = 'velan-mist/images-mist/images/webimages/products/'

export const detail = {
  sump: {
    advantages: [
      'Smooth and clean design. Rapid, economical and safe installation.',
      'Reduces health and safety risks on site.',
      'Suitable for adoptive land and private pumping stations.',
      'Superior hydraulic performance.',
      'Reduces construction time and costs.',
      'Readily available.',
    ],
    images: [
      'precast-concrete-products-in-karumathampatti.webp',
      'precast-concrete-products-in-sitra.webp',
      'precast-concrete-products-in-avinasi-road.webp',
    ],
  },

  'septic-tanks': {
    specs: [
      'M40 grade concrete.',
      { label: 'Wall thickness', value: '175 mm bottom, 150 mm top' },
      { label: 'Bottom slag thickness', value: '150 mm' },
      { label: 'Top slab thickness', value: '115 mm' },
      { label: 'Steel Reinforcement', value: 'Fe 500 grade. (10 mm, 8 mm double layer)' },
      { label: 'Manhole size', value: '600 mm * 600 mm' },
      { label: 'Baffle wall thickness', value: '100 mm' },
      'Inlet and Outlet holes are provided at site as per needs.',
    ],
    images: [
      'septic-tank1.webp',
      'precast-sump-in-coimbatore.webp',
      'precast-concrete-products-in-kaniyur.webp',
    ],
  },

  customized: {
    advantages: [
      'Offers a cool, clean and healthy environment for household water',
      'Won’t affected by fire or climatic issues',
      '100 % Leak Proof',
      'Won’t need to fix restraints in high wind areas',
      'Can be buried or partially buried in confined or restricted situations',
      'Manufactured with high quality concrete and raw material in a controlled environment',
    ],
    specs: [
      'M40 grade concrete.',
      { label: 'Wall thickness', value: '175 mm bottom, 150 mm top' },
      { label: 'Bottom slag thickness', value: '150 mm' },
      { label: 'Top slab thickness', value: '115 mm' },
      { label: 'Steel Reinforcement', value: 'Fe 500 grade. (10 mm, 8 mm double layer)' },
      { label: 'Manhole size', value: '600 mm * 600 mm' },
    ],
    images: [
      'precast-sump-in-avinasi-road.webp',
      'customized-water-tank6.webp',
      'customized-water-tank4.webp',
      'customized-water-tank5.webp',
      'precast-sump-in-karumathampatti.webp',
      'precast-sump-in-sitra.webp',
    ],
  },

  'stp-etp': {
    advantages: [
      'Effective treatment of sewage and industrial wastewater.',
      'Supports water recycling and reuse applications.',
      'Helps comply with environmental regulations and standards.',
      'Reduces freshwater consumption and operating costs.',
      'Durable precast concrete structure for long service life.',
      'Low maintenance and reliable system performance.',
      'Suitable for residential, commercial, and industrial projects.',
    ],
    images: ['stp-etp1.webp', 'stp-etp2.webp', 'stp-etp3.webp', 'stp-etp4.webp'],
  },

  'cabin-room': {
    // The source runs these together in a single list item; split on the
    // capitalised entries it already contains. No wording added.
    applications: [
      'Cabin office', 'Earthquake proof shelters', 'Security cabin', 'Site office',
      'Remote offices', 'Remote police station', 'Controlled Climate Concrete',
    ],
    specs: [
      { label: 'Wall thickness', value: '115 mm' },
      { label: 'Top slab thickness', value: '115 mm' },
      { label: 'Steel Reinforcement', value: 'Fe 500 grade. (10 mm, 8 mm double layer)' },
      { label: 'Bottom tie beam size', value: '250 MM * 250 MM' },
      'UPVC doors and windows',
      'Tiled Flooring & Provisions for Electric lines',
    ],
    sizes: ["20'00 * 11'00", "17'00 * 11'00"],
    images: [
      'precast-sump-in-kaniyur.webp',
      'precast-cabin-room-in-arasur.webp',
      'precast-cabin-room-in-coimbatore.webp',
      'precast-cabin-room-in-neelambur.webp',
    ],
  },

  'concast-house': {
    gap: 'The source page publishes photographs only — no advantages, specification or applications.',
    images: [
      'precast-concast-house-in-arasur.webp',
      'concast-house8.webp',
      'precast-concast-house-in-neelambur.webp',
      'precast-concast-house-in-coimbatore.webp',
      'precast-cabin-room-in-karumathampatti.webp',
      'precast-cabin-room-in-avinasi-road.webp',
      'precast-cabin-room-in-kaniyur.webp',
      'precast-cabin-room-in-sitra.webp',
    ],
  },

  'bus-shelter': {
    // The source page carries the septic tank specification verbatim — baffle
    // wall, manhole, inlet/outlet holes. A bus shelter has none of those, so it
    // is not reproduced here. Its photographs are of electrical chambers.
    gap: 'The source page carries another product’s specification, so no specification is shown here.',
    images: [
      'precast electrical-chambers-in-arasur.webp',
      'precast electrical-chambers-in-karumathampatti.webp',
      'precast electrical-chambers-in-sitra.webp',
    ],
  },

  toilets: {
    applications: [
      'Across Highways', 'Urban Local Bodies Area', 'Municipal Committee Area',
      'Large Industrial plots', 'Fuel / Gas Stations', 'Construction Sites',
      'Village Houses', 'Government Schools',
    ],
    advantages: [
      'Increases productivity and decreases labour costs by providing conveniently located toilets boosts worker morale and protects workers.',
      'A flexible and low-cost way to meet regulations.',
      'Easy to shift, eliminates ongoing maintenance costs.',
      'Improves customer satisfaction and keeps them on-site longer, limits vandalism and the recreation manager can purchase service without capital outlay.',
      'Promotes goodwill in organized events by taking care of hygiene in sanitation projecting a positive public image.',
      'Environmentally friendly.',
      'Safe and weather resistant.',
      'UV-resistant. Can be used under sunshine for more than 10 years.',
      'Different color options.',
    ],
    images: [
      'precast-concast-house-in-karumathampatti.webp',
      'precast-concast-house-in-sitra.webp',
      'precast-concast-house-in-avinasi-road.webp',
    ],
  },

  trenches: {
    applications: ['Sanitary Sewer Structures', 'Storm Drainage Structures'],
    advantages: [
      'Based on the order we cast at site',
      'Durability',
      'Versatility',
      'Speed, Cost effective',
      'Ease of Installation',
      'No special backfill required',
      'The strength is designed in the product',
      'Low Maintenance',
      'Easy Access for future maintenance or expansion',
      'More Economical than poured-in-place trenches or duct banks',
    ],
    images: [
      'trenches-first.webp',
      'precast-concast-house-in-kaniyur.webp',
      'precast electrical-chambers-in-coimbatore.webp',
      'precast electrical-chambers-in-neelambur.webp',
    ],
  },

  'box-culverts': {
    gap: 'The source page publishes no description, specification or photographs of its own.',
    images: [],
  },

  staircase: {
    // The staircase copy on the live site sits on the Other Products page, not
    // on the staircase page, which is empty. Carried here where it belongs.
    advantages: [
      'Inherent sound and fire resistance',
      'Precast concrete stairs are the obvious choice for fire escape stairs.',
      'Maintenance free service and excellent durability are the inherent benefits of precast concrete stair construction.',
      'Precast concrete stairs offer significant benefits during the construction phase of a project providing rapid installation and early access.',
    ],
    images: ['precast-concrete-footings-in-coimbatore.webp'],
  },

  barriers: {
    applications: [
      'Parking and security for petrochemical plants',
      'Parking and security for refineries',
      'Parking and security for shipping ports',
      'Parking and security for airports',
    ],
    advantages: [
      'High quality, factory produced products',
      'Fast and easy installation',
      'No propping or expensive,time-consuming formwork',
      'Immediate access for follow-on trades',
    ],
    alsoCast: ['Barriers', 'Footings', 'Electrical Champers', 'Traffic lane barrier'],
    images: [
      'precast electrical-chambers-in-avinasi-road.webp',
      'precast electrical-chambers-in-kaniyur.webp',
      'other-product3.webp',
      'other-product4.webp',
      'other-product5.webp',
      'other-product6.webp',
      'other-product8.webp',
    ],
  },
}

// Images are stored bare above so the long theme path is written once.
export function productImages(slug) {
  return (detail[slug]?.images ?? []).map((f) => `/${IMG}${f}`)
}
