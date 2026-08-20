import Link from 'next/link'
import { company, nav } from '../lib/site'
import './title-block.css'

// Every drawing closes with its title block. Ours carries the contact details,
// the drawing set, and the sheet's own metadata.
export default function TitleBlock() {
  return (
    <footer className="tb">
      <div className="sheet">
        <div className="tb-grid">
          <section className="tb-cell tb-cell--wide">
            <h2 className="label">Manufacturer</h2>
            <p className="tb-name">Velan Concast</p>
            <p className="tb-addr">{company.address}</p>
            <a className="leader tb-map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`} target="_blank" rel="noreferrer">
              Open in maps
            </a>
          </section>

          <section className="tb-cell">
            <h2 className="label">Telephone</h2>
            <ul className="tb-tels">
              {company.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`}>
                    <span className="tb-tel-no">{p.display}</span>
                    <span className="label">{p.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a className="tb-mail" href={`mailto:${company.email}`}>{company.email}</a>
          </section>

          <section className="tb-cell">
            <h2 className="label">Drawing set</h2>
            <ul className="tb-set">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="sheet-no">{item.sheet}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="tb-cell">
            <h2 className="label">Supplied across</h2>
            <p className="tb-area">{company.serviceArea.join(' · ')}</p>
            <p className="tb-legacy label">
              Previous site archived at{' '}
              <a href="/index.php">index.php</a>
            </p>
          </section>
        </div>

        <div className="tb-strip">
          <span className="label">Velan Concast · Precast concrete products</span>
          <span className="label">© {new Date().getFullYear()} All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
