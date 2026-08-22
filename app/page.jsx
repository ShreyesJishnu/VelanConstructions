import Link from 'next/link'
import SumpDrawing from '../components/SumpDrawing'
import SheetHead from '../components/SheetHead'
import EnquiryForm from '../components/EnquiryForm'
import { company, products, stats, testimonials, clientLogoCount, primaryPhone } from '../lib/site'
import './home.css'

export const metadata = {
  title: 'Precast Concrete Manufacturer in Coimbatore',
  description:
    'Velan Concast casts sumps, septic tanks, STP/ETP units, cabin rooms and bus shelters in a single mould at its Coimbatore yard and delivers them finished to site.',
}

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- A-01 */}
      <section className="hero">
        <div className="sheet hero-grid">
          <div className="hero-text">
            <p className="label">Sheet A-01 · Coimbatore</p>
            <h1 className="hero-h1">
              Cast in one mould.<br />
              Delivered finished.
            </h1>
            <p className="lede hero-lede">
              Precast sumps, septic tanks, STP/ETP units, cabin rooms and shelters, poured
              as a single piece in our yard and set on your site in one lift.
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
                <div key={s.label} className="hero-fig">
                  <dt className="label">{s.label}</dt>
                  <dd className="figure hero-fig-value">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-drawing">
            <SumpDrawing />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- A-01.2 */}
      <section className="section" id="range">
        <div className="sheet">
          <SheetHead no="A-01.2" title="The range" />
          <p className="dim dim--ticked dim--left range-count">
            {products.length} products in the set
          </p>

          <ol className="range-index will-draw">
            {products.map((p, i) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="range-item">
                  <span className="range-no">{`A-02.${i + 1}`}</span>
                  <span className="range-name">{p.name}</span>
                  <span className="range-rule" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>

          <p className="range-more">
            <Link className="leader" href="/products">Open the product schedule</Link>
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- A-01.3 */}
      <section className="section section--sunk" id="proof">
        <div className="sheet proof-grid">
          <div>
            <SheetHead no="A-01.3" title="Who we supply" />
            <p className="figure figure--ink proof-figure">{clientLogoCount}</p>
            <p className="label">Client logos published on our wall</p>
            <p className="proof-note">
              Builders, colleges, factories and municipal work across {company.serviceArea.slice(0, 4).join(', ')} and{' '}
              {company.serviceArea.slice(-1)}.
            </p>
            <p><Link className="leader" href="/projects">See the client wall</Link></p>
          </div>

          <div className="home-quotes">
            <p className="label label--maroon home-quotes-head">What customers say</p>
            {testimonials.map((t) => (
              <blockquote className="home-quote" key={t.name}>
                <p>{t.text}</p>
                <cite>{t.name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- A-01.4 */}
      <section className="section" id="enquire">
        <div className="sheet enquire-grid">
          <div>
            <SheetHead no="A-01.4" title="Tell us what you need" />
            <p className="lede">
              Give us a capacity and a delivery date and we will tell you what we can do.
              The fastest route is the phone.
            </p>
            <ul className="enquire-tels">
              {company.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`}>
                    <span className="label">{p.label}</span>
                    <span className="enquire-tel-no">{p.display}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <EnquiryForm from="/" compact />
        </div>
      </section>
    </>
  )
}
