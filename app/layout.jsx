import { Archivo, Azeret_Mono } from 'next/font/google'
import './globals.css'
import SceneRoot from '../components/scene/SceneRoot'
import Header from '../components/Header'
import TitleBlock from '../components/TitleBlock'

const archivo = Archivo({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-archivo', display: 'swap' })
const azeret = Azeret_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-azeret', display: 'swap' })

export const metadata = {
  title: {
    default: 'Velan Concast — Precast Concrete Manufacturer in Coimbatore',
    template: '%s — Velan Concast',
  },
  description:
    'Precast concrete manufacturer in Coimbatore. Single-mould sumps, septic tanks, STP/ETP units, cabin rooms and bus shelters, cast in our yard and delivered finished to site.',
  icons: { icon: '/velan-mist/images-mist/images/webimages/favicon.webp' },
}

export const viewport = { themeColor: '#4c1314' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${azeret.variable}`}>
      <body>
        {/* seed 07295eff
            THESIS: The site is the yard at five in the afternoon. It sells the thing a
            contractor is actually buying — capacity, stock on the ground, a crane that can
            lift it — by putting him inside the place instead of showing him a spinning grey
            model on a studio backdrop, which is what every WebGL product page ships.
            OWN-WORLD: Raking low sun (#f2a03d) across cast concrete (#c9c3b6) on compacted
            earth (#a08a6a), long warm shadows (#2b2622), dust hanging in the light. Brand
            maroon is the plate rule and the call stamp; orange is the sun. The DOM writes on
            opaque daylight-coloured plates — never translucent blur over a live canvas.
            Archivo for text, Azeret Mono for every figure. One persistent scene: navigation
            moves the camera to another part of the same yard, it never swaps a backdrop.
            STORY: A builder lands between two rows of stacked sumps, understands the scale
            without reading a word, walks the camera through casting and delivery, sizes the
            unit he needs against the real published capacities, and calls the number that is
            stamped on the header at every scroll position.
            FIRST VIEWPORT: Camera low at eye height between the rows, hero unit right of
            centre with its cover slab set, gantry crane crossing the haze behind, sun off
            frame left throwing shadows toward the viewer. The plate sits left over the
            shadowed ground: label, one line of claim, both phone numbers, WhatsApp.
            FORM: The Yard at Golden Hour — candidate 1 of 7 on my ordered list, chosen by
            the user over the roll's assignment of candidate 3, The Cyanotype Yard (seed
            07295eff). Raised by the declined hand: section discipline from the collider
            display (units cut and labelled in place), medium-native physics from the ink
            basin (the pour and the lift obey simulation, not easing), traceability from the
            jacquard loom (every unit links to its real spec sheet), and the fixed numbered
            run from the insert-card series (products with no real photograph show an honest
            empty slot, never a stand-in).
            FINISH: unreviewed and undocumented is unfinished; this build ends with the
            finish review, the verdict, and DESIGN.md */}
        <a className="skip-link" href="#main">Skip to content</a>
        <SceneRoot />
        <div className="page">
          <Header />
          <main id="main">{children}</main>
          <TitleBlock />
        </div>
      </body>
    </html>
  )
}
