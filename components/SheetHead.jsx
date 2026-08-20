// The head of every section: sheet number, title, and the broken rule that runs
// to the edge of the sheet. Used by every page.
export default function SheetHead({ no, title, id }) {
  return (
    <div className="sheet-head">
      <span className="sheet-no">{no}</span>
      <h2 className="section-title" id={id}>{title}</h2>
    </div>
  )
}
