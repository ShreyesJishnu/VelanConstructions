import SheetHead from '../../components/SheetHead'
import { primaryPhone, specSheets } from '../../lib/site'
import './brochure.css'

export const metadata = {
  title: 'Spec sheets',
  description: 'Download the published specification sheets for our precast water tanks, from 6,100 to 50,000 litres.',
}

const sortedSpecSheets = [...specSheets].sort((a, b) => a.litres - b.litres)

export default function BrochurePage() {
  return (
    <div className="sheet">
      <section className="section">
        <div className="plate">
          <p className="label label--orange">Spec sheets</p>
          <h1 className="page-title">Water tank specification sheets</h1>
          <p className="lede">
            These are the published specification sheets for our precast water tanks, one per capacity.
            Each is a PDF you can download straight from this page.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="plate">
          <table className="schedule">
            <caption className="brochure-caption">Precast water tank specification sheets, by capacity</caption>
            <thead>
              <tr>
                <th scope="col">Capacity</th>
                <th scope="col">Specification</th>
                <th scope="col">File</th>
              </tr>
            </thead>
            <tbody>
              {sortedSpecSheets.map((s) => (
                <tr key={s.file}>
                  <td>
                    <span className="brochure-capacity">{s.label}</span>
                  </td>
                  <td>Water tank &mdash; specification sheet</td>
                  <td>
                    <a
                      className="brochure-download"
                      href={`/uploads/catalog/${encodeURIComponent(s.file)}`}
                      download
                    >
                      PDF <span className="brochure-download-size">{s.size}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="plate">
          <SheetHead label="Brochure" title="Brochure pages" id="brochure-pages" />
          <div className="brochure-images">
            <img
              src="/uploads/brochure-images/13100262327_velan%20(2).png"
              alt="Velan Concast brochure page"
              width="844"
              height="844"
              loading="lazy"
            />
            <img
              src="/uploads/brochure-images/1322333377_velan%20(4).png"
              alt="Velan Concast brochure page"
              width="500"
              height="500"
              loading="lazy"
            />
          </div>
          <a className="leader" href="/brochure.php">Archived brochure page</a>
        </div>
      </section>

      <section className="section">
        <div className="plate plate--dark">
          <p className="brochure-cta">Need a capacity that is not listed?</p>
          <a className="action action--sun" href={`tel:${primaryPhone.tel}`}>{primaryPhone.display}</a>
        </div>
      </section>
    </div>
  )
}
