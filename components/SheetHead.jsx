// Section head: a small tracked label over an uppercase title, on a plate.
export default function SheetHead({ no, label, title, id }) {
  return (
    <header className="sec-head">
      {(no || label) && <p className="label label--orange">{label || no}</p>}
      <h2 className="section-title" id={id}>{title}</h2>
    </header>
  )
}
