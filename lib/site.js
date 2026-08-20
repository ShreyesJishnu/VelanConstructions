// Single source of product truth for the redesign.
// Every figure here is carried verbatim from the existing site (see PRODUCT.md).
// Nothing in this file may be invented, rounded, or embellished.

export const company = {
  name: 'Velan Concast',
  tagline: 'Precast concrete products',
  city: 'Coimbatore',
  address: '60C, Collector Sivakumar St, Saibaba Colony, Kuppakonam Pudur, Coimbatore, Tamil Nadu 641011',
  email: 'velanconcast2@gmail.com',
  phones: [
    { label: 'Sales', display: '+91 97158 19000', tel: '+919715819000' },
    { label: 'Sales', display: '+91 97887 19000', tel: '+919788719000' },
    { label: 'Founder', display: '+91 98422 50987', tel: '+919842250987' },
  ],
  whatsapp: 'https://api.whatsapp.com/send?phone=+919788719000&text=Hi%20VELAN%20CONCAST%2C%20I%20have%20an%20enquiry%20regarding%3A',
  serviceArea: ['Coimbatore', 'Neelambur', 'Arasur', 'Karumathampatti', 'Sitra', 'Kaniyur', 'Avinashi Road'],
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1635770686544!2d76.943412!3d11.026351100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858e84e024fa1%3A0xe61fae9edf08e8d0!2s60c%2C%20Collector%20Sivakumar%20St%2C%20Saibaba%20Colony%2C%20Kuppakonam%20Pudur%2C%20Coimbatore%2C%20Tamil%20Nadu%20641011!5e0!3m2!1sen!2sin!4v1776770928620!5m2!1sen!2sin',
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
  },
}

export const primaryPhone = company.phones[0]

// Sheet numbering — the drawing set. Order matters: it is the nav order.
export const nav = [
  { href: '/',          sheet: 'A-01', title: 'Index' },
  { href: '/products',  sheet: 'A-02', title: 'Products' },
  { href: '/projects',  sheet: 'A-03', title: 'Projects' },
  { href: '/about',     sheet: 'A-04', title: 'About' },
  { href: '/brochure',  sheet: 'A-05', title: 'Brochure' },
  { href: '/contact',   sheet: 'A-06', title: 'Contact' },
]

// Figures shown on the site today. Carried unchanged.
export const stats = [
  { value: '15+',      label: 'Years of experience' },
  { value: '10,000+',  label: 'Happy customers' },
  { value: '100+',     label: 'STP / ETP projects' },
  { value: '2 acres',  label: 'Production unit, Unit-I & Unit-II' },
]

// The ten claims the current site makes for itself, verbatim.
export const capabilities = [
  'Single-mould construction',
  'Custom solutions',
  'Experienced team',
  'Factory-made precision',
  'Fast installation',
  'Cost & time efficient',
  'Heavy steel reinforcement',
  'Low maintenance',
  'Leak-proof performance',
  'Quality assurance',
]

