import Link from 'next/link'
import { notFound } from 'next/navigation'
import SheetHead from '../../../components/SheetHead'
import EnquiryForm from '../../../components/EnquiryForm'
import { products, primaryPhone, company } from '../../../lib/site'
import { detail, productImages } from '../../../lib/product-detail'
import './product.css'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

function find(slug) {
  const i = products.findIndex((p) => p.slug === slug)
  if (i === -1) return null
  return { product: products[i], sheet: `A-02.${i + 1}`, index: i }
}

export async function generateMetadata({ params }) {
  const found = find((await params).slug)
  if (!found) return {}
  return {
    title: found.product.name,
    description: found.product.note,
  }
}

export default async function ProductPage({ params }) {
  const found = find((await params).slug)
  if (!found) notFound()

  const { product, sheet, index } = found
  const d = detail[product.slug] ?? {}
  const images = productImages(product.slug)
  const [lead, ...plate] = images
  const prev = products[(index - 1 + products.length) % products.length]
  const next = products[(index + 1) % products.length]

  // Sub-sheets are numbered by what this product actually publishes. Fixed
  // numbering would leave gaps (A-02.5.2 then A-02.5.5), which on a drawing
  // set reads as sheets that exist but have gone missing.
  const order = []
  if (d.specs?.length) order.push('specs')
  if (d.applications?.length) order.push('applications')
  if (d.advantages?.length) order.push('advantages')
  if (d.alsoCast?.length) order.push('alsoCast')
  if (d.gap) order.push('gap')
  if (plate.length) order.push('plate')
  order.push('enquire')
  const no = (key) => `${sheet}.${order.indexOf(key) + 1}`

  return (
    <>
      {/* ------------------------------------------------------------- head */}
      <section className="section">
        <div className="sheet pd-head">
          <p className="label label--orange">Sheet {sheet}</p>
          <h1 className="pd-title">{product.name}</h1>
          <p className="lede">{product.note}</p>
          <p className="dim dim--ticked dim--left">
            <span>Cast in Coimbatore · delivered finished</span>
          </p>
        </div>
      </section>

      {lead && (
        <section className="section section--sunk will-draw">
          <div className="sheet">
            <figure className="pd-lead">
              <img
                src={lead}
                alt={`${product.name} by Velan Concast`}
                width="1200"
                height="573"
              />
              <figcaption className="dim dim--ticked">{product.name}</figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ------------------------------------------------- specification */}
      {d.specs?.length > 0 && (
        <section className="section will-draw">
          <div className="sheet">
            <SheetHead no={no('specs')} title="Specification" id="specification" />
            <table className="schedule pd-specs">
              <caption className="label label--ink">
                {product.name} — specification as published
              </caption>
              <tbody>
                {d.specs.map((s, i) =>
                  typeof s === 'string' ? (
                    <tr key={i}>
                      <td colSpan={2} className="pd-spec-note">{s}</td>
                    </tr>
                  ) : (
                    <tr key={i}>
                      <th scope="row" className="pd-spec-label">{s.label}</th>
                      <td className="pd-spec-value">{s.value}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>

            {d.sizes?.length > 0 && (
              <div className="pd-sizes">
                <span className="label">Sizes cast</span>
                <ul className="pd-size-list">
                  {d.sizes.map((s) => (
                    <li key={s} className="figure figure--set">{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --------------------------------------------------- applications */}
      {d.applications?.length > 0 && (
        <section className="section section--sunk will-draw">
          <div className="sheet">
            <SheetHead no={no('applications')} title="Applications" id="applications" />
            <ul className="pd-apps">
              {d.applications.map((a, i) => (
                <li key={a} className="pd-app">
                  <span className="pd-app-no" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------- advantages */}
      {d.advantages?.length > 0 && (
        <section className="section will-draw">
          <div className="sheet">
            <SheetHead no={no('advantages')} title="Advantages" id="advantages" />
            <ul className="pd-advs">
              {d.advantages.map((a) => (
                <li key={a} className="pd-adv">{a}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ also cast */}
      {d.alsoCast?.length > 0 && (
        <section className="section section--sunk will-draw">
          <div className="sheet">
            <SheetHead no={no('alsoCast')} title="Also cast on this line" id="also-cast" />
            <ul className="pd-also">
              {d.alsoCast.map((x) => <li key={x} className="pd-also-item">{x}</li>)}
            </ul>
          </div>
        </section>
      )}

      {/* -------------------------------------------- gap: no published copy */}
      {d.gap && (
        <section className="section will-draw">
          <div className="sheet pd-gap">
            <SheetHead no={no('gap')} title="Specification" id="specification" />
            <p className="lede">Specification for this unit is not published here.</p>
            <p className="pd-gap-note">
              Tell us the capacity, footprint and delivery date you need and we will
              confirm what we can cast.
            </p>
            <a className="action action--call" href={`tel:${primaryPhone.tel}`}>
              Call {primaryPhone.display}
            </a>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- plate */}
      {plate.length > 0 && (
        <section className="section section--sunk will-draw">
          <div className="sheet">
            <SheetHead no={no('plate')} title="Views" id="views" />
            <ul className="pd-plate">
              {plate.map((src, i) => (
                <li key={src}>
                  <img
                    src={src}
                    alt={`${product.name} by Velan Concast — view ${i + 2}`}
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- enquire */}
      <section className="section will-draw">
        <div className="sheet pd-enquire">
          <div>
            <SheetHead no={no('enquire')} title={`Enquire — ${product.name}`} />
            <p className="lede">
              Give us a capacity and a delivery date. The fastest route is the phone.
            </p>
            <ul className="pd-tels">
              {company.phones.slice(0, 2).map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`}>
                    <span className="label">{p.label}</span>
                    <span className="pd-tel-no">{p.display}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <EnquiryForm from={`/products/${product.slug}`} compact />
        </div>
      </section>

      {/* ----------------------------------------------- sheet-to-sheet nav */}
      <nav className="section pd-nav" aria-label="Product sheets">
        <div className="sheet pd-nav-grid">
          <Link className="pd-nav-link pd-nav-link--prev" href={`/products/${prev.slug}`}>
            <span className="label">Previous sheet</span>
            <span className="pd-nav-name">{prev.name}</span>
          </Link>
          <Link className="leader pd-nav-all" href="/products">All 12 products</Link>
          <Link className="pd-nav-link pd-nav-link--next" href={`/products/${next.slug}`}>
            <span className="label">Next sheet</span>
            <span className="pd-nav-name">{next.name}</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
