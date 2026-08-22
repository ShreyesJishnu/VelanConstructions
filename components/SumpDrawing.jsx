'use client'

import { useEffect, useId, useRef, useState } from 'react'
import './sump-drawing.css'

// The signature interaction: one precast unit, drawn in section, scrubbed through the
// five stages that make the single-mould claim visible instead of asserted.
// Keyboard: the control is a native range input, so arrows and Home/End work.
const STAGES = [
  { key: 'mould',   name: 'Mould',   note: 'A single steel mould is set. Nothing is assembled from panels.' },
  { key: 'cast',    name: 'Cast',    note: 'Heavy steel reinforcement is placed and the unit is poured in one piece.' },
  { key: 'cure',    name: 'Cure',    note: 'The mould is struck. Walls and base are continuous — there is no joint to leak from.' },
  { key: 'lift',    name: 'Lift',    note: 'Lifting hooks cast into the unit take it off the bed in one lift.' },
  { key: 'deliver', name: 'Deliver', note: 'It arrives finished. Site work is a delivery and a set, not a construction.' },
]

export default function SumpDrawing() {
  const [stage, setStage] = useState(0)
  // The scrubber read as decoration: nothing moved, so nobody discovered it.
  // It now advances on its own until the visitor takes over, which both
  // demonstrates the five stages and shows the control is live.
  const [playing, setPlaying] = useState(true)
  const tookOver = useRef(false)
  const uid = useId().replace(/:/g, '')
  const current = STAGES[stage]

  useEffect(() => {
    if (!playing) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false)
      return
    }
    const t = setInterval(() => setStage((i) => (i + 1) % STAGES.length), 3200)
    return () => clearInterval(t)
  }, [playing])

  // Any deliberate input hands control over for good.
  function take(next) {
    tookOver.current = true
    setPlaying(false)
    setStage(next)
  }

  return (
    <figure
      className="sd"
      data-stage={current.key}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => { if (!tookOver.current) setPlaying(true) }}
    >
      <div className="sd-title">
        <span className="sd-title-name">Precast sump &mdash; section</span>
        <span className="sd-title-no">DRG. A-01/01</span>
      </div>

      <svg
        className="sd-svg"
        viewBox="0 22 790 476"
        role="img"
        aria-label={`Section drawing of a precast sump at stage ${stage + 1} of 5: ${current.name}`}
      >
        <defs>
          <pattern id={`hatch-${uid}`} width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" className="sd-hatch-line" />
          </pattern>
          <marker id={`tick-${uid}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto">
            <line x1="7" y1="1" x2="3" y2="9" className="sd-tick" />
          </marker>
        </defs>

        {/* ground line — the datum everything is measured from */}
        <line className="sd-ground" x1="40" y1="430" x2="760" y2="430" />
        <g className="sd-ground-hatch">
          {Array.from({ length: 30 }, (_, i) => (
            <line key={i} x1={40 + i * 24} y1="430" x2={28 + i * 24} y2="442" />
          ))}
        </g>

        {/* the unit — lifts off the bed at stage 3 */}
        <g className="sd-unit">
          {/* steel mould, struck after casting */}
          <g className="sd-mould">
            <rect x="228" y="168" width="344" height="264" />
            <line x1="228" y1="300" x2="200" y2="300" />
            <line x1="572" y1="300" x2="600" y2="300" />
            <text className="sd-anno" x="182" y="296" textAnchor="end">MOULD</text>
          </g>

          {/* concrete: one continuous outline, walls + base, no joint anywhere */}
          <path
            className="sd-concrete"
            fill={`url(#hatch-${uid})`}
            d="M240 180 H560 V420 H240 Z M268 208 V392 H532 V208 Z"
            fillRule="evenodd"
          />
          <path className="sd-outline" d="M240 180 H560 V420 H240 Z" />
          <path className="sd-outline sd-outline--inner" d="M268 208 V392 H532 V208" />

          {/* heavy steel reinforcement */}
          <g className="sd-rebar">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} x1={252 + i * 37} y1="186" x2={252 + i * 37} y2="414" />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <line key={`h${i}`} x1="246" y1={200 + i * 54} x2="554" y2={200 + i * 54} />
            ))}
          </g>

          {/* lifting hooks, cast in */}
          <g className="sd-hooks">
            <path d="M300 180 v-16 a10 10 0 0 1 20 0 v16" />
            <path d="M480 180 v-16 a10 10 0 0 1 20 0 v16" />
          </g>
        </g>

        {/* crane sling */}
        <g className="sd-sling">
          <line x1="400" y1="36" x2="400" y2="86" />
          <path d="M400 86 L310 158 M400 86 L490 158" />
          <circle cx="400" cy="92" r="7" />
        </g>

        {/* inlet and outlet, set on site */}
        <g className="sd-services">
          <line x1="180" y1="240" x2="240" y2="240" />
          <text className="sd-anno" x="176" y="236" textAnchor="end">INLET</text>
          <line x1="560" y1="360" x2="620" y2="360" />
          <text className="sd-anno" x="624" y="356">OUTLET</text>
          <line className="sd-cover" x1="232" y1="172" x2="568" y2="172" />
        </g>

        {/* dimension strings */}
        <g className="sd-dims">
          <g className="sd-dim">
            <line x1="240" y1="470" x2="560" y2="470" markerStart={`url(#tick-${uid})`} markerEnd={`url(#tick-${uid})`} />
            <line className="sd-witness" x1="240" y1="424" x2="240" y2="482" />
            <line className="sd-witness" x1="560" y1="424" x2="560" y2="482" />
            <text className="sd-anno sd-anno--fig" x="400" y="462" textAnchor="middle">OVERALL WIDTH</text>
          </g>
          <g className="sd-dim">
            <line x1="656" y1="180" x2="656" y2="420" markerStart={`url(#tick-${uid})`} markerEnd={`url(#tick-${uid})`} />
            <line className="sd-witness" x1="564" y1="180" x2="668" y2="180" />
            <line className="sd-witness" x1="628" y1="420" x2="668" y2="420" />
            <text className="sd-anno sd-anno--fig" x="672" y="304">DEPTH</text>
          </g>
          <g className="sd-dim sd-dim--wall">
            <line x1="240" y1="140" x2="268" y2="140" markerStart={`url(#tick-${uid})`} markerEnd={`url(#tick-${uid})`} />
            <text className="sd-anno" x="254" y="130" textAnchor="middle">WALL</text>
          </g>
        </g>

        {/* the claim, annotated on the drawing itself */}
        <g className="sd-callout">
          <line x1="150" y1="120" x2="252" y2="196" />
          <circle cx="252" cy="196" r="4" />
          <text className="sd-anno sd-anno--call" x="146" y="116" textAnchor="end">ONE PIECE — NO JOINT</text>
        </g>
      </svg>

      <figcaption className="sd-controls">
        <div className="sd-head">
          <label className="label label--ink sd-head-label" htmlFor={`scrub-${uid}`}>
            How it is made — stage {stage + 1} of 5: {current.name}
          </label>
          <button
            type="button"
            className="sd-play"
            onClick={() => { tookOver.current = true; setPlaying((p) => !p) }}
          >
            {playing ? 'Pause' : 'Play'}
            <span className="visually-hidden"> the making-of sequence</span>
          </button>
        </div>

        <input
          id={`scrub-${uid}`}
          className="sd-range"
          type="range"
          min={0}
          max={STAGES.length - 1}
          step={1}
          value={stage}
          onChange={(e) => take(Number(e.target.value))}
          aria-valuetext={current.name}
        />

        <ol className="sd-steps">
          {STAGES.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                className={`sd-step${i === stage ? ' is-current' : ''}`}
                aria-current={i === stage ? 'step' : undefined}
                onClick={() => take(i)}
              >
                <span className="sd-step-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="sd-step-name">{s.name}</span>
              </button>
            </li>
          ))}
        </ol>

        <p className="sd-note" aria-live="polite">{current.note}</p>
      </figcaption>
    </figure>
  )
}
