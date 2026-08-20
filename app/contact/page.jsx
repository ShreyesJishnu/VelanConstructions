import SheetHead from '../../components/SheetHead'
import EnquiryForm from '../../components/EnquiryForm'
import { company } from '../../lib/site'
import './contact.css'

export const metadata = {
  title: 'Contact',
  description: 'Call, WhatsApp or find the Velan Concast precast concrete yard in Coimbatore.',
}

export default function ContactPage() {
  return (
    <div className="sheet">
      <section className="section">
        <div className="plate">
          <p className="label label--orange">Contact</p>
          <h1 className="page-title">Call the yard</h1>
          <p className="lede">
            Every number below rings the yard directly. Sales takes orders; the founder
            takes calls too.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="plate plate--dark contact-numbers">
          <div className="stack stack-2">
            {company.phones.map((p) => (
              <a className="phone-row" href={`tel:${p.tel}`} key={p.tel}>
                <span className="label">{p.label}</span>
                <span className="figure figure--sun phone-row__number">{p.display}</span>
              </a>
            ))}
          </div>
          <div className="row contact-numbers__more">
            <a
              className="action action--sun"
              href={company.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="contact-email" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="plate stack stack-6">
          <SheetHead label="Where we are" title="Find the yard" />
          <p className="lede">{company.address}</p>
          <iframe
            className="contact-map"
            src={company.mapEmbed}
            title="Velan Concast on Google Maps"
            loading="lazy"
          />
          <p className="row">
            <span className="label">Supplied across</span>
            <span>{company.serviceArea.join(', ')}</span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="plate stack stack-6">
          <SheetHead label="Enquiry" title="Send the details instead" />
          <p className="lede">
            If it is not a good time to call, leave the details below and they go straight
            to the yard.
          </p>
          <EnquiryForm from="/contact" />
        </div>
      </section>
    </div>
  )
}