// Products. `legacy` points at the verbatim clone page, which is still served
// and still holds the long-form detail for every product.
// `image: null` means the business has published no photograph of that product —
// the old site reused an unrelated photo. We show an honest empty slot instead.
export const products = [
  { slug: 'sump',            name: 'Sump',                      note: 'Water storage, rainwater harvesting, sewage treatment and chemical storage. Useful where the groundwater level is high and cast-in-place tanks are difficult.', legacy: '/precast-sump-in-coimbatore.php',                              image: 'velan-mist/images-mist/images/webimages/products/precast-sump-in-coimbatore.webp' },
  { slug: 'septic-tanks',    name: 'Septic tanks',              note: 'Single-mould septic units delivered finished to site.',                     legacy: '/precast-septic-tanks-in-coimbatore.php',                     image: 'velan-mist/images-mist/images/webimages/products/septic-tank1.webp' },
  { slug: 'customized',      name: 'Customized water tanks',    note: 'Built to a capacity and footprint you specify.',                            legacy: '/precast-customized-water-tanks-in-coimbatore.php',           image: 'velan-mist/images-mist/images/webimages/products/customized-water-tank4.webp' },
  { slug: 'stp-etp',         name: 'STP / ETP',                 note: 'Sewage and effluent treatment structures.',                                 legacy: '/stp_etp.php',                                               image: 'velan-mist/images-mist/images/webimages/products/stp-etp1.webp' },
  { slug: 'cabin-room',      name: 'Cabin room',                note: 'Site offices, security cabins and portable rooms.',                        legacy: '/precast-cabin-room-in-coimbatore.php',                       image: 'velan-mist/images-mist/images/webimages/products/precast-cabin-room-in-coimbatore.webp' },
  { slug: 'concast-house',   name: 'Concast house',             note: 'Precast housing units.',                                                    legacy: '/precast-concast-house-in-coimbatore.php',                    image: 'velan-mist/images-mist/images/webimages/products/precast-concast-house-in-coimbatore.webp' },
  { slug: 'bus-shelter',     name: 'Concast bus shelter',       note: 'Public bus shelters, delivered and set.',                                   legacy: '/precast-concast-bus-shelter-in-coimbatore.php',              image: null },
  { slug: 'toilets',         name: 'Concast toilets & urinals', note: 'Public toilet and urinal units.',                                           legacy: '/precast-concast-toilets-and-urinal-units-in-coimbatore.php', image: null },
  { slug: 'trenches',        name: 'Trenches',                  note: 'Cable and drainage trenches with covers.',                                  legacy: '/precast-trenches-in-coimbatore.php',                         image: 'velan-mist/images-mist/images/webimages/products/trenches-first.webp' },
  { slug: 'box-culverts',    name: 'Box culverts',              note: 'Precast box culverts for road and drainage crossings.',                     legacy: '/precast-box-culverts-in-coimbatore.php',                     image: null },
  { slug: 'staircase',       name: 'Staircase',                 note: 'Precast staircase flights.',                                                legacy: '/precast-concrete-staircase-in-coimbatore.php',               image: null },
  { slug: 'barriers',        name: 'Traffic control barriers',  note: 'Barriers and other precast site products.',                                 legacy: '/precast-traffic-control-barriers-in-coimbatore.php',         image: null },
]

// Enquiry form product options — must match the values the old form posted,
// because /api/enquiry stores whatever it is given.
export const productOptions = [
  'Sump', 'Septic Tanks', 'Customized Water Tanks', 'STP/ETP', 'Cabin Room',
  'Concast House', 'Concast Toilets', 'Trenches', 'Concast Bus Shelter', 'Other Products',
]

// Verbatim. Names and words unchanged.
export const testimonials = [
  { name: 'Sujith',   text: 'Really excellent water tank. The best quality of the concrete is really good. Worth the price.' },
  { name: 'Gowtham',  text: 'The public toilet station is really good. They delivered the product within the estimated time frame.' },
  { name: 'Aravindh', text: 'I brought the estimation quote from many companies, the Velan concast is really affordable with best quality products and services.' },
  { name: 'Chandru',  text: 'I brought the parking ports from Velan concast, the quality is really excellent. They customized according to my need. Really very good quality.' },
]

export const videos = [
  { id: '_pIAL1pZ-_Y', title: 'Velan Concast — precast units on site' },
  { id: 'GMdF7lNlv74', title: 'Velan Concast — casting and delivery' },
  { id: 'DDNXLJCYTY8', title: 'Velan Concast — installation' },
]

// 83 real client logos live at clients/1.webp … clients/83.webp
export const clientLogoCount = 83

// The six published water-tank specification sheets, as they sit in
// public/uploads/catalog. Capacities are read from the filenames the business
// published; sizes are the real byte sizes on disk. Nothing here is estimated.
export const specSheets = [
  { litres: 6100,  label: '6,100 L',  file: '1783333396_0_6100_WT_spec_final.pdf',  size: '9.0 MB' },
  { litres: 8400,  label: '8,400 L',  file: '1783333396_1_8400_WT_spec_final.pdf',  size: '9.0 MB' },
  { litres: 11550, label: '11,550 L', file: '1783333396_2_11550_WT_spec_final.pdf', size: '9.2 MB' },
  { litres: 15300, label: '15,300 L', file: '1783333396_3_15300_WT_spec_final.pdf', size: '9.2 MB' },
  { litres: 34000, label: '34,000 L', file: '1784187696_4_34000.jpg.pdf',           size: '0.2 MB' },
  { litres: 50000, label: '50,000 L', file: '1784187696_5_50000.jpg.pdf',           size: '0.2 MB' },
]

// The one project the business publishes.
export const projects = [
  {
    name: 'Karpagam College STP / ETP Precast Tank',
    legacy: '/projectmain.php?view_id=40',
    images: [
      { src: 'uploads/category-images/13031350973_11.png', w: 1364, h: 704, alt: 'Precast STP / ETP tank supplied to Karpagam College, set on site' },
    ],
  },
]
