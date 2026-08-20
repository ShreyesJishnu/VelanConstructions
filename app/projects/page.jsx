import SheetHead from '../../components/SheetHead'
import { primaryPhone, clientLogoCount } from '../../lib/site'
import './projects.css'

export const metadata = {
  title: 'Projects',
  description: 'The Karpagam College STP / ETP precast tank Velan Concast built, and the client base its Coimbatore factory has supplied.',
}

const mainImage = encodeURIComponent('13031350973_11.png')
const view1 = encodeURIComponent('12234563042_WhatsApp_Image_2026-03-25_at_3.12.49_PM_(1).jpg')
const view2 = encodeURIComponent('12234572571_WhatsApp_Image_2026-03-25_at_3.12.41_PM.jpg')

export default function ProjectsPage() {
  return (
    <>
      <section className="section">
        <div className="sheet stack stack-4 proj-head">
          <p className="label label--orange">Sheet A-03</p>
          <h1 className="proj-title">Projects</h1>
          <p className="lede">
            One project is published on this sheet at full scale, alongside the client
            base the Coimbatore factory has supplied.
          </p>
        </div>
      </section>

      <section className="section will-draw">
        <div className="sheet stack stack-5">
          <h2 className="proj-name">Karpagam College STP / ETP Precast Tank</h2>
          <img
            className="proj-photo-main"
            src={`/uploads/category-images/${mainImage}`}
            alt="Karpagam College STP / ETP precast tank, cast and set on site"
            width="1364"
            height="704"
          />
          <div className="proj-photos">
            <img
              className="proj-photo-extra"
              src={`/uploads/category-images/${view1}`}
              alt="Karpagam College STP / ETP precast tank, additional site view"
              width="1600"
              height="747"
              loading="lazy"
            />
            <img
              className="proj-photo-extra"
              src={`/uploads/category-images/${view2}`}
              alt="Karpagam College STP / ETP precast tank, additional site view"
              width="1508"
              height="704"
              loading="lazy"
            />
          </div>
          <p className="dim dim--ticked">
            <span>STP / ETP precast tank</span>
          </p>
          <a className="leader" href="/projectmain.php?view_id=40">Archived project page</a>
        </div>
      </section>

      <section className="section section--sunk will-draw">
        <div className="sheet stack stack-5">
          <SheetHead no="A-03.1" title="Who we supply" />
          <p className="label label--ink">
            {clientLogoCount} clients supplied
            <span className="visually-hidden">
              {` `}— a grid of {clientLogoCount} client logos from projects the Coimbatore factory has supplied.
            </span>
          </p>
          <div className="client-grid">
            {Array.from({ length: clientLogoCount }).map((_, i) => (
              <img
                key={i}
                className="client-logo"
                src={`/velan-mist/images-mist/images/webimages/clients/${i + 1}.webp`}
                alt=""
                width="160"
                height="90"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sheet proj-close">
          <p className="lede">One project told in full is the evidence. Call to discuss the next one.</p>
          <a className="action action--call" href={`tel:${primaryPhone.tel}`}>
            Call {primaryPhone.display}
          </a>
        </div>
      </section>
    </>
  )
}
