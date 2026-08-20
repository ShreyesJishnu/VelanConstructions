import Link from 'next/link'
import CastingSequence from '../components/scene/CastingSequence'
import Configurator from '../components/scene/Configurator'
import SheetHead from '../components/SheetHead'
import { company, products, stats, testimonials, clientLogoCount, primaryPhone } from '../lib/site'
import './home.css'

export const metadata = {
  title: 'Precast Concrete Manufacturer in Coimbatore',
  description:
    'Velan Concast casts sumps, septic tanks, STP/ETP units, cabin rooms and bus shelters in a single mould at its Coimbatore yard, and delivers them finished to site.',
}

export default function Home() {
  return (
    <>
      {/* The hero plate sits left, over the shadowed ground; the yard behind it
          is the argument, so the plate stays narrow and lets the rows breathe. */}
      <section className="hero">
        <div className="sheet">
          <div className="plate hero-plate">
            <p className="label label--orange">Precast concrete · Coimbatore</p>
            <h1 className="page-title hero-h1">Cast in one mould. Delivered finished.</h1>
            <p className="lede">
              Sumps, septic tanks, STP/ETP units, cabin rooms and shelters, poured as one
              piece in our yard and set on your site in a single lift.
            </p>
            <div className="hero-actions">
              <a className="action action--call" href={`tel:${primaryPhone.tel}`}>
                Call {primaryPhone.display}
              </a>
              <a className="action" href={company.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
            <dl className="hero-figs">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dd className="figure hero-fig-value">{s.value}</dd>
                  <dt className="label">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* One mould, six stages, in 3D. */}
      <section className="section">
        <div className="sheet">
          <div className="plate">
            <SheetHead label="How it is made" title="One mould, start to finish" id="how" />
            <p className="lede home-lede">
              A Velan Concast unit is not assembled from panels. Walls and base are poured
              together, so there is no joint anywhere for water to find. Drag through it.
            </p>
            <CastingSequence />
          </div>
        </div>
      </section>

      {/* Capacity, at the size it really is. */}
      <section className="section">
        <div className="sheet">
          <div className="plate">
            <SheetHead label="Capacity" title="Stand next to the size you need" id="capacity" />
            <p className="lede home-lede">
              Six published water-tank capacities, each with its own specification sheet.
              The figure beside the tank is 1.7 m.
            </p>
            <Configurator />
          </div>
        </div>
      </section>

      {/* The range, compressed to an index. */}
      <section className="section">
        <div className="sheet">
          <div className="plate">
            <SheetHead label="The range" title={`${products.length} products in the yard`} id="range" />
            <ul className="home-range">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href="/products" className="home-range-item">{p.name}</Link>
                </li>
              ))}
            </ul>
            <p><Link className="leader" href="/products">Open the full range</Link></p>
          </div>
        </div>
      </section>

      {/* Proof. */}
      <section className="section">
        <div className="sheet home-proof">
          <div className="plate plate--dark">
            <p className="label">Supplied to</p>
            <p className="figure figure--sun">{clientLogoCount}</p>
            <p className="home-proof-note">
              client logos published on our wall, across {company.serviceArea.slice(0, 4).join(', ')} and{' '}
              {company.serviceArea.slice(-1)}.
            </p>
            <p><Link className="leader" href="/projects">See the client wall</Link></p>
          </div>
          <blockquote className="plate home-quote">
            <p>{testimonials[0].text}</p>
            <cite>{testimonials[0].name}</cite>
          </blockquote>
        </div>
      </section>

      {/* Call. */}
      <section className="section">
        <div className="sheet">
          <div className="plate home-call">
            <SheetHead label="Enquiry" title="Tell us the capacity and the date" id="enquiry" />
            <ul className="home-tels">
              {company.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`}>
                    <span className="label">{p.label}</span>
                    <span className="home-tel-no">{p.display}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="home-call-note">
              Or <Link className="leader" href="/contact">send an enquiry</Link> if calling is not convenient.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
