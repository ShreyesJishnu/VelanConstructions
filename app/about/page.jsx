import SheetHead from '../../components/SheetHead'
import { stats, capabilities, testimonials, primaryPhone } from '../../lib/site'
import './about.css'

export const metadata = {
  title: 'About',
  description: 'Velan Concast is a precast concrete products manufacturer running a 2-acre yard in Coimbatore, Tamil Nadu.',
}

export default function AboutPage() {
  return (
    <div className="sheet about-page">
      <section className="section">
        <div className="plate">
          <p className="label label--orange">The yard</p>
          <h1 className="page-title">Two acres, Coimbatore</h1>
          <p className="lede">We manufacture precast concrete products from a production unit spread across Unit-I and Unit-II. The yard keeps its own stock of steel, sand and cement on hand, so work can run round the clock.</p>
        </div>
      </section>

      <section className="section">
        <div className="plate plate--dark">
          <p className="label label--orange">The figures</p>
          <div className="about-stats">
            {stats.map((s) => (
              <div className="about-stat" key={s.label}>
                <p className="figure figure--sun">{s.value}</p>
                <p className="about-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="plate">
          <SheetHead label="How we work" title="What every unit gets" id="how-we-work" />
          <ol className="about-capabilities">
            {capabilities.map((c, i) => (
              <li key={c}>
                <span className="about-cap-no">{String(i + 1).padStart(2, '0')}</span>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="plate">
          <SheetHead label="Customers" title="What they said" id="customers" />
          <div className="about-testimonials">
            {testimonials.map((t) => (
              <blockquote className="about-testimonial" key={t.name}>
                <p>{t.text}</p>
                <cite>{t.name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="plate stack stack-4">
          <p className="label label--orange">Talk to the yard</p>
          <a className="action action--call" href={`tel:${primaryPhone.tel}`}>{primaryPhone.display}</a>
        </div>
      </section>
    </div>
  )
}
