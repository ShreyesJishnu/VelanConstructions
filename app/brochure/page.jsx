import SheetHead from '../../components/SheetHead'
import { primaryPhone } from '../../lib/site'
import './brochure.css'

export const metadata = {
  title: 'Spec sheets',
  description: 'Download the published specification sheets for Velan Concast precast water tanks, cast in Coimbatore.',
}

const specs = [
  { capacity: '6,100 L', file: '1783333396_0_6100_WT_spec_final.pdf', sizeMb: '8.6 MB' },
  { capacity: '8,400 L', file: '1783333396_1_8400_WT_spec_final.pdf', sizeMb: '8.6 MB' },
  { capacity: '11,550 L', file: '1783333396_2_11550_WT_spec_final.pdf', sizeMb: '8.8 MB' },
  { capacity: '15,300 L', file: '1783333396_3_15300_WT_spec_final.pdf', sizeMb: '8.8 MB' },
  { capacity: '34,000 L', file: '1784187696_4_34000.jpg.pdf', sizeMb: '0.2 MB' },
  { capacity: '50,000 L', file: '1784187696_5_50000.jpg.pdf', sizeMb: '0.2 MB' },
]

export default function BrochurePage() {
  return (
    <>
      <div className="sheet section">
        <div className="stack stack-4 broch-head">
          <span className="label label--orange">Sheet A-05</span>
          <h1 className="broch-title">Spec sheets</h1>
          <p className="lede">
            These are the published specification sheets for Velan Concast precast water
            tanks. Each one can be downloaded as a PDF.
          </p>
        </div>
      </div>

      <div className="sheet section section--sunk will-draw">
        <table className="schedule">
          <caption className="label label--ink">Water tank specification sheets by capacity</caption>
          <thead>
            <tr>
              <th scope="col">Capacity</th>
              <th scope="col">Specification</th>
              <th scope="col">File</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.file}>
                <td className="broch-capacity">{spec.capacity}</td>
                <td>Water tank &mdash; specification sheet</td>
                <td>
                  <a
                    className="broch-link"
                    href={`/uploads/catalog/${encodeURIComponent(spec.file)}`}
                    download
                  >
                    PDF &middot; {spec.sizeMb}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sheet section will-draw">
        <SheetHead no="A-05.1" title="Brochure" id="brochure" />
        <div className="broch-images">
          <img
            src={`/uploads/brochure-images/${encodeURIComponent('13100262327_velan (2).png')}`}
            alt="Velan Concast precast water tank brochure cover"
            width="844"
            height="844"
            loading="lazy"
          />
          <img
            src={`/uploads/brochure-images/${encodeURIComponent('1322333377_velan (4).png')}`}
            alt="Velan Concast precast water tank brochure, second page"
            width="500"
            height="500"
            loading="lazy"
          />
        </div>
        <p>
          <a className="leader" href="/brochure.php">Archived brochure page</a>
        </p>
      </div>

      <div className="sheet section broch-close">
        <p className="lede">Need a capacity that is not listed?</p>
        <a className="action action--call" href={`tel:${primaryPhone.tel}`}>
          Call {primaryPhone.display}
        </a>
      </div>
    </>
  )
}
