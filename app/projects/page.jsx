import SheetHead from '../../components/SheetHead'
import { primaryPhone, clientLogoCount } from '../../lib/site'
import './projects.css'

export const metadata = {
  title: 'Projects',
  description: 'The one project the business publishes in full — a precast STP/ETP tank cast for Karpagam College — and the client logos it supplies.',
}

// The business names exactly one completed project. The old site's project archive
// (ourproject.php) listed a single card; this is it, verbatim.
const project = {
  title: 'Karpagam College STP / ETP Precast Tank',
  legacy: '/projectmain.php?view_id=40',
}

// public/uploads/category-images/ holds four files. 12234537999_11.png and
// 13031350973_11.png are byte-identical (md5 9889b574…) — the old site's project
// card used 13031350973_11.png, so that is the one shown here. The two
// WhatsApp_Image_* files are separate real photographs from the same set.
const mainPhoto = {
  file: '13031350973_11.png',
  width: 1364,
  height: 704,
  alt: 'Karpagam College STP / ETP precast tank, the photograph used on the project archive page',
}

const additionalViews = [
  {
    file: '12234563042_WhatsApp_Image_2026-03-25_at_3.12.49_PM_(1).jpg',
    width: 1600,
    height: 747,
    alt: 'Karpagam College STP / ETP precast tank, an additional photograph from the same site',
  },
  {
    file: '12234572571_WhatsApp_Image_2026-03-25_at_3.12.41_PM.jpg',
    width: 1508,
    height: 704,
    alt: 'Karpagam College STP / ETP precast tank, a second additional photograph from the same site',
  },
]

export default function ProjectsPage() {
  return (
    <div className="sheet">
      <section className="section">
        <div className="plate">
          <p className="label label--orange">Projects</p>
          <h1 className="page-title">One project, told properly</h1>
          <p className="lede">
            The business publishes one completed project in full, plus the list of companies whose
            sites it has supplied. We would rather show that one job clearly than pad this page with
            work we cannot document.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="plate project-plate">
          <h2>{project.title}</h2>
          <img
            className="project-photo"
            src={encodeURI(`/uploads/category-images/${mainPhoto.file}`)}
            alt={mainPhoto.alt}
            width={mainPhoto.width}
            height={mainPhoto.height}
          />
          <div className="project-views">
            {additionalViews.map((view) => (
              <img
                key={view.file}
                src={encodeURI(`/uploads/category-images/${view.file}`)}
                alt={view.alt}
                width={view.width}
                height={view.height}
                loading="lazy"
              />
            ))}
          </div>
          <a className="leader" href={project.legacy}>Archived project page</a>
        </div>
      </section>

      <section className="section">
        <div className="plate plate--dark">
          <SheetHead label="Who we supply" title="Companies whose sites we've supplied" />
          <p className="label">{clientLogoCount} client logos</p>
          <span className="visually-hidden">
            A grid of {clientLogoCount} client company logos. Company names are not individually
            captioned — the business has not published which logo belongs to which client.
          </span>
          <div className="client-grid">
            {Array.from({ length: clientLogoCount }).map((_, i) => {
              const n = i + 1
              return (
                <img
                  key={n}
                  src={`/velan-mist/images-mist/images/webimages/clients/${n}.webp`}
                  alt=""
                  width="160"
                  height="90"
                  loading="lazy"
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="plate">
          <p className="label label--orange">Get in touch</p>
          <h2 className="section-title">Talk through your project</h2>
          <p className="lede">Call to discuss a capacity, a site, or a tank like the one above.</p>
          <a className="action action--call" href={`tel:${primaryPhone.tel}`}>Call {primaryPhone.display}</a>
        </div>
      </section>
    </div>
  )
}
