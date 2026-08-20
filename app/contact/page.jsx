import SheetHead from '../../components/SheetHead'
import EnquiryForm from '../../components/EnquiryForm'
import { company } from '../../lib/site'
import './contact.css'

export const metadata = {
  title: 'Contact',
  description:
    'Phone numbers, address and an enquiry form for Velan Concast, a precast concrete manufacturer in Coimbatore — enquiries are welcome by phone.',
}

export default function ContactPage() {
  return (
    <>
      <div className="sheet section">
        <div className="stack stack-4 contact-head">
          <span className="label">SHEET A-06</span>
          <h1>Contact</h1>
          <p className="lede">
            Call to talk through a requirement, or send an enquiry below. The numbers
            below reach the yard directly.
          </p>
        </div>
      </div>

      <div className="sheet section section--sunk will-draw">
        <ul className="contact-numbers">
          {company.phones.map((p) => (
            <li className="contact-number" key={p.tel}>
              <a className="contact-number-link" href={`tel:${p.tel}`}>
                <span className="label">{p.label}</span>
                <span className="figure">{p.display}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="row contact-actions">
          <a
            className="action action--call"
            href={company.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a className="action action--ghost" href={`mailto:${company.email}`}>
            {company.email}
          </a>
        </div>
      </div>

      <div className="sheet section will-draw">
        <SheetHead no="A-06.1" title="Where we are" id="where-we-are" />
        <div className="stack stack-5">
          <p className="lede">{company.address}</p>
          <div className="contact-map">
            <iframe
              src={company.mapEmbed}
              title="Velan Concast on Google Maps"
              loading="lazy"
            />
          </div>
          <div className="stack stack-2">
            <span className="label">Supplied across</span>
            <p className="contact-areas">{company.serviceArea.join(' · ')}</p>
          </div>
        </div>
      </div>

      <div className="sheet section section--sunk will-draw">
        <SheetHead no="A-06.2" title="Send an enquiry" id="send-an-enquiry" />
        <p className="lede contact-form-lede">
          If calling isn&rsquo;t convenient right now, write the details below instead.
        </p>
        <EnquiryForm from="/contact" />
      </div>
    </>
  )
}
