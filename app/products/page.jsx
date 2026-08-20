import SheetHead from '../../components/SheetHead'
import EnquiryForm from '../../components/EnquiryForm'
import { products, primaryPhone } from '../../lib/site'
import './products.css'

export const metadata = {
  title: 'Products',
  description: 'The full range of precast concrete products Velan Concast casts in its Coimbatore factory and delivers finished to site.',
}

export default function ProductsPage() {
  return (
    <>
      <section className="section">
        <div className="sheet stack stack-4 prod-head">
          <p className="label label--orange">Sheet A-02</p>
          <h1 className="prod-title">Products</h1>
          <p className="lede">
            Everything on this sheet is cast in the Velan Concast factory in Coimbatore
            and delivered finished to site.
          </p>
          <p className="dim dim--ticked">
            <span>{products.length} products in the set</span>
          </p>
        </div>
      </section>

      <section className="section section--sunk will-draw">
        <div className="sheet">
          <ol className="prod-schedule">
            {products.map((p, i) => (
              <li className="prod-row" key={p.slug}>
                <span className="prod-no" aria-hidden="true">{`A-02.${i + 1}`}</span>
                <img
                  className="prod-photo"
                  src={`/${p.image}`}
                  alt={`${p.name} precast unit in the Velan Concast yard`}
                  width="1200"
                  height="573"
                  loading="lazy"
                />
                <div className="prod-copy">
                  <h2>{p.name}</h2>
                  <p>{p.note}</p>
                  <a className="leader" href={p.legacy}>Full detail</a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="sheet">
          <SheetHead no="A-02.13" title="Ask for a quotation" />
          <div className="prod-quote">
            <EnquiryForm from="/products" compact />
            <p className="prod-call">
              <a className="action action--call" href={`tel:${primaryPhone.tel}`}>
                Call {primaryPhone.display}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
