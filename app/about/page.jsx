import SheetHead from '../../components/SheetHead'
import { stats, capabilities, testimonials, primaryPhone } from '../../lib/site'
import './about.css'

export const metadata = {
  title: 'About',
  description:
    'Velan Concast is a precast concrete products manufacturer in Coimbatore, casting from a 2-acre yard across Unit-I and Unit-II.',
}

export default function AboutPage() {
  return (
    <>
      <div className="sheet section">
        <div className="stack stack-4 about-head">
          <span className="label label--orange">Sheet A-04</span>
          <h1 className="about-title">About</h1>
          <p className="lede">
            Velan Concast is a precast concrete products manufacturer based in Coimbatore.
            Production runs across a two-acre yard split into Unit-I and Unit-II, where
            steel, sand and cement are kept in stock so casting can continue round the clock.
          </p>
        </div>
      </div>

      <div className="sheet section section--sunk will-draw">
        <span className="label">The figures</span>
        <div className="about-stats">
          {stats.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <span className="figure">{stat.value}</span>
              <span className="label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sheet section will-draw">
        <SheetHead no="A-04.1" title="How we work" id="how-we-work" />
        <ol className="about-cap-list">
          {capabilities.map((item, i) => (
            <li className="about-cap" key={item}>
              <span className="about-cap-no">{String(i + 1).padStart(2, '0')}</span>
              <span className="about-cap-text">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="sheet section section--sunk will-draw">
        <SheetHead no="A-04.2" title="The yard" id="the-yard" />
        <figure className="about-yard">
          <img
            src="/velan-mist/images-mist/images/webimages/precast-concrete-company.webp"
            alt="Precast concrete yard at Velan Concast, with cast units and stocked material laid out across the production unit"
            width={1920}
            height={800}
            loading="lazy"
          />
          <figcaption className="dim dim--ticked">2 acres — Unit-I &amp; Unit-II</figcaption>
        </figure>
      </div>

      <div className="sheet section will-draw">
        <SheetHead no="A-04.3" title="What customers say" id="what-customers-say" />
        <div className="about-quotes">
          {testimonials.map((t) => (
            <blockquote className="about-quote" key={t.name}>
              <p>{t.text}</p>
              <cite>{t.name}</cite>
            </blockquote>
          ))}
        </div>
      </div>

      <div className="sheet section about-close">
        <p className="lede">Call to talk through a requirement.</p>
        <a className="action action--call" href={`tel:${primaryPhone.tel}`}>
          {primaryPhone.display}
        </a>
      </div>
    </>
  )
}
