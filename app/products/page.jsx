import SheetHead from '../../components/SheetHead'
import EnquiryForm from '../../components/EnquiryForm'
import { products, specSheets, primaryPhone } from '../../lib/site'
import './products.css'

export const metadata = {
  title: 'Products',
  description: 'The full schedule of precast concrete units cast at the Coimbatore factory and delivered finished to site.',
}

export default function ProductsPage() {
  return (
    <div className="sheet products-page">
      <section className="section">
        <div className="plate products-page__intro">
          <p className="label label--orange">The range</p>
          <h1 className="page-title">Precast units, cast to order</h1>
          <p className="lede">
            Every unit here is cast in single-mould construction at the Coimbatore factory, then delivered
            finished to site. What you see in the yard is what gets loaded onto the truck.
          </p>
          <p className="label">{products.length} products in the current range</p>
        </div>
      </section>

      <section className="section">
        <div className="plate products-page__schedule">
          <ul className="schedule-list">
            {products.map((p, i) => (
              <li className="schedule-row" key={p.slug}>
                <span className="schedule-row__index label">{String(i + 1).padStart(2, '0')}</span>
                <span className="schedule-row__body">
                  <h2>{p.name}</h2>
                  <p className="lede">{p.note}</p>
                  <a className="leader" href={p.legacy}>Full detail</a>
                </span>
                {p.image ? (
                  <img
                    className="schedule-row__image"
                    src={`/${p.image}`}
                    alt={p.name}
                    width="1200"
                    height="573"
                    loading="lazy"
                  />
                ) : (
                  <div className="schedule-row__empty">
                    <p className="label">No photograph published</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="plate products-page__specs">
          <SheetHead label="Specification sheets" title="Water tank capacities" />
          <p className="lede">
            These sheets cover the water tank and sump range: each links the published capacity to its
            factory specification sheet.
          </p>
          <table className="schedule">
            <thead>
              <tr>
                <th>Capacity</th>
                <th>Sheet</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {specSheets.map((s) => (
                <tr key={s.file}>
                  <td><span className="figure-cell">{s.label}</span></td>
                  <td>Water tank — specification sheet</td>
                  <td>
                    <a className="leader" href={`/uploads/catalog/${s.file}`} download>
                      PDF · {s.size}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="plate plate--dark">
          <SheetHead label="Quotation" title="Tell us the capacity you need" />
          <EnquiryForm from="/products" compact />
          <a className="action action--sun" href={`tel:${primaryPhone.tel}`}>{primaryPhone.display}</a>
        </div>
      </section>
    </div>
  )
}
