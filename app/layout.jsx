import { Archivo, Azeret_Mono } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import TitleBlock from '../components/TitleBlock'
import { company } from '../lib/site'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
  display: 'swap',
})
const azeret = Azeret_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-azeret',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Velan Concast — Precast Concrete Manufacturer in Coimbatore',
    template: '%s — Velan Concast',
  },
  description:
    'Precast concrete manufacturer in Coimbatore. Single-mould sumps, septic tanks, STP/ETP, cabin rooms, bus shelters and trenches, cast in the factory and delivered finished to site.',
  icons: { icon: '/velan-mist/images-mist/images/webimages/favicon.webp' },
}

export const viewport = { themeColor: '#4c1314' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${azeret.variable}`}>
      <body>
        {/* seed 256cf29f
            THESIS: This site is the drawing the contractor already has on the bonnet of
            his truck — a measured sheet where every real number is dimensioned rather
            than decorated. It refuses the hero-slider-over-card-grid arrangement that
            every precast site in Coimbatore ships.
            OWN-WORLD: Plotter paper (#fbfaf7) on a 24px construction grid; near-black
            linework; brand maroon as structural ink and orange strictly as annotation
            ink. Archivo for text, Azeret Mono for every figure and label. Hairline,
            thin and heavy rules are the only containers — no cards, no gradients, no
            shadows, no radius. Depth is made by overlap and rule weight alone.
            STORY: A builder sees a supplier who works in the same language he does,
            reads the range and the scale of the yard in one screen, watches a single
            mould become a delivered tank, and calls the number that never leaves the
            top of the sheet.
            FIRST VIEWPORT: Sheet A-01. A dimensioned elevation of a precast sump drawn
            live in SVG on the left two-thirds, its witness lines and dimension strings
            plotting in as the pen travels; the wordmark and both phone numbers stamped
            in the header rule above it; to the right, the single-mould claim set as one
            short line with a five-step scrub — MOULD, CAST, CURE, LIFT, DELIVER — that
            drives the drawing. Primary action, CALL, sits in the header and repeats in
            the title block that closes every page.
            FORM: The Drawing Sheet — candidate 1 of 7 on my ordered list, chosen by the
            user over the roll's assignment (seed 256cf29f, assigned index 5). Raised by
            the declined hand: density courage from the doujin catalog (the whole range
            on one sheet, no pagination), no enclosing boxes from the cracktro queue,
            flat unmixed colour from the Lowicz papercut, and the work signs itself from
            the sampler proof.
            FINISH: unreviewed and undocumented is unfinished; this build ends with the
            finish review, the verdict, and DESIGN.md */}
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <TitleBlock />
        <a
          className="call-fab"
          href={`tel:${company.phones[0].tel}`}
          aria-label={`Call Velan Concast on ${company.phones[0].display}`}
        >
          <span aria-hidden="true">CALL</span>
        </a>
      </body>
    </html>
  )
}
